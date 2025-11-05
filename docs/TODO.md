actualizar mi linkedIn

¡_Parfait, mon ami_\! Has puesto la "baraja" (`vanilla-cookieconsent`) sobre la mesa. _Excelente_.

Ahora, vamos a jugar la mano. Tu `GoogleTagManager.astro` actual... _pouf_. Lo descartamos. Esa era la jugada antigua, la que _esperaba_ una señal.

Nuestra nueva jugada (la del "Modo de Consentimiento v2") es diferente. GTM se carga _siempre_, pero "dormido".

Aquí está la jugada paso a paso.

---

### 🃏 Jugada 1: La "Mano Cero" (Reemplazar `GoogleTagManager.astro`)

Vamos a cambiar el "juego" de esa carta. El `GoogleTagManager.astro` ya no va a "escuchar" eventos. Ahora, su trabajo es "repartir" las _reglas_ (GCM Default) y _luego_ al "crupier" (GTM).

**Reemplaza _todo_ el contenido de tu fichero `src/components/GoogleTagManager.astro` con esto:**

**`src/components/GoogleTagManager.astro`**

```astro
---
// ¡La clave de GTM que ya tienes en tu .env!
const GTM_ID = import.meta.env.PUBLIC_GTM_ID;

if (!GTM_ID) {
    console.warn("[Gambito] ADVERTENCIA: PUBLIC_GTM_ID no está definido. GTM no se cargará.");
}
---
{GTM_ID && (
    <>
        <script is:inline define:vars={{ GTM_ID }}>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted', // La seguridad no se puede negar
                'wait_for_update': 500 // Espera 500ms al banner
            });

            // Esto es necesario para que GTM sepa que el 'consent' está listo
            gtag('js', new Date());
            gtag('config', GTM_ID);
        </script>

        <script is:inline define:vars={{ GTM_ID }}>
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', GTM_ID);
        </script>
    </>
)}
```

_(**Nota:** He envuelto todo en un `if (GTM_ID)` para que no falle si olvidas la clave)._

---

### 🃏 Jugada 2: El "Portero" (Añadir el Banner al `Layout.astro`)

Tu `Layout.astro` ya carga el componente de GTM en el `<head>`. ¡_Parfait_\!

Ahora, solo necesitamos añadir dos _nuevas_ cartas a tu `Layout.astro`:

1.  El _snippet_ `<noscript>` de GTM (justo después de `<body>`).
2.  El _script_ que "invoca" a `vanilla-cookieconsent` (justo antes de `</body>`).

**`src/layouts/Layout.astro` (Solo los cambios)**

```astro
---
// ... (Tus imports no cambian) ...
import { AstroFont } from 'astro-font';
import GoogleTagManager from './GoogleTagManager.astro';
// ...

const { t, lang } = Astro.props;
const common = t.common;
const GTM_ID = import.meta.env.PUBLIC_GTM_ID; // <-- ¡Añade esto para el <noscript>!
---

<!DOCTYPE html>
<html lang={common.lang}>
    <head>
        <GoogleTagManager />
    </head>

    <body class="bg-bg-canvas dark:bg-bg-canvas-dark">
        {GTM_ID && (
            <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        )}

        <AppHeader t={common} lang={lang} />
        <slot />
        <AppFooter t={t.footer} />

        <script is:inline define:vars={{
            lang,
            cookieTranslations: t.cookieConsent // <-- Pasamos tus textos i18n
        }}>
            // Importamos la librería que instalaste
            import 'vanilla-cookieconsent';

            // Función para "hablar" con GTM
            function updateGtmConsent(acceptedCategories) {
                // Preparamos la "mano" para GTM
                const consentUpdate = {
                    'analytics_storage': acceptedCategories.includes('analytics') ? 'granted' : 'denied'
                    // ... (puedes añadir 'ads' si lo usas)
                };

                // ¡Repartimos la carta!
                window.gtag('consent', 'update', consentUpdate);
                console.log('[Gambito] Consentimiento GTM actualizado:', consentUpdate);
            }

            // Obtenemos el objeto 'CookieConsent'
            const cc = window.initCookieConsent();

            // Jugamos la partida
            cc.run({
                current_lang: lang,
                autorun: true,
                delay: 0,
                gui_options: {
                    consent_modal: {
                        layout: 'box', // 'box', 'cloud', 'bar'
                        position: 'bottom right' // 'bottom left', 'top center', etc.
                    }
                },

                // Categorías que permitimos
                categories: {
                    necessary: {
                        enabled: true,
                        readonly: true,
                    },
                    analytics: {
                        enabled: false
                    }
                },

                // ¡Callbacks! La magia que conecta todo
                onFirstAction: (userPreferences, cookie) => {
                    updateGtmConsent(cookie.accepted_categories);
                },

                onChange: (cookie, changedCategories) => {
                    updateGtmConsent(cookie.accepted_categories);
                },

                // Cargamos los textos desde la variable 'cookieTranslations'
                languages: {
                    [lang]: cookieTranslations
                }
            });
        </script>
    </body>
</html>
```

