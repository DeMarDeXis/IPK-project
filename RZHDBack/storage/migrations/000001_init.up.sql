CREATE TABLE IF NOT EXISTS invoices(
    id SERIAL PRIMARY KEY NOT NULL,
    year INT NOT NULL,
    count INT NOT NULL
);

CREATE TABLE IF NOT EXISTS d_fifty_productions(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    ui_name VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS private_production (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    ui_name VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cap_rep_productions(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    prev_photo VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cap_rep_productions_photos (
    id SERIAL PRIMARY KEY NOT NULL,
    production_id INT REFERENCES cap_rep_productions(id) ON DELETE CASCADE,
    photo_path VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS repair_hub_aggregator (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    prev_photo VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS repair_hub_aggregator_photos (
    id SERIAL PRIMARY KEY NOT NULL,
    production_id INT REFERENCES repair_hub_aggregator(id) ON DELETE CASCADE,
    photo_path VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);