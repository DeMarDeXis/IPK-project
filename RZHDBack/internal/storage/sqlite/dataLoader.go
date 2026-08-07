package sqlite

import (
	"fmt"

	"RZHDBack/internal/model"

	"github.com/jmoiron/sqlx"
)

type DataCompanyStorage struct {
	db *sqlx.DB
}

func NewDataCompanyStorage(db *sqlx.DB) *DataCompanyStorage {
	return &DataCompanyStorage{db: db}
}

func (dcs DataCompanyStorage) LoadDFifty(list []model.DieselDFiftySeries) error {
	const op = "sqlite.DataCompanyStorage.LoadDFifty"

	if len(list) == 0 {
		return nil
	}

	tx, err := dcs.db.Beginx()
	if err != nil {
		return fmt.Errorf("%s: begin tx: %w", op, err)
	}
	defer tx.Rollback()

	var cnt int
	err = tx.QueryRowx(`SELECT COUNT(*) FROM d_fifty_productions`).Scan(&cnt)
	if err != nil {
		return fmt.Errorf("%s: count: %w", op, err)
	}

	if cnt > 0 {
		return nil
	}

	q := `INSERT INTO d_fifty_productions (name, ui_name, price) VALUES (?, ?, ?)`

	for _, product := range list {
		_, err := tx.Exec(q, product.Name, product.UIName, product.Price)
		if err != nil {
			return fmt.Errorf("%s: insert: %w", op, err)
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("%s: commit: %w", op, err)
	}

	return nil
}

func (dcs DataCompanyStorage) LoadPrivateProductions(list []model.PrivateProduct) error {
	const op = "sqlite.DataCompanyStorage.LoadPrivateProductions"

	if len(list) == 0 {
		return nil
	}

	tx, err := dcs.db.Beginx()
	if err != nil {
		return fmt.Errorf("%s: begin tx: %w", op, err)
	}
	defer tx.Rollback()

	var cnt int
	err = tx.QueryRowx(`SELECT COUNT(*) FROM private_production`).Scan(&cnt)
	if err != nil {
		return fmt.Errorf("%s: count: %w", op, err)
	}

	if cnt > 0 {
		return nil
	}

	q := `INSERT INTO private_production (name, ui_name, price) VALUES (?, ?, ?)`

	for _, product := range list {
		_, err := tx.Exec(q, product.Name, product.UIName, product.Price)
		if err != nil {
			return fmt.Errorf("%s: insert: %w", op, err)
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("%s: commit: %w", op, err)
	}

	return nil
}

func (dcs DataCompanyStorage) LoadMajorRepProduction(list []model.MajorRepair) error {
	const op = "sqlite.DataCompanyStorage.LoadMajorRepProduction"

	if len(list) == 0 {
		return nil
	}

	tx, err := dcs.db.Beginx()
	if err != nil {
		return fmt.Errorf("%s: begin tx: %w", op, err)
	}
	defer tx.Rollback()

	var cnt int
	err = tx.QueryRowx(`SELECT COUNT(*) FROM cap_rep_productions`).Scan(&cnt)
	if err != nil {
		return fmt.Errorf("%s: count: %w", op, err)
	}

	if cnt > 0 {
		return nil
	}

	qProd := `INSERT INTO cap_rep_productions (title, description, prev_photo) VALUES (?, ?, ?)`
	qPhoto := `INSERT INTO cap_rep_productions_photos (production_id, photo_path) VALUES (?, ?)`

	for _, detail := range list {
		res, err := tx.Exec(qProd, detail.Title, detail.Description, detail.PrevPhotoPath)
		if err != nil {
			return fmt.Errorf("%s: insert production: %w", op, err)
		}

		id, err := res.LastInsertId()
		if err != nil {
			return fmt.Errorf("%s: last insert id: %w", op, err)
		}

		for _, photo := range detail.PhotoPaths {
			_, err := tx.Exec(qPhoto, id, photo)
			if err != nil {
				return fmt.Errorf("%s: insert photo: %w", op, err)
			}
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("%s: commit: %w", op, err)
	}

	return nil
}

func (dcs DataCompanyStorage) LoadRepairHubsAggregators(list []model.RepairHubsAggregatorsProduct) error {
	const op = "sqlite.DataCompanyStorage.LoadRepairHubsAggregators"

	if len(list) == 0 {
		return nil
	}

	tx, err := dcs.db.Beginx()
	if err != nil {
		return fmt.Errorf("%s: begin tx: %w", op, err)
	}
	defer tx.Rollback()

	var cnt int
	err = tx.QueryRowx(`SELECT COUNT(*) FROM repair_hub_aggregator`).Scan(&cnt)
	if err != nil {
		return fmt.Errorf("%s: count: %w", op, err)
	}

	if cnt > 0 {
		return nil
	}

	qProd := `INSERT INTO repair_hub_aggregator (title, description, prev_photo) VALUES (?, ?, ?)`
	qPhoto := `INSERT INTO repair_hub_aggregator_photos (production_id, photo_path) VALUES (?, ?)`

	for _, product := range list {
		res, err := tx.Exec(qProd, product.Title, product.Description, product.PrevPhotoPath)
		if err != nil {
			return fmt.Errorf("%s: insert aggregator: %w", op, err)
		}

		id, err := res.LastInsertId()
		if err != nil {
			return fmt.Errorf("%s: last insert id: %w", op, err)
		}

		for _, photoPath := range product.PhotoPaths {
			_, err := tx.Exec(qPhoto, id, photoPath)
			if err != nil {
				return fmt.Errorf("%s: insert photo: %w", op, err)
			}
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("%s: commit: %w", op, err)
	}

	return nil
}
