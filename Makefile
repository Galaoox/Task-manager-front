.PHONY: install build deploy

# Instalar dependencias
install:
	yarn install

# Construir el proyecto para producción
build:
	yarn build --configuration production --base-href "https://Galaoox.github.io/Task-manager-front/"

# Desplegar en GitHub Pages
deploy: build
	yarn angular-cli-ghpages --dir=dist/task-manager-front/browser

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