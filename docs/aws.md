# Configuración de Cabeceras de Seguridad en AWS CloudFront

Si estás sirviendo tu sitio web estático desde AWS S3 y CloudFront, necesitas configurar las cabeceras de seguridad directamente en tu distribución de CloudFront. La forma recomendada de hacerlo es mediante una **Política de Cabeceras de Respuesta (Response Headers Policy)**.

Aquí tienes los pasos para configurarlo:

1.  **Ve a la consola de CloudFront:**
    *   En el menú de la izquierda, ve a "Policies" -> "Response headers".

2.  **Crea una nueva política:**
    *   **Name:** `SecurityHeadersPolicy` (o un nombre descriptivo que prefieras).
    *   **Comment (Opcional):** "Añade cabeceras de seguridad estándar para el sitio web".

3.  **Añade las cabeceras personalizadas:**
    *   En la sección "Custom headers", haz clic en "Add header" y añade las siguientes cabeceras, una por una:

| Cabecera (Header)       | Valor (Value)                                                                                                                                                                                                                               |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-Content-Type-Options`  | `nosniff`                                                                                                                                                                                                                                   |
| `X-Frame-Options`         | `SAMEORIGIN`                                                                                                                                                                                                                                |
| `Referrer-Policy`         | `strict-origin-when-cross-origin`                                                                                                                                                                                                           |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; object-src 'none'; frame-ancestors 'self'; form-action 'self'; base-uri 'self';` |

4.  **Asocia la política a tu distribución:**
    *   Ve a tu distribución de CloudFront.
    *   Selecciona la pestaña "Behaviors".
    *   Elige el comportamiento que sirve tu contenido (normalmente el "Default (*)").
    *   Haz clic en "Edit".
    *   En la sección "Response headers policy", selecciona la política que acabas de crear (`SecurityHeadersPolicy`).
    *   Guarda los cambios.

Una vez que la distribución de CloudFront se actualice (puede tardar unos minutos), todas las respuestas de tu sitio web incluirán estas cabeceras de seguridad.
