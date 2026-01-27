up:
	pm2 start ./pm2-express/index.js --name="pm2-express"

up-all:
	pm2 start all

up-watch:
	pm2 start pm2-express --watch

up-from-config:
	pm2 start ./ecosystem.config.js --env development

up-from-config-prod:
	pm2 startOrReload ./ecosystem.config.js --env production

restart-config:
	pm2 start ./ecosystem.config.js --env development

restart:
	pm2 restart pm2-express --update-env

# stops apps untill restart all of them 
restart-all:
	pm2 restart all --update-env

# doesn't stop the app, but reloads all cluster nodes one by one
reload-all:
	pm2 reload all

down: 
	pm2 stop pm2-express

down-all: 
	pm2 stop all

list:
	pm2 list

logs:
	pm2 logs

clear-logs:
	pm2 flush

show-env:
	pm2 env 0

delete:
	pm2 delete pm2-express

delete-all:
	pm2 delete all

init-config:
	pm2 init

open-ui:
	pm2 plus