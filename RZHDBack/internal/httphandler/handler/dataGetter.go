package handler

import (
	"RZHDBack/internal/httphandler/httplib"
	"RZHDBack/internal/model"
	"encoding/json"
	"net/http"
)

func (h *HTTPHandler) getDFiftyProds(w http.ResponseWriter, r *http.Request) {
	prods, err := h.service.GetDFiftyProds()
	if err != nil {
		httplib.NewErrorResponse(w, h.logg, http.StatusInternalServerError, err.Error())
		return
	}

	prodsData := model.ProductionList{
		DieselDFiftySeries: *prods,
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(prodsData)
}

func (h *HTTPHandler) getPrivateProds(w http.ResponseWriter, r *http.Request) {
	prods, err := h.service.GetPrivateProductions()
	if err != nil {
		httplib.NewErrorResponse(w, h.logg, http.StatusInternalServerError, err.Error())
		return
	}

	prodsData := model.ProductionList{
		PrivateProductions: *prods,
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(prodsData)
}

func (h *HTTPHandler) getMajorRepProds(w http.ResponseWriter, r *http.Request) {
	prods, err := h.service.GetMajorRepProduction()
	if err != nil {
		httplib.NewErrorResponse(w, h.logg, http.StatusInternalServerError, err.Error())
	}

	prodsData := model.ProductionList{
		MajorRepairListProductions: *prods,
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(prodsData)
}

func (h *HTTPHandler) getRepairHubsAggregatorsProds(w http.ResponseWriter, r *http.Request) {
	prods, err := h.service.GetRepairHubsAggregators()
	if err != nil {
		httplib.NewErrorResponse(w, h.logg, http.StatusInternalServerError, err.Error())
		return
	}

	prodsData := model.ProductionList{
		RepairHubsAggregatorsProduction: *prods,
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(prodsData)
}
