package postgres

import (
	"RZHDBack/internal/model"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type ProductionDataGetter struct {
	db *sqlx.DB
}

func NewProductionDataGetter(db *sqlx.DB) *ProductionDataGetter {
	return &ProductionDataGetter{
		db: db,
	}
}

func (pdg ProductionDataGetter) GetDFiftyProds() (*[]model.DieselDFiftySeries, error) {
	const op = "postgres.ProductionDataGetter.GetDFiftyProds"

	var productionD50 []model.DieselDFiftySeries
	qGet := `SELECT name, ui_name, price FROM d_fifty_productions`
	if err := pdg.db.Select(&productionD50, qGet); err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return &productionD50, nil
}

func (pdg ProductionDataGetter) GetPrivateProductions() (*[]model.PrivateProduct, error) {
	const op = "postgres.ProductionDataGetter.GetPrivateProductions"

	var privateProductions []model.PrivateProduct
	qGet := `SELECT name, ui_name, price FROM private_production`
	if err := pdg.db.Select(&privateProductions, qGet); err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	return &privateProductions, nil
}

func (pdg ProductionDataGetter) GetMajorRepProduction() (*[]model.MajorRepair, error) {
	const op = "postgres.ProductionDataGetter.GetMajorRepProduction"

	qGetter := `SELECT id, title, description, prev_photo FROM cap_rep_productions`
	type majorRepairDB struct {
		ID          int    `db:"id"`
		Title       string `db:"title"`
		Description string `db:"description"`
		PrevPhoto   string `db:"prev_photo"`
	}

	var majorRepProductions []model.MajorRepair
	var dbProductions []majorRepairDB

	if err := pdg.db.Select(&dbProductions, qGetter); err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	qPhotosGetter := `SELECT photo_path FROM cap_rep_productions_photos WHERE production_id = $1`
	for _, production := range dbProductions {
		var photosMRP []string

		if err := pdg.db.Select(&photosMRP, qPhotosGetter, production.ID); err != nil {
			return nil, fmt.Errorf("%s: %w", op, err)
		}

		majorRepProductions = append(majorRepProductions, model.MajorRepair{
			Title:         production.Title,
			Description:   production.Description,
			PrevPhotoPath: production.PrevPhoto,
			PhotoPaths:    photosMRP,
		})
	}

	return &majorRepProductions, nil
}

func (pdg ProductionDataGetter) GetRepairHubsAggregators() (*[]model.RepairHubsAggregatorsProduct, error) {
	const op = "postgres.ProductionDataGetter.GetRepairHubsAggregators"

	qGetter := `SELECT id, title, description, prev_photo FROM repair_hub_aggregator`
	type repairHubsAggregatorsDB struct {
		ID          int    `db:"id"`
		Title       string `db:"title"`
		Description string `db:"description"`
		PrevPhoto   string `db:"prev_photo"`
	}

	var repairHubsAggregators []model.RepairHubsAggregatorsProduct
	var dbAggregators []repairHubsAggregatorsDB

	if err := pdg.db.Select(&dbAggregators, qGetter); err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	qPhotosGetter := `SELECT photo_path FROM repair_hub_aggregator_photos WHERE production_id = $1`
	for _, agg := range dbAggregators {
		var photosRHA []string
		if err := pdg.db.Select(&photosRHA, qPhotosGetter, agg.ID); err != nil {
			return nil, fmt.Errorf("%s: %w", op, err)
		}

		repairHubsAggregators = append(repairHubsAggregators, model.RepairHubsAggregatorsProduct{
			Title:         agg.Title,
			Description:   agg.Description,
			PrevPhotoPath: agg.PrevPhoto,
			PhotoPaths:    photosRHA,
		})
	}

	return &repairHubsAggregators, nil
}
