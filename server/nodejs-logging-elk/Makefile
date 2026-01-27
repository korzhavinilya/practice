## up: bring the Express server and logging environment online using docker compose
.PHONY: up
up:
	@echo '🔥 bringing environment up'
	docker-compose up --build

## down: shutdown the environment but persist data for next time
.PHONY: down
down:
	@echo '🛑 shutting down environment, data is preserved'
	docker-compose down

## destroy: shutdown the environment and remove all saved data
.PHONY: destroy
destroy:
	@echo '💣 shutting down environment and destroying data'
	docker-compose down -v

## migrate: migrate the database to the latest schema
.PHONY: migrate
migrate:
	@echo '🛠  migrating database schema'
	docker exec expressjs ./node_modules/.bin/knex migrate:latest

## rollback_schema: rollback the database schema
.PHONY: rollback_schema
rollback_schema:
	@echo '🛠 rolling back db schema'
	docker exec expressjs ./node_modules/.bin/knex migrate:rollback

## seed: seed the database with data for development
.PHONY: seed
seed:
	@echo '🌱 seeding database with development data'
	docker exec expressjs ./node_modules/.bin/knex seed:run
