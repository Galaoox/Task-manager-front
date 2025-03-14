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

## ⚙️ Modo Local y Modo API

La aplicación permite alternar entre el modo local (usando LocalStorage) y el modo API (consumiendo una API externa). Para cambiar entre estos modos, utiliza el switch disponible en la interfaz de usuario.

### Modo Local

En este modo, los datos se almacenan en el LocalStorage del navegador. Esto es útil para pruebas rápidas y desarrollo sin necesidad de una conexión a Internet.

### Modo API

Al activar el modo API, la aplicación realizará solicitudes a una API externa para realizar operaciones CRUD. Asegúrate de que la API esté disponible y configurada correctamente.

## Justificación de la Estructura del Proyecto

La estructura del proyecto en la carpeta `@app` ha sido diseñada para promover la modularidad, la reutilización de componentes y la separación de preocupaciones. Esta organización permite que el desarrollo y el mantenimiento del código sean más eficientes y escalables. A continuación, se detallan los principales componentes de esta estructura:

1. **Core**: Esta carpeta contiene servicios singleton y modelos universales que son utilizados en toda la aplicación. Al centralizar estos elementos, se evita la duplicación de código y se facilita la gestión de dependencias.

2. **Features**: Aquí se agrupan los módulos de características específicas de la aplicación. Cada módulo puede contener sus propios componentes, servicios y modelos, lo que permite un desarrollo más enfocado y organizado. Esto también facilita la implementación de nuevas características sin afectar el resto de la aplicación.

3. **Shared**: Esta carpeta alberga componentes, pipes y directivas que son utilizados en múltiples lugares de la aplicación. Al tener estos elementos compartidos, se promueve la reutilización y se reduce la redundancia en el código.

4. **Configuración y Rutas**: Los archivos `app.config.ts` y `app.routes.ts` se encargan de la configuración de la aplicación y la definición de las rutas, respectivamente. Esto permite una gestión clara y centralizada de la configuración de la aplicación y su navegación.

## Justificación de la Implementación de `task-service-factory.service.ts`

La decisión de implementar el `task-service-factory.service.ts` se basa en la necesidad de proporcionar una forma flexible y escalable de gestionar diferentes fuentes de datos (local y API) en la aplicación. Este patrón de diseño permite:

1. **Abstracción**: Al utilizar un patrón de fábrica, se abstrae la lógica de selección del servicio de tareas, lo que permite cambiar fácilmente entre diferentes implementaciones (como `LocalTaskService` y `ApiTaskService`) sin modificar el código que consume estos servicios.

2. **Flexibilidad**: La aplicación puede adaptarse a diferentes entornos (por ejemplo, desarrollo local o producción) sin necesidad de realizar cambios significativos en el código. Esto es especialmente útil en situaciones donde se requiere cambiar la fuente de datos en tiempo de ejecución.

3. **Mantenibilidad**: Al centralizar la lógica de selección del servicio en un solo lugar, se facilita el mantenimiento y la extensión del código. Si en el futuro se necesita agregar un nuevo tipo de servicio, solo se debe modificar la fábrica sin afectar el resto de la aplicación.

4. **Observabilidad**: La implementación de un `BehaviorSubject` para gestionar el tipo de servicio actual permite que otros componentes de la aplicación se suscriban a los cambios y reaccionen en consecuencia, mejorando la reactividad de la aplicación.
