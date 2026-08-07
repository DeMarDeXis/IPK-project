package storage

import (
	"RZHDBack/internal/model"
	"RZHDBack/internal/storage/sqlite"

	"github.com/jmoiron/sqlx"
)

type DataLoader interface {
	LoadDFifty(list []model.DieselDFiftySeries) error
	LoadPrivateProductions(list []model.PrivateProduct) error
	LoadMajorRepProduction(list []model.MajorRepair) error
	LoadRepairHubsAggregators(list []model.RepairHubsAggregatorsProduct) error
}

type DataGetter interface {
	GetDFiftyProds() (*[]model.DieselDFiftySeries, error)
	GetPrivateProductions() (*[]model.PrivateProduct, error)
	GetMajorRepProduction() (*[]model.MajorRepair, error)
	GetRepairHubsAggregators() (*[]model.RepairHubsAggregatorsProduct, error)
}

type Storage struct {
	DataLoader
	DataGetter
}

func NewStorage(db *sqlx.DB) *Storage {
	return &Storage{
		DataLoader: sqlite.NewDataCompanyStorage(db),
		DataGetter: sqlite.NewProductionDataGetter(db),
	}
}
