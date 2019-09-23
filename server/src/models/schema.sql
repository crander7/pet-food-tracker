CREATE TYPE pet_name AS ENUM ('charlie', 'minnie');

CREATE TABLE IF NOT EXISTS feeding (
    id SERIAL PRIMARY KEY NOT NULL,
    pet pet_name NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);