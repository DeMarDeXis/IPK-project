package sqlite

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/jmoiron/sqlx"
)

type StorageConfig struct {
	Path string `yaml:"path" env:"DB_PATH" env-default:"./data/catalog.db"`
}

func New(cfg StorageConfig) (*sqlx.DB, error) {
	const op = "storage.sqlite.New"

	if cfg.Path == "" {
		//cfg.Path = "/opt/catalog/data/catalog.db"
		return nil, fmt.Errorf("%s: path is empty", op)
	}

	if err := os.MkdirAll(filepath.Dir(cfg.Path), 0o750); err != nil {
		return nil, fmt.Errorf("%s: create db dir: %w", op, err)
	}

	dsn := fmt.Sprintf(
		"file:%s?_pragma=busy_timeout(5000)&_pragma=journal_mode(WAL)&_pragma=synchronous(NORMAL)&_pragma=foreign_keys(ON)",
		cfg.Path,
	)

	db, err := sqlx.Open("sqlite", dsn)
	if err != nil {
		return nil, fmt.Errorf("%s: open sqlite: %w", op, err)
	}

	db.SetMaxOpenConns(1)

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("%s: ping sqlite: %w", op, err)
	}

	return db, nil
}

func Stop(db *sqlx.DB) error {
	const op = "storage.sqlite.Stop"

	if db == nil {
		return fmt.Errorf("%s: db is nil", op)
	}

	if err := db.Close(); err != nil {
		return fmt.Errorf("%s: close sqlite: %w", op, err)
	}

	return nil
}
