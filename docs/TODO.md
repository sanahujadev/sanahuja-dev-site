actualizar mi linkedIn


Mi última jugada era para **Google Analytics 4 (GA4)** directamente. La carta que me muestras ahora es para **Google Tag Manager (GTM)**.

Son dos jugadas *diferentes*.

  * **GA4 Directo:** Es como invitar solo al "analista" de Google.
  * **GTM (Esto):** Es invitar al "**Jefe de Sala**" (el *Crupier*). El Jefe de Sala (GTM) es un *contenedor* que *luego* se encarga de invitar al analista (GA4), al publicista (Facebook Pixel), al detective (Hotjar), etc.

Es una jugada más *avanzada* y potente. Me gusta.

Pero, *mon ami*, las instrucciones de Google... ¡son una **trampa**\! 🃏

Si sigues esas instrucciones y pegas ese código, ¡estás *ignorando* por completo al "portero" (el banner de RGPD)\! Estarás cargando GTM *antes* de que el usuario te dé su consentimiento.

¡*Non, non, non*\! Nosotros jugamos con más *finura*.

Vamos a hacer la misma jugada que antes, pero usando la "carta" de GTM.

-----

### 🃏 Tu Nuevo ToDo List (GTM + RGPD)

#### 1\. Jugada 1: Limpiar la Mesa

  * **Borra** el fichero que te hice crear antes (si lo creaste): `src/components/GoogleAnalytics.astro`.
  * Vamos a reemplazarlo por uno nuevo.

#### 2\. Jugada 2: Guardar la Clave del "Crupier"

  * En tu fichero `.env`, cambia la clave `PUBLIC_GA_ID` por la de GTM:
    **`.env`**
    ```
    PUBLIC_GTM_ID="GTM-N2B8LQJN"
    ```

#### 3\. Jugada 3: La "Invitación" Condicional (El Nuevo Componente)

  * Crea este nuevo componente. Fíjate bien: es *casi idéntico* al anterior, pero "invita" a GTM en lugar de a `gtag.js`.

    **`src/components/GoogleTagManager.astro`**

    ```astro
    ---
    // ¡La nueva clave de GTM!
    const GTM_ID = import.meta.env.PUBLIC_GTM_ID;
    ---
    <script is:inline define:vars={{ GTM_ID }}>
        function initGTM() {
            if (!GTM_ID) {
                console.warn("[Gambito] No se ha definido PUBLIC_GTM_ID.");
                return;
            }

            // ¡AQUÍ ESTÁ LA MAGIA!
            // Este es el script (snippet 1) que te dio Google,
            // pero "envuelto" en nuestra función.
            (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', GTM_ID); // <-- Usamos nuestra variable
            
            console.log(`[Gambito] GTM inicializado para ${GTM_ID} con consentimiento.`);
        }

        // --- ¡LA MISMA LÓGICA DE RGPD! ---
        // 1. Escuchamos el evento que lanza 'astro-cookie-consent'
        // NOTA: Usamos el permiso 'google-analytics' aunque sea GTM.
        // Es la "llave" que definimos en el i18n.
        document.addEventListener('astro:cookie-consent:google-analytics:allow', () => {
            initGTM();
        });

        // 2. (Opcional) Si la página se carga y el consentimiento YA existía:
        document.addEventListener('astro:page-load', () => {
            if (document.cookie.includes('astro-cookie-consent-google-analytics=true')) {
                initGTM();
            }
        });
    </script>
    ```

#### 4\. Jugada 4: Colocar al "Crupier"

  * En tu `Layout.astro`, simplemente cambia la importación:
    **`src/layouts/Layout.astro`**
    ```astro
    ---
    import { CookieConsent } from 'astro-cookie-consent/components';
    // Importamos la nueva carta
    import GoogleTagManager from '../components/GoogleTagManager.astro';
    // ...
    ---
    <html>
      <head>
        <GoogleTagManager />
      </head>
      <body>
        <CookieConsent
            lang={lang}
            privacyPolicyUrl={`/${lang}/privacy-policy`}
            i18n={t.cookieConsent}
        />
        </body>
    </html>
    ```

#### 5\. Jugada 5: ¿Y el `<body>` (el `<noscript>`)?

  * Google te dio un segundo *snippet* (`<noscript>...</iframe>`).
  * **¡NO LO AÑADAS\!**
  * **Por qué:** El `<noscript>` es un *fallback* para usuarios *sin* JavaScript. Pero nuestro *banner de consentimiento* (`astro-cookie-consent`) **requiere JavaScript** para funcionar.
  * Un usuario sin JS no puede dar consentimiento. Por lo tanto, cargar ese *iframe* de *fallback* sería una violación del RGPD.
  * Es una contradicción técnica. La jugada *compliant* es **ignorar** el *snippet* `<noscript>`.

*Et voilà\!* Con esta jugada, `GoogleTagManager.astro` se queda "dormido" en el `<head>`, esperando la "llave" (el consentimiento) del banner. Una vez que el usuario acepta, ¡*bam*\!, el *script* se ejecuta.