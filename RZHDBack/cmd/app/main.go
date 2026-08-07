package main

import (
	"RZHDBack/internal/app/httpServer"
	"RZHDBack/internal/httphandler/handler"
	"RZHDBack/internal/service"
	"RZHDBack/internal/storage"
	"RZHDBack/internal/storage/sqlite"
	"RZHDBack/pkg/config"
	"RZHDBack/pkg/lib/logger/handler/slogpretty"
	"flag"
	"log/slog"
	"os"

	_ "modernc.org/sqlite"

	"github.com/rs/cors"
)

const (
	envLocal = "local"
	envDev   = "dev"
	envProd  = "prod"
)

func main() {
	// Load config
	var configPath = flag.String("config", "", "Path to config file (e.g. -config=config/config.yaml)")
	flag.Parse()

	cfg := config.InitConfig(*configPath)

	// Load logger
	logg := setupLogger(cfg.Env)
	logg.Debug("Config path", slog.String("config", *configPath))
	logg.Info("App is start", slog.String("env", cfg.Env))

	// load database
	//db, err := postgres.New(postgres.StorageConfig{
	//	Host:    cfg.StorageConfig.Host,
	//	Port:    cfg.StorageConfig.Port,
	//	User:    cfg.StorageConfig.User,
	//	DBName:  cfg.StorageConfig.DBName,
	//	SSLMode: cfg.StorageConfig.SSLMode,
	//}, cfg.StorageConfig.Password)
	db, err := sqlite.New(sqlite.StorageConfig{Path: cfg.StorageConfig.Path})
	if err != nil {
		logg.Error("error db open", slog.Any("error", err.Error())) //Example of error's logging
	}

	//logg.Debug("init db",
	//	slog.String("host", cfg.StorageConfig.Host),
	//	slog.String("port", cfg.StorageConfig.Port),
	//	slog.String("username", cfg.StorageConfig.User),
	//	slog.String("password", cfg.StorageConfig.Password),
	//	slog.String("dbname", cfg.StorageConfig.DBName),
	//	slog.String("sslmode", cfg.StorageConfig.SSLMode),
	//	slog.String("env", cfg.Env))
	logg.Debug("init sqlite",
		slog.String("path", cfg.StorageConfig.Path),
		slog.String("env", cfg.Env))

	if err := sqlite.Migrate(db); err != nil {
		logg.Error("error migrate", slog.Any("error", err.Error()))
		os.Exit(1)
	}

	// Init storage
	strg := storage.NewStorage(db)
	// load service
	srvc := service.New(strg)

	// load handler
	httpHandler := handler.NewHTTPHandler(srvc, logg)

	routesApp := httpHandler.InitRoutes(logg)

	logg.Debug("cfg", "AllowedOrigins", cfg.CORS.AllowedOrigins)

	handlerWithCORS := cors.New(cors.Options{
		AllowedOrigins:   cfg.CORS.AllowedOrigins,
		AllowedMethods:   []string{"Get"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		Debug:            cfg.Env == envLocal,
	}).Handler(routesApp)

	if err := initDataToDB(srvc, logg); err != nil {
		logg.Error("error init data", slog.Any("error", err.Error()))
	}

	// load http
	app := httpServer.New(logg, cfg.HTTPServer, handlerWithCORS)
	if err := app.Start(); err != nil {
		logg.Error("error app start", "error", err)
	}

	// init graceful shutdown
	if err := app.Stop(); err != nil {
		logg.Error("failed to stop http server", slog.Any("error", err))
		os.Exit(1)
	}

	// stop db
	if err := sqlite.Stop(db); err != nil {
		logg.Error("failed to stop db", slog.Any("error", err))
		os.Exit(1)
	}
}

func setupLogger(env string) *slog.Logger {
	var log *slog.Logger
	switch env {
	case envLocal:
		log = initSlogPretty()
	case envDev:
		log = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}),
		)
	case envProd:
		log = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}))
	}

	return log
}

func initSlogPretty() *slog.Logger {
	opts := slogpretty.PrettyHandlersOptions{
		SlogOpts: &slog.HandlerOptions{
			Level: slog.LevelDebug,
		},
	}

	handl := opts.NewPrettyHandler(os.Stdout)

	return slog.New(handl)
}

func initDataToDB(srvc *service.Service, logg *slog.Logger) error {
	logg.Info("Func init data was launched")

	if err := srvc.DataLoader.LoadDFifty("./temp/jsonData/DieselD50Series.json"); err != nil {
		logg.Error("error load D50", slog.Any("error", err.Error()))
		return err
	}

	if err := srvc.DataLoader.LoadPrivateProductions("./temp/jsonData/PrivateProd.json"); err != nil {
		logg.Error("error load PrivateProduct", slog.Any("error", err.Error()))
		return err
	}

	if err := srvc.DataLoader.LoadMajorRepProduction("./temp/jsonData/caprep-json.json"); err != nil {
		logg.Error("error load MajorRepair", slog.Any("error", err.Error()))
		return err
	}

	if err := srvc.DataLoader.LoadRepairHubsAggregators("./temp/jsonData/repairHH.json"); err != nil {
		logg.Error("error load RepairHubsAggregators", slog.Any("error", err.Error()))
		return err
	}

	return nil
}
