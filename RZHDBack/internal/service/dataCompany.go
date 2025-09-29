package service

import (
	"RZHDBack/internal/model"
	"RZHDBack/internal/storage"
	"encoding/json"
	"fmt"
	"os"
)

type DataCompanyService struct {
	storage storage.DataLoader
}

func NewDCService(storage storage.DataLoader) *DataCompanyService {
	return &DataCompanyService{storage: storage}
}

func (dcs DataCompanyService) LoadDFifty(path string) error {
	const op = "internal.service.dataCompany.go"

	fileData, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	var list model.ProductionList
	if err := json.Unmarshal(fileData, &list); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	if err := dcs.storage.LoadDFifty(list.DieselDFiftySeries); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (dcs DataCompanyService) LoadPrivateProductions(path string) error {
	const op = "internal.service.dataCompany.go"

	fileData, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	var list model.ProductionList
	if err := json.Unmarshal(fileData, &list); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	if err := dcs.storage.LoadPrivateProductions(list.PrivateProductions); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (dcs DataCompanyService) LoadMajorRepProduction(path string) error {
	const op = "internal.service.dataCompany.go"

	fileData, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	var productions model.ProductionList
	if err := json.Unmarshal(fileData, &productions); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	if err := dcs.storage.LoadMajorRepProduction(productions.MajorRepairListProductions); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}

func (dcs DataCompanyService) LoadRepairHubsAggregators(path string) error {
	const op = "internal.service.dataCompany.go"

	filiData, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	var productions model.ProductionList
	if err := json.Unmarshal(filiData, &productions); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	if err := dcs.storage.LoadRepairHubsAggregators(productions.RepairHubsAggregatorsProduction); err != nil {
		return fmt.Errorf("%s: %w", op, err)
	}

	return nil
}
