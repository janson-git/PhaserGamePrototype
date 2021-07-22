#!/usr/bin/make -f
# SHELL = /bin/sh

## ===============================================
## Vars
## ===============================================

ENVFILE=.env
MAKEFILE_PATH=.
# репозиторий, в который, в ветку gh-pages хотим закоммитить-запушить
REPO=$(shell echo $$(git remote -v | grep push | awk '{print $$2}'))
GH_PAGES_PATH="$(APP_DIR)/tmp/gh-pages/"
DEPLOY_VER=$(shell date +%Y%m%d%H%M%S)
GIT_USER_EMAIL=$(shell echo $$(git config user.email))
GIT_USER_NAME=$(shell echo $$(git config user.name))

ifneq ("$(wildcard .env)","")
	# ENVFILE=.env
	APP_DIR=$(shell echo $$(cd . && pwd))
else
	# ENVFILE=../.env
	APP_DIR=$(shell echo $$(cd .. && pwd))
endif

.DEFAULT_GOAL = help
.PHONY: down up

## ===============================================
#  Help
## ===============================================
help:  ## Справка по командам
	@echo Usage:
	@echo "   make <target> [<target> [<target> ...]]"
	@echo -----
	@echo Available targets:
	@echo "   up             Up project"
	@echo "   down           Down project"
	@echo "   gh-pages       Publish app/dist to gh-pages branch on github"

## ===============================================
#  Targets
## ===============================================

up:
	cd $(APP_DIR) && docker-compose up -d
	@echo "Install node modules, typescript, webpack..."
	docker-compose exec app yarn install
	@echo "Done"
	@echo "Install http-server"
	docker-compose exec app yarn global add http-server
# запускаем сервер в директории скомпилированных файлов
	docker-compose exec -d app http-server /var/www/dist
	@echo "http://localhost:8088"
##------------

up_dev:
	cd $(APP_DIR) && docker-compose up -d
	@echo "Install node modules, typescript, webpack..."
	docker-compose exec app yarn install
	@echo "Done"
	@echo "Install http-server..."
	docker-compose exec app yarn global add http-server
	@echo "Done"
# запускаем сервер в директории скомпилированных файлов
	docker-compose exec -d app http-server /var/www/dist
	@echo "http://localhost:8088"
	@echo "Run build and file watch..."
	docker-compose exec app npm run build-watch
##------------

down:
	cd $(APP_DIR) && docker-compose down -v
##------------

gh-pages:
	@echo "REPO: $(REPO)\n"
	@echo "Deploy $(DEPLOY_VER) version ..."
	@echo "Cloning..."
# склонируемся во временную директорию, перключимся на ветку gh-pages,
# зальём туда содержимое директории проекта dist и закоммитим это всё, а потом запушим
	mkdir -p tmp/gh-pages
	cd $(APP_DIR)/tmp && git clone $(REPO) gh-pages && cd gh-pages \
		&& git config user.email "$(GIT_USER_EMAIL)" \
		&& git config user.name "Makefile Deployer"
	@echo "Checkout to gh-pages branch..."
	cd $(GH_PAGES_PATH) && git checkout gh-pages
	@echo "Copy $(APP_DIR)/app/dist to $(APP_DIR)/tmp/gh-pages..."
	cp -R $(APP_DIR)/app/dist/* $(GH_PAGES_PATH)
# заменить в app.bundle.js строку "this.load.setBaseURL();" на "this.load.setBaseURL('/PhaserGamePrototype/');"
# заменить в app.bundle.js строку "this.load.setBaseURL();" на "this.load.setBaseURL('/PhaserGamePrototype/');"
	sed "s#this.load.setBaseURL()#this.load.setBaseURL(\'\/PhaserGamePrototype\/\')#g" $(APP_DIR)/tmp/gh-pages/app.bundle.js > $(APP_DIR)/tmp/gh-pages/out.app.bundle.js
	cd $(GH_PAGES_PATH) && mv -f $(GH_PAGES_PATH)/out.app.bundle.js $(GH_PAGES_PATH)/app.bundle.js
	@echo "Commit changes and push to repo..."
	cd $(APP_DIR)/tmp/gh-pages && git add . \
		&& git commit -m "Deploy $(DEPLOY_VER)" \
		&& git push origin HEAD
	@echo "Version $(DEPLOY_VER) deployed to gh-pages successfully"
##------------