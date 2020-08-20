#!/usr/bin/make -f
# SHELL = /bin/sh

## ===============================================
## Vars
## ===============================================

ENVFILE=.env
MAKEFILE_PATH=.

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

## ===============================================
#  Targets
## ===============================================
install:
# install phaser engine to project
	@echo "Cloning phaser game engine..."
	cd $(APP_DIR)/app/lib && git clone https://github.com/photonstorm/phaser.git
	@echo "Done"

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

down:
	cd $(APP_DIR) && docker-compose down -v
##------------
