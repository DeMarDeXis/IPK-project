package handler

import (
	"RZHDBack/internal/httphandler/httplib/mw/logger"
	"RZHDBack/internal/service"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"log/slog"
)

type HTTPHandler struct {
	service *service.Service
	logg    *slog.Logger
}

func NewHTTPHandler(service *service.Service, logg *slog.Logger) *HTTPHandler {
	return &HTTPHandler{
		service: service,
		logg:    logg,
	}
}

func (h *HTTPHandler) InitRoutes(logg *slog.Logger) chi.Router {
	router := chi.NewRouter()

	router.Use(logger.New(logg))
	router.Use(middleware.RequestID)
	router.Use(middleware.Recoverer)
	router.Use(middleware.URLFormat)
	router.Use(middleware.RealIP)

	router.Route("/production", func(r chi.Router) {
		r.Get("/d50", h.getDFiftyProds)
		r.Get("/private-prod", h.getPrivateProds)
		r.Get("/major-repair", h.getMajorRepProds)
		r.Get("/rep-hh", h.getRepairHubsAggregatorsProds)
	})

	return router
}
