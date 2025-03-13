# Task Manager Front

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.2.

## 📋 Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- Yarn (como gestor de paquetes)
- Angular CLI versión 19.2.2
- Make (para usar los comandos del Makefile)
```bash
yarn global add @angular/cli
```

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Galaoox/Task-manager-front.git
```

2. Instala las dependencias usando Yarn:
```bash
yarn install
```

## 💻 Desarrollo

### Servidor de desarrollo

Para iniciar el servidor de desarrollo:

```bash
yarn start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`. La aplicación se recargará automáticamente si modificas cualquier archivo fuente.

### Modo desarrollo con Docker

El método recomendado para desarrollo con Docker es:

```bash
yarn dev
```

Este comando está optimizado para desarrollo y configurado con:
- Recarga automática con poll cada 500ms
- Host: 0.0.0.0 (accesible desde cualquier IP)
- Desactivación de verificación de host para compatibilidad con Docker
- Hot-reload activado para una mejor experiencia de desarrollo

> **Nota**: Se recomienda usar `yarn dev` en lugar de `ng serve` cuando se trabaja con Docker para asegurar la correcta configuración del entorno de desarrollo.

## 🛠️ Comandos Principales

### Generación de código

Angular CLI incluye herramientas para generar componentes, servicios, pipes y más:

```bash
ng generate component nombre-componente
ng generate service nombre-servicio
ng generate pipe nombre-pipe
```

### Construcción

Para construir el proyecto:

```bash
yarn build
# o
ng build
```

Los archivos de construcción se almacenarán en el directorio `dist/`.


## 📦 Dependencias Principales

- Angular v19.2.0
- RxJS v7.8.0
- TailwindCSS v4.0.13
- Zone.js v0.15.0

## 🗂️ Estructura del Proyecto

```
src/
├── app/
│   ├── core/        # Servicios singleton, modelos universales, etc.
│   ├── features/    # Módulos de características
│   ├── shared/      # Componentes, pipes y directivas compartidas
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
```

## 📚 Recursos Adicionales

- [Documentación de Angular](https://angular.dev)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contribución

Por favor, lee la guía de contribución antes de enviar pull requests.

## 📄 Licencia

Este proyecto está bajo la Licencia [Mit] 

## 🚀 Despliegue en GitHub Pages

El proyecto incluye un Makefile para facilitar el proceso de despliegue en GitHub Pages. Los comandos disponibles son:

```bash
make install  # Instalar dependencias
make build    # Construir el proyecto para producción
make deploy   # Desplegar en GitHub Pages
make publish  # Ejecutar todo el proceso (instalar, construir y desplegar)
make help     # Mostrar esta ayuda
```

Para publicar el proyecto, simplemente ejecuta:

```bash
make publish
```

Una vez completado el proceso, la aplicación estará disponible en: https://Galaoox.github.io/Task-manager-front/

> **Nota**: Asegúrate de que GitHub Pages esté habilitado en la configuración del repositorio (Settings > Pages) y que la rama `gh-pages` esté seleccionada como fuente.
