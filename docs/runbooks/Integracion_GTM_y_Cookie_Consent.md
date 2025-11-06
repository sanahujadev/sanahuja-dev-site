# Guía de Implementación: Google Tag Manager + Banner de Cookies

Esta guía detalla los pasos para integrar Google Tag Manager (GTM) con un banner de consentimiento de cookies utilizando la librería `vanilla-cookieconsent` en un proyecto de Astro.

---

### **Paso 1: Integración de Google Tag Manager (GTM)**

- **Acción:** Crear el componente `src/layouts/GoogleTagManager.astro`.
- **Contenido:** Este componente contiene el snippet oficial de GTM y, crucialmente, la configuración inicial del **Modo de Consentimiento**, que deniega por defecto el almacenamiento de cookies de análisis (`analytics_storage: 'denied'`).
- **Dependencia:** Requiere una variable de entorno `PUBLIC_GTM_ID` en tu archivo `.env`.

### **Paso 2: Carga de GTM en el Layout Principal**

- **Acción:** Modificar `src/layouts/Layout.astro`.
- **Detalles:**
  1.  Importar el componente: `import GoogleTagManager from './GoogleTagManager.astro';`
  2.  Añadir `<GoogleTagManager />` dentro de la etiqueta `<head>`.
  3.  Añadir el `<noscript>` de GTM justo después de abrir la etiqueta `<body>`.

### **Paso 3: Instalación y Carga de `vanilla-cookieconsent`**

- **Acción:** Instalar la librería.
- **Comando:** `pnpm add vanilla-cookieconsent@3.1.0`.
- **Acción:** Añadir los scripts de la librería en `src/layouts/Layout.astro`, justo antes de cerrar el `</body>`:
  1.  El script principal de la librería desde el CDN.
  2.  Un script `is:inline` que expone la configuración de las traducciones en el objeto `window`.
- **Documentación:** [Getting Started - cookieconsent](https://cookieconsent.orestbida.com/essential/getting-started.html)

### **Paso 4: Creación de una Clase `ConsentManager`**

- **Acción:** Crear el archivo `src/scripts/ConsentManager.ts`.
- **Propósito:** Esta clase encapsula toda la lógica de configuración del banner de cookies.
- **Lógica Clave:**
  - Configura las categorías (`necessary`, `analytics`).
  - Utiliza los callbacks (`onConsent`, `onChange`) para llamar a la función `updateGTMConsent`.
  - `updateGTMConsent` actualiza el estado del consentimiento en GTM (`gtag('consent', 'update', ...)`), concediendo o denegando permisos según la elección del usuario.
- **Documentación:** [Configuration - cookieconsent](https://cookieconsent.orestbida.com/essential/getting-started.html#configuration)

### **Paso 5: Creación del Script de Inicialización**

- **Acción:** Crear el archivo `src/scripts/init-consent.ts`.
- **Propósito:** Este script importa e inicializa la clase `ConsentManager` de forma segura.
- **Funcionamiento:** Espera a que la librería (`window.CookieConsent`) esté disponible (reintentando si es necesario) antes de ejecutar la lógica. Se activa tanto en la carga inicial de la página como en las navegaciones del lado del cliente de Astro (`astro:page-load`).

### **Paso 6: Personalización Completa de Estilos (Theming)**

- **Acción:** Modificar `src/global.css`.
- **Detalles:**
  1.  Importar los estilos base de la librería: `@import "vanilla-cookieconsent/dist/cookieconsent.css";`
  2.  Sobrescribir las variables CSS de la librería para personalizar el **tema claro**.
  3.  Añadir un bloque `.cc--darkmode #cc-main` para personalizar el **tema oscuro**.
  4.  Añadir un script en `Layout.astro` que añade la clase `cc--darkmode` al `<html>` si el sistema operativo del usuario está en modo oscuro (`prefers-color-scheme: dark`).
- **Documentación:**
  - [UI Customization](https://cookieconsent.orestbida.com/advanced/ui-customization.html)
  - [Variables de Color (SCSS)](https://github.com/orestbida/cookieconsent/tree/master/src/scss/abstracts)
