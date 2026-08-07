PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS d_fifty_productions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ui_name TEXT NOT NULL,
    price TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS private_production (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ui_name TEXT NOT NULL,
    price TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cap_rep_productions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    prev_photo TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cap_rep_productions_photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    production_id INTEGER NOT NULL REFERENCES cap_rep_productions(id) ON DELETE CASCADE,
    photo_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS repair_hub_aggregator (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    prev_photo TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS repair_hub_aggregator_photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    production_id INTEGER NOT NULL REFERENCES repair_hub_aggregator(id) ON DELETE CASCADE,
    photo_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cap_rep_productions_photos_production_id
    ON cap_rep_productions_photos (production_id);

CREATE INDEX IF NOT EXISTS idx_repair_hub_aggregator_photos_production_id
    ON repair_hub_aggregator_photos (production_id);