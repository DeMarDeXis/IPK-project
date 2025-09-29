package postgres

import (
	"fmt"
	"github.com/jmoiron/sqlx"
)

const (
	DB_NAME = "postgres"
)

type StorageConfig struct {
	Host     string `yaml:"host" env:"DB_HOST" env-default:"localhost"`
	Port     string `yaml:"port" env:"DB_PORT" env-default:"5432"`
	User     string `yaml:"user" env:"DB_USER" env-default:"postgres"`
	Password string `yaml:"password" env:"DB_PASSWORD"`
	DBName   string `yaml:"db_name" env:"DB_NAME"`
	SSLMode  string `yaml:"ssl_mode" env:"DB_SSL_MODE" env-default:"disable"`
}

func New(cfg StorageConfig, password string) (*sqlx.DB, error) {
	const op = "storage.postgres.New"

	db, err := sqlx.Open(DB_NAME, builderConnection(cfg, password))
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return db, nil
}

func Stop(db *sqlx.DB) error {
	const op = "storage.postgres.Stop"

	if db == nil {
		return fmt.Errorf("%s: db is nil", op)
	}

	if err := db.Close(); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func builderConnection(cfg StorageConfig, password string) string {
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.User, password, cfg.DBName, cfg.SSLMode)
}
