package model

type ProductionList struct {
	DieselDFiftySeries              []DieselDFiftySeries           `json:"diesel_D50_Series"`
	PrivateProductions              []PrivateProduct               `json:"private_prod"`
	MajorRepairListProductions      []MajorRepair                  `json:"details"`
	RepairHubsAggregatorsProduction []RepairHubsAggregatorsProduct `json:"aggregators"`
}

type DieselDFiftySeries struct {
	Name   string `json:"name" db:"name"`
	UIName string `json:"ui_name" db:"ui_name"`
	Price  string `json:"price" db:"price"`
}

type PrivateProduct struct {
	Name   string `json:"name" db:"name"`
	UIName string `json:"ui_name" db:"ui_name"`
	Price  string `json:"price" db:"price"`
}

type MajorRepair struct {
	Title         string   `json:"title" db:"title"`
	Description   string   `json:"desc" db:"description"`
	PhotoPaths    []string `json:"photos"`
	PrevPhotoPath string   `json:"prev_photo" db:"prev_photo"`
}

type RepairHubsAggregatorsProduct struct {
	Title         string   `json:"title" db:"title"`
	Description   string   `json:"desc" db:"description"`
	PhotoPaths    []string `json:"photos"`
	PrevPhotoPath string   `json:"prev_photo" db:"prev_photo"`
}
