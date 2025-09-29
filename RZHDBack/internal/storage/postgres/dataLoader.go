package postgres

import (
	"RZHDBack/internal/model"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type DataCompanyStorage struct {
	db *sqlx.DB
}

func NewDataCompanyStorage(db *sqlx.DB) *DataCompanyStorage {
	return &DataCompanyStorage{db: db}
}

func (dcs DataCompanyStorage) LoadDFifty(list []model.DieselDFiftySeries) error {
	const op = "internal.storage.postgres.dataLoader.go"

	tx, err := dcs.db.Begin()
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer tx.Rollback()

	var cnt int
	err = tx.QueryRow(`SELECT COUNT(*) FROM d_fifty_productions`).Scan(&cnt)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	if cnt > 0 {
		return nil
	}

	q := `INSERT INTO d_fifty_productions (name, price, ui_name) VALUES ($1, $2, $3)`
	for _, product := range list {
		_, err := tx.Exec(q, product.Name, product.Price, product.UIName)
		if err != nil {
			return fmt.Errorf("%s: %w", op, err)
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (dcs DataCompanyStorage) LoadPrivateProductions(list []model.PrivateProduct) error {
	const op = "internal.storage.postgres.dataLoader.go"

	tx, err := dcs.db.Begin()
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer tx.Rollback()

	var cnt int
	err = tx.QueryRow(`SELECT COUNT(*) FROM private_production`).Scan(&cnt)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	if cnt > 0 {
		return nil
	}

	q := `INSERT INTO private_production (name, ui_name, price) VALUES ($1, $2, $3)`
	for _, product := range list {
		_, err := tx.Exec(q, product.Name, product.UIName, product.Price)
		if err != nil {
			return fmt.Errorf("%s: %w", op, err)
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (dcs DataCompanyStorage) LoadMajorRepProduction(list []model.MajorRepair) error {
	const op = "internal.storage.postgres.dataLoader.go"

	tx, err := dcs.db.Begin()
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer tx.Rollback()

	var cnt int
	err = tx.QueryRow(`SELECT COUNT(*) FROM cap_rep_productions`).Scan(&cnt)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	if cnt > 0 {
		return nil
	}

	qProd := `INSERT INTO cap_rep_productions (title, description, prev_photo) VALUES ($1, $2, $3) RETURNING id`
	qPhoto := `INSERT INTO cap_rep_productions_photos (production_id, photo_path) VALUES ($1, $2)`
	var id int
	for _, detail := range list {
		row := tx.QueryRow(qProd, detail.Title, detail.Description, detail.PrevPhotoPath)
		if err := row.Scan(&id); err != nil {
			return fmt.Errorf("%s: %w", op, err)
		}

		for _, photo := range detail.PhotoPaths {
			_, err := tx.Exec(qPhoto, id, photo)
			if err != nil {
				return fmt.Errorf("%s: %w", op, err)
			}
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (dcs DataCompanyStorage) LoadRepairHubsAggregators(list []model.RepairHubsAggregatorsProduct) error {
	const op = "internal.storage.postgres.dataLoader.go"

	tx, err := dcs.db.Begin()
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}
	defer tx.Rollback()

	var cnt int
	qChecker := `SELECT COUNT(*) FROM repair_hub_aggregator`
	err = tx.QueryRow(qChecker).Scan(&cnt)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	if cnt > 0 {
		return nil
	}

	qProd := `INSERT INTO repair_hub_aggregator (title, description, prev_photo) VALUES ($1, $2, $3) RETURNING id`
	qPhoto := `INSERT INTO repair_hub_aggregator_photos (production_id, photo_path) VALUES ($1, $2)`
	var id int
	for _, product := range list {
		row := tx.QueryRow(qProd, product.Title, product.Description, product.PrevPhotoPath)
		if err := row.Scan(&id); err != nil {
			return fmt.Errorf("%s: %w", op, err)
		}

		for _, photoPath := range product.PhotoPaths {
			_, err := tx.Exec(qPhoto, id, photoPath)
			if err != nil {
				return fmt.Errorf("%s: %w", op, err)
			}
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}
