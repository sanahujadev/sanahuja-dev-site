# Resumen Ejecutivo: Estrategia Definitiva para GTM + Consentimiento en Astro

---

### 🎯 **Objetivo final**
✅ GTM funcione en **primera carga** y en **navegaciones SPA**  
✅ Consentimiento se aplique **siempre** (Tag Assistant no muestra errores)  
✅ Cumplir con **Consent Mode v2** de Google (obligatorio desde marzo 2024)

---

## 🧱 **Estrategia en 4 pilares**

### 1️⃣ **Garantizar que `window.gtag` siempre exista (incluso en SPA)**
➡️ Usar un **stub persistente e idempotente**:
```ts
window.gtag = window.gtag || ((...args) => window.dataLayer.push(args));
```
- Se define **en cada navegación** (gracias a `<script is:inline>` en `<body>`)  
- Nunca es `undefined` → ConsentManager no falla silenciosamente

---

### 2️⃣ **Orden de ejecución crítico (lo que falla en Tag Assistant)**
El orden **DEBE** ser:

```js
1. window.dataLayer = [...]
2. window.gtag = stub
3. gtag('consent', 'default', { ... })    // 🔑 ANTES de cargar GTM
4. cargar https://www.googletagmanager.com/gtm.js?id=XXX
// ❌ NUNCA: gtag('js', ...) ni gtag('config', ...) aquí
```

> ⚠️ Si `consent default` no va **antes** de `gtm.js`, Tag Assistant dice *"Consentimiento no configurado"*.

---

### 3️⃣ **Evitar carga asíncrona prematura de GTM**
- ❌ `script.async = true` → peligroso: GTM puede correr antes del consentimiento  
- ✅ Usar `script.defer = true` (o incluso sincrónico en primera carga)  
- ✅ Marcar con `window.__GTM_LOADED__` para no recargar en SPA

---

### 4️⃣ **Configuración defensiva en GTM (back-end)**
En el contenedor de Google Tag Manager:
- ✅ Todos los tags con **"Require consent for this tag"**  
- ✅ `analytics_storage` como requisito para GA4  
- ✅ Usar **Consent Mode v2** (no v1) en la configuración del contenedor

---

## 📦 Flujo de ejecución real (SPA + primera carga)

| Evento | ¿Qué pasa? |
|-------|-------------|
| **Primera carga** |  |
| 1. `<script is:inline>` en `<body>` se ejecuta → define `gtag` stub + `consent default` |
| 2. Se carga `gtm.js` (defer o sync) |
| 3. GTM arranca **ya sabiendo** el estado inicial de consentimiento |
| 4. ConsentManager sincroniza cookie existente → `gtag('consent', 'update', ...)` |
| **Navegación SPA** (`/` → `/contacto`) |  |
| 1. Astro actualiza `<body>` → `<script is:inline>` se **vuelve a ejecutar** |
| 2. `gtag` sigue definida (stub persiste) → `consent default` se reaplica (idempotente) |
| 3. ConsentManager llama `syncExistingConsent()` → envía `update` a GTM |
| 4. GTM recibe el nuevo estado → tags se activan/desactivan dinámicamente |

✅ **Ningún momento sin `gtag`**  
✅ **Ningún momento sin consentimiento definido**

---

## 🛠️ Checklist de implementación (copia/pega)

1. ✅ `env.d.ts` con `declare global { window.gtag, dataLayer, ... }`  
2. ✅ `<script is:inline>` en `<body>` de `Layout.astro` con:
   - Stub de `gtag`
   - `gtag('consent', 'default', ...)`
   - Carga de `gtm.js` con `defer` (no `async`)
3. ✅ Eliminar `gtag('js', ...)` y `gtag('config', ...)` del stub  
4. ✅ ConsentManager: eliminar `if (typeof gtag !== "function") return`  
5. ✅ En GTM: activar *"Require consent"* en todos los tags