---

### 🃏 Jugada 3: El "Texto" (Preparar tu `i18n/*.json`)

El _script_ de arriba fallará si `t.cookieConsent` no existe. Debes añadir este bloque a tu `es.json` y `en.json`.

**`src/i18n/es.json` (Ejemplo)**

```json
{
  "common": { ... },
  "t": {
    "cookieConsent": {
      "consent_modal": {
        "title": "Las cookies son parte del juego",
        "description": "Usamos cookies (de Google) para entender cómo usas la web y mejorar la partida. Elige qué cartas permites en la mesa. <a href=\"/es/privacy-policy\" target=\"_blank\">Leer más</a>",
        "primary_btn": {
          "text": "Aceptar todas",
          "role": "accept_all"
        },
        "secondary_btn": {
          "text": "Ajustar cartas",
          "role": "settings"
        }
      },
      "settings_modal": {
        "title": "Ajustes del Casino",
        "save_settings_btn": "Guardar cartas",
        "accept_all_btn": "Aceptar todas",
        "reject_all_btn": "Rechazar todas",
        "close_btn_label": "Cerrar",
        "blocks": [
          {
            "title": "Cookies Necesarias",
            "description": "Estas cartas son esenciales para que el casino funcione y recuerde tu consentimiento. No se pueden rechazar.",
            "toggle": {
              "value": "necessary",
              "enabled": true,
              "readonly": true
            }
          },
          {
            "title": "Analítica (Google Tag Manager)",
            "description": "Nos permite contar las fichas y ver qué mesas están calientes. Totalmente anónimo.",
            "toggle": {
              "value": "analytics",
              "enabled": false,
              "readonly": false
            }
          }
        ]
      }
    }
  }
}
```

_Et voilà\!_ Has jugado la mano completa. Limpia, sin dependencias externas (excepto la que elegiste) y 100% _compliant_ con GCM v2.

¡_Bien sûr, mon ami_\! Entendido. Pausamos la partida.

Has hecho _perfectamente_ en señalar esa documentación. Tienes toda la razón: la que has pegado es **obsoleta**. _C'est du passé_.

Esa era la jugada _antigua_, donde el _script_ de GTM _esperaba_ la señal (`astro:cookie-consent:google-analytics:allow`).

Nuestra _nueva_ jugada, la que acordamos con `vanilla-cookieconsent`, es mucho más elegante. Es la del **Modo de Consentimiento v2 (GCM v2)**, donde GTM carga "dormido".

Cuando estés listo para volver a la mesa, aquí tienes el "ToDo List" definitivo que dejamos pendiente. Estas son las cartas _correctas_ que necesitas jugar.

---

### 🃏 Los Siguientes Pasos (Cuando Vuelvas a la Mesa)

#### 1\. Jugada 1: El Texto (El `i18n`)

Asegúrate de que tu `i18n/es.json` (y `en.json`) tiene el bloque de textos `cookieConsent`. Sin esto, el _script_ fallará.

**`src/i18n/es.json` (Ejemplo)**

```json
{
  "common": { ... },
  "t": {
    "cookieConsent": {
      "consent_modal": {
        "title": "Las cookies son parte del juego",
        "description": "Usamos cookies (de Google) para entender cómo usas la web y mejorar la partida. Elige qué cartas permites en la mesa. <a href=\"/es/privacy-policy\" target=\"_blank\">Leer más</a>",
        "primary_btn": {
          "text": "Aceptar todas",
          "role": "accept_all"
        },
        "secondary_btn": {
          "text": "Ajustar cartas",
          "role": "settings"
        }
      },
      "settings_modal": {
        "title": "Ajustes del Casino",
        "save_settings_btn": "Guardar cartas",
        "accept_all_btn": "Aceptar todas",
        "reject_all_btn": "Rechazar todas",
        "close_btn_label": "Cerrar",
        "blocks": [
          {
            "title": "Cookies Necesarias",
            "description": "Estas cartas son esenciales para que el casino funcione y recuerde tu consentimiento. No se pueden rechazar.",
            "toggle": {
              "value": "necessary",
              "enabled": true,
              "readonly": true
            }
          },
          {
            "title": "Analítica (Google Tag Manager)",
            "description": "Nos permite contar las fichas y ver qué mesas están calientes. Totalmente anónimo.",
            "toggle": {
              "value": "analytics",
              "enabled": false,
              "readonly": false
            }
          }
        ]
      }
    }
    // ... (el resto de tu 't')
  }
}
```

