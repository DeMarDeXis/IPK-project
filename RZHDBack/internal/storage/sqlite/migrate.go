package sqlite

import (
	_ "embed"
	"fmt"

	"github.com/jmoiron/sqlx"
)

//go:embed schema.sql
var schemaSQL string

func Migrate(db *sqlx.DB) error {
	const op = "storage.sqlite.Migrate"
	if _, err := db.Exec(schemaSQL); err != nil {
		return fmt.Errorf("%s: apply sqlite schema: %w", op, err)
	}
	return nil
}
