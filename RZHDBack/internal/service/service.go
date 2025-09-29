package service

import (
	"RZHDBack/internal/model"
	"RZHDBack/internal/storage"
)

type DataLoader interface {
	LoadDFifty(path string) error
	LoadPrivateProductions(path string) error
	LoadMajorRepProduction(path string) error
	LoadRepairHubsAggregators(path string) error
}

type DataGetter interface {
	GetDFiftyProds() (*[]model.DieselDFiftySeries, error)
	GetPrivateProductions() (*[]model.PrivateProduct, error)
	GetMajorRepProduction() (*[]model.MajorRepair, error)
	GetRepairHubsAggregators() (*[]model.RepairHubsAggregatorsProduct, error)
}

type Service struct {
	DataLoader
	DataGetter
}

func New(storage *storage.Storage) *Service {
	return &Service{
		DataLoader: NewDCService(storage.DataLoader),
		DataGetter: NewProdsGetterSrvc(storage.DataGetter),
	}
}
