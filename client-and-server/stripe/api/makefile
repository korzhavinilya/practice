## Database manipulation
migrate: 
	npx knex migrate:latest
new-migrate:
	npx knex migrate:make NEW_MIGRATE
rollback: 
	npx knex migrate:rollback --all
seed: 
	npx knex seed:run
new-seed:
	npx knex seed:make NEW_SEED
forward-stripe:
	@export $(shell grep -v '^#' .env | xargs) && \
	echo "Using STRIPE_API_KEY=$$STRIPE_API_KEY" && \
	stripe listen --forward-to localhost:3000/api/payment/webhook/stripe --api-key $$STRIPE_API_KEY
trigger-payment:
	@export $(shell grep -v '^#' .env | xargs) && \
	echo "Triggering payment_intent.succeeded event with STRIPE_API_KEY=$$STRIPE_API_KEY" && \
	stripe trigger payment_intent.succeeded --api-key $$STRIPE_API_KEY