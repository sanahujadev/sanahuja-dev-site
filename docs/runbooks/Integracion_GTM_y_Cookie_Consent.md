# Guía de Implementación: Google Tag Manager + Banner de Cookies

Esta guía detalla los pasos para integrar Google Tag Manager (GTM) con un banner de consentimiento de cookies utilizando la librería `vanilla-cookieconsent` en un proyecto de Astro.

---

> ⚠️ **Nota de Arquitectura (Refactorización Reciente)**
> La implementación original descrita en los pasos 1 y 2 ha sido **reemplazada** por un enfoque más robusto para soportar correctamente las navegaciones SPA (View Transitions) de Astro. La nueva arquitectura se basa en un script "stub" (`gtag-stub.ts`) que garantiza que GTM y el consentimiento se inicialicen en el orden correcto en cada carga de página. Las notas a continuación detallan los cambios.

---

### **Paso 1: Integración de Google Tag Manager (GTM)**

- **Acción:** Crear el componente `src/layouts/GoogleTagManager.astro`.
- **Contenido:** Este componente contiene el snippet oficial de GTM y, crucialmente, la configuración inicial del **Modo de Consentimiento**, que deniega por defecto el almacenamiento de cookies de análisis (`analytics_storage: 'denied'`).
- **Dependencia:** Requiere una variable de entorno `PUBLIC_GTM_ID` en tu archivo `.env`.

> 🆕 **Nota de Actualización (Paso 1 y 2):**
> El componente `GoogleTagManager.astro` ha sido **eliminado**. La lógica de GTM ahora reside en `src/scripts/gtag-stub.ts`. Este nuevo script es responsable de:
> 1.  Crear un `stub` de la función `window.gtag` para que siempre esté disponible.
> 2.  Configurar el `consent default` **antes** de cargar GTM, lo cual es crítico.
> 3.  Inyectar dinámicamente el script de GTM (`gtm.js`) de forma asíncrona.
> 4.  Asegurarse de que el script de GTM solo se cargue **una vez**, incluso en navegaciones SPA.
>
> Este script se importa directamente en `src/layouts/Layout.astro`.

### **Paso 2: Carga de GTM en el Layout Principal**

- **Acción:** Modificar `src/layouts/Layout.astro`.
- **Detalles:**
  1.  Importar el componente: `import GoogleTagManager from './GoogleTagManager.astro';`
  2.  Añadir `<GoogleTagManager />` dentro de la etiqueta `<head>`.
  3.  Añadir el `<noscript>` de GTM justo después de abrir la etiqueta `<body>`.

### **Paso 3: Instalación y Carga de `vanilla-cookieconsent`**

- **Acción:** Instalar la librería.
- **Comando:** `pnpm add vanilla-cookieconsent@3.1.0`.
- **Acción:** Añadir los scripts de la librería en `src/layouts/Layout.astro`:
  1.  El script principal de la librería desde el CDN.
  2.  Un script `is:inline` que expone la configuración de las traducciones y el `GTM_ID` en el objeto `window`.
- **Documentación:** [Getting Started - cookieconsent](https://cookieconsent.orestbida.com/essential/getting-started.html)

### **Paso 4: Creación de una Clase `ConsentManager`**

- **Acción:** Crear el archivo `src/scripts/ConsentManager.ts`.
- **Propósito:** Esta clase encapsula toda la lógica de configuración del banner de cookies.
- **Lógica Clave:**
  - Configura las categorías (`necessary`, `analytics`).
  - Utiliza los callbacks (`onConsent`, `onChange`) para llamar a la función `updateGTMConsent`.
  - `updateGTMConsent` actualiza el estado del consentimiento en GTM (`gtag('consent', 'update', ...)`), concediendo o denegando permisos según la elección del usuario.

> 🆕 **Nota de Actualización:**
> La clase `ConsentManager` ha sido mejorada significativamente:
> - **`syncExistingConsent()`**: Se ha añadido un nuevo método que lee la cookie de consentimiento existente en cada carga de página. Esto asegura que si un usuario ya ha dado su consentimiento, GTM sea informado inmediatamente sin necesidad de que el usuario interactúe de nuevo con el banner.
> - **De-duplicación**: La función `updateGTMConsent` ahora comprueba si el estado de consentimiento ha cambiado realmente antes de enviar una actualización a GTM, evitando llamadas redundantes.
> - **Sincronización con GTM**: El manager ahora espera a que `gtag` esté disponible (escuchando un evento custom `gtm:loaded`) antes de intentar actualizar el consentimiento.

- **Documentación:** [Configuration - cookieconsent](https://cookieconsent.orestbida.com/essential/getting-started.html#configuration)

### **Paso 5: Creación del Script de Inicialización**

- **Acción:** Crear el archivo `src/scripts/init-consent.ts`.
- **Propósito:** Este script importa e inicializa la clase `ConsentManager` de forma segura.
- **Funcionamiento:** Espera a que la librería (`window.CookieConsent`) esté disponible (reintentando si es necesario) antes de ejecutar la lógica. Se activa tanto en la carga inicial de la página como en las navegaciones del lado del cliente de Astro (`astro:page-load`).

> 🆕 **Nota de Actualización:**
> El script `init-consent.ts` ahora es más inteligente:
> - **Doble Dependencia**: No solo espera a `window.CookieConsent`, sino también a que `window.gtag` esté definido por el `gtag-stub.ts`.
> - **Sincronización en SPA**: Si la instancia del `ConsentManager` ya existe (en una navegación SPA), en lugar de detenerse, llama a `manager.syncExistingConsent()` para re-sincronizar el estado actual.
> - **Basado en Eventos**: Su inicialización ahora puede ser disparada por el evento `gtm:loaded`, garantizando un orden de ejecución perfecto.

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