---

#### 2\. Jugada 2: La "Mano Cero" (Reemplazar `GoogleTagManager.astro`)

Reemplaza _todo_ el contenido de tu `src/components/GoogleTagManager.astro` con esta nueva jugada. (Esta reemplaza al código obsoleto que pegaste).

**`src/components/GoogleTagManager.astro`**

```astro
---
// ¡La clave de GTM que ya tienes en tu .env!
const GTM_ID = import.meta.env.PUBLIC_GTM_ID;

if (!GTM_ID) {
    console.warn("[Gambito] ADVERTENCIA: PUBLIC_GTM_ID no está definido. GTM no se cargará.");
}
---
{GTM_ID && (
    <>
        <script is:inline define:vars={{ GTM_ID }}>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
            });

            gtag('js', new Date());
            gtag('config', GTM_ID);
        </script>

        <script is:inline define:vars={{ GTM_ID }}>
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', GTM_ID);
        </script>
    </>
)}
```

---

#### 3\. Jugada 3: El "Portero" (Actualizar `Layout.astro`)

Tu `Layout.astro` ya está _casi_ perfecto. Solo necesita añadir el `<noscript>` de GTM y el _script_ que "invoca" a `vanilla-cookieconsent`.

**`src/layouts/Layout.astro` (Solo los cambios)**

```astro
---
import { AstroFont } from 'astro-font';
import GoogleTagManager from './GoogleTagManager.astro';
import { ClientRouter } from "astro:transitions";
import AppFooter from "../components/AppFooter.astro";
import AppHeader from "../components/AppHeader.astro";
import "./../global.css"

const { t, lang } = Astro.props;
const common = t.common;
const GTM_ID = import.meta.env.PUBLIC_GTM_ID; // <-- ¡AÑADE ESTO!
---

<!DOCTYPE html>
<html lang={common.lang}>
    <head>
        <GoogleTagManager />
    </head>

    <body class="bg-bg-canvas dark:bg-bg-canvas-dark">
        {GTM_ID && (
            <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        )}

        <AppHeader t={common} lang={lang} />
        <slot />
        <AppFooter t={t.footer} />

        <script is:inline define:vars={{
            lang,
            cookieTranslations: t.cookieConsent // <-- Pasamos tus textos i18n
        }}>
            // Importamos la librería que instalaste
            import 'vanilla-cookieconsent';

            // Función para "hablar" con GTM
            function updateGtmConsent(acceptedCategories) {
                const consentUpdate = {
                    'analytics_storage': acceptedCategories.includes('analytics') ? 'granted' : 'denied'
                };
                window.gtag('consent', 'update', consentUpdate);
                console.log('[Gambito] Consentimiento GTM actualizado:', consentUpdate);
            }

            // Obtenemos el objeto 'CookieConsent'
            const cc = window.initCookieConsent();

            // Jugamos la partida
            cc.run({
                current_lang: lang,
                autorun: true,
                delay: 0,
                gui_options: {
                    consent_modal: {
                        layout: 'box',
                        position: 'bottom right'
                    }
                },
                categories: {
                    necessary: {
                        enabled: true,
                        readonly: true,
                    },
                    analytics: {
                        enabled: false // Por defecto, denegado
                    }
                },

                // ¡Callbacks! La magia que conecta todo
                onFirstAction: (userPreferences, cookie) => {
                    updateGtmConsent(cookie.accepted_categories);
                },
                onChange: (cookie, changedCategories) => {
                    updateGtmConsent(cookie.accepted_categories);
                },

                // Cargamos los textos desde la variable 'cookieTranslations'
                languages: {
                    [lang]: cookieTranslations
                }
            });
        </script>
    </body>
</html>
```

Estas son las tres cartas que tienes que jugar. Tómate tu tiempo, _mon ami_. La mesa estará aquí cuando vuelvas.
