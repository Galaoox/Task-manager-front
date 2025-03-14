.PHONY: install build deploy deploy-alt

# Instalar dependencias
install:
	yarn install

# Construir el proyecto para producción
build:
	yarn build --configuration production --base-href "https://Galaoox.github.io/Task-manager-front/"

# Desplegar en GitHub Pages
deploy:
	@echo "Deploying to GitHub Pages"
	yarn angular-cli-ghpages --dir=dist/task-manager-front/browser --no-silent

deploy-alt:
	@echo "Deploying to GitHub Pages with token"
	GITHUB_TOKEN=$(DEPLOY_TOKEN) yarn angular-cli-ghpages --dir=dist/task-manager-front/browser --no-silent

# Ejecutar todo el proceso de publicación
publish: install build deploy

# Mostrar ayuda
help:
	@echo "Comandos disponibles:"
	@echo "  make install  - Instalar dependencias"
	@echo "  make build    - Construir el proyecto para producción"
	@echo "  make deploy   - Desplegar en GitHub Pages"
	@echo "  make publish  - Ejecutar todo el proceso (instalar, construir y desplegar)"
	@echo "  make help     - Mostrar esta ayuda"