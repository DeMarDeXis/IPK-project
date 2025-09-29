package service

import (
	"RZHDBack/internal/model"
	"RZHDBack/internal/storage"
)

type ProductionGetter struct {
	strg storage.DataGetter
}

func NewProdsGetterSrvc(storage storage.DataGetter) *ProductionGetter {
	return &ProductionGetter{
		strg: storage,
	}
}

func (pg *ProductionGetter) GetDFiftyProds() (*[]model.DieselDFiftySeries, error) {
	return pg.strg.GetDFiftyProds()
}

func (pg *ProductionGetter) GetPrivateProductions() (*[]model.PrivateProduct, error) {
	return pg.strg.GetPrivateProductions()
}

func (pg *ProductionGetter) GetMajorRepProduction() (*[]model.MajorRepair, error) {
	return pg.strg.GetMajorRepProduction()
}

func (pg *ProductionGetter) GetRepairHubsAggregators() (*[]model.RepairHubsAggregatorsProduct, error) {
	return pg.strg.GetRepairHubsAggregators()
}
