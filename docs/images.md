# Tutorial Completo: Optimización de Media para Core Web Vitals en Astro + Preact

Como desarrollador frontend senior, te guiaré a través de una estrategia completa y moderna para gestionar assets en tu e-commerce de regalos, optimizando para Core Web Vitals.

---

## 1. Estrategia en el CDN

### Nomenclatura y Estructura de Carpetas

**Opción A: Estructura por Dimensiones y Formato (Recomendada para e-commerce)**

```
/cdn
  /products
    /hero-banner-2024
      /original
        hero-banner-2024.jpg
      /w360
        hero-banner-2024.webp
        hero-banner-2024.avif
        hero-banner-2024.jpg
      /w720
        hero-banner-2024.webp
        hero-banner-2024.avif
        hero-banner-2024.jpg
      /w1280
        hero-banner-2024.webp
        hero-banner-2024.avif
        hero-banner-2024.jpg
      /w1920
        hero-banner-2024.webp
        hero-banner-2024.avif
        hero-banner-2024.jpg
```

**Ventajas:**
- Fácil de navegar y mantener
- Permite eliminar tamaños específicos sin afectar otros
- Clara separación entre original y variantes

**Opción B: Estructura por Formato (Óptima para CDNs con transformación on-the-fly)**

```
/cdn
  /products
    /hero-banner-2024
      /avif
        hero-banner-2024-360w.avif
        hero-banner-2024-720w.avif
        hero-banner-2024-1280w.avif
        hero-banner-2024-1920w.avif
      /webp
        hero-banner-2024-360w.webp
        hero-banner-2024-720w.webp
        hero-banner-2024-1280w.webp
        hero-banner-2024-1920w.webp
      /jpg
        hero-banner-2024-360w.jpg
        hero-banner-2024-720w.jpg
        hero-banner-2024-1280w.jpg
        hero-banner-2024-1920w.jpg
      hero-banner-2024-original.jpg
```

**Ventajas:**
- Ideal para implementar cache strategies por formato
- Facilita la migración a nuevos formatos
- Permite servir diferentes headers HTTP por carpeta

**Opción C: Flat Structure con Nomenclatura Descriptiva (Mejor para automatización)**

```
/cdn
  /products
    hero-banner-2024_original.jpg
    hero-banner-2024_w360.avif
    hero-banner-2024_w360.webp
    hero-banner-2024_w360.jpg
    hero-banner-2024_w720.avif
    hero-banner-2024_w720.webp
    hero-banner-2024_w720.jpg
    hero-banner-2024_w1280.avif
    hero-banner-2024_w1280.webp
    hero-banner-2024_w1280.jpg
```

**Ventajas:**
- Simplicidad extrema para scripts de procesamiento
- Fácil búsqueda por glob patterns
- Menor profundidad de directorios (mejor para algunos CDNs)

---

## 2. Flujo de Optimización

### Librerías de Optimización Recomendadas

#### **1. Sharp (Node.js - La más potente y rápida)**

```bash
npm install sharp
```

**Características:**
- Extremadamente rápida (usa libvips)
- Soporte completo para AVIF, WebP, JPEG, PNG
- Control fino sobre compresión y calidad
- Excelente para procesamiento batch

**Ejemplo básico:**

```javascript
import sharp from 'sharp';

await sharp('input.jpg')
  .resize(720, null, { withoutEnlargement: true })
  .avif({ quality: 80, effort: 6 })
  .toFile('output-720w.avif');
```

#### **2. Squoosh CLI (Google - Óptima para calidad/tamaño)**

```bash
npm install @squoosh/cli
```

**Características:**
- Algoritmos de compresión de última generación
- CLI simple y efectiva
- Misma tecnología que squoosh.app
- Ideal para comparar calidad entre codecs

**Ejemplo:**

```bash
npx @squoosh/cli --avif '{"cqLevel":33,"effort":6}' --webp '{"quality":80}' input.jpg
```

#### **3. ImageMagick (vía imagemagick-cli-wrapper)**

```bash
npm install imagemagick
```

**Características:**
- El clásico, con soporte para +200 formatos
- Muy versátil para transformaciones complejas
- Ideal si ya está en tu pipeline de build
- Ligero en dependencias

---

### Flujo Automatizado durante Build Time

Aquí tienes un script simple pero efectivo que puedes integrar en tu `package.json`:

```javascript
// scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const SIZES = [360, 720, 1280, 1920];
const FORMATS = ['avif', 'webp', 'jpg'];
const INPUT_DIR = './public/images/original';
const OUTPUT_DIR = './public/images/optimized';

async function optimizeImages() {
  const files = await readdir(INPUT_DIR);
  const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  for (const image of images) {
    const { name } = parse(image);
    const inputPath = join(INPUT_DIR, image);

    console.log(`📸 Processing: ${image}`);

    for (const size of SIZES) {
      const sizeDir = join(OUTPUT_DIR, `w${size}`);
      await mkdir(sizeDir, { recursive: true });

      const pipeline = sharp(inputPath)
        .resize(size, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });

      // AVIF - mejor compresión
      await pipeline
        .clone()
        .avif({ quality: 80, effort: 6 })
        .toFile(join(sizeDir, `${name}.avif`));

      // WebP - buen balance
      await pipeline
        .clone()
        .webp({ quality: 85 })
        .toFile(join(sizeDir, `${name}.webp`));

      // JPEG - fallback
      await pipeline
        .clone()
        .jpeg({ quality: 85, progressive: true })
        .toFile(join(sizeDir, `${name}.jpg`));

      console.log(`  ✓ Generated ${size}w variants`);
    }
  }

  console.log('✨ All images optimized!');
}

optimizeImages().catch(console.error);
```

**Agregar al `package.json`:**

```json
{
  "scripts": {
    "optimize:images": "node scripts/optimize-images.mjs",
    "prebuild": "npm run optimize:images",
    "build": "astro build"
  }
}
```

---

## 3. Implementación en el Frontend

### Elemento `<picture>` con `<source>`

```html
<picture>
  <!-- AVIF - mejor compresión (Chrome, Edge, Opera) -->
  <source
    type="image/avif"
    srcset="
      /images/w360/product.avif 360w,
      /images/w720/product.avif 720w,
      /images/w1280/product.avif 1280w,
      /images/w1920/product.avif 1920w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
  
  <!-- WebP - buen balance (la mayoría de navegadores) -->
  <source
    type="image/webp"
    srcset="
      /images/w360/product.webp 360w,
      /images/w720/product.webp 720w,
      /images/w1280/product.webp 1280w,
      /images/w1920/product.webp 1920w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
  
  <!-- JPEG - fallback universal -->
  <img
    src="/images/w720/product.jpg"
    srcset="
      /images/w360/product.jpg 360w,
      /images/w720/product.jpg 720w,
      /images/w1280/product.jpg 1280w,
      /images/w1920/product.jpg 1920w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    alt="Descripción del producto"
    loading="lazy"
    decoding="async"
    width="1280"
    height="720"
  />
</picture>
```

**Desglose de atributos clave:**

- **`srcset`**: Lista de variantes con sus anchos intrínsecos
- **`sizes`**: Indica al navegador qué tamaño ocupará la imagen en el layout
- **`type`**: MIME type para que el navegador elija el formato soportado
- **`loading="lazy"`**: Carga diferida nativa del navegador
- **`decoding="async"`**: Decodificación asíncrona para no bloquear el thread principal
- **`width` y `height`**: Previene layout shift (CLS) reservando espacio

---

### Componente Reutilizable en Preact/React

```jsx
import { h } from 'preact';

/**
 * ResponsiveImage Component
 * 
 * @param {string} src - Base path/name without extension (e.g., 'products/gift-box')
 * @param {string} alt - Alt text for accessibility
 * @param {string} [sizes] - CSS sizes attribute (defaults based on common breakpoints)
 * @param {number[]} [widths] - Array of width variants available
 * @param {boolean} [priority] - If true, disables lazy loading (for LCP images)
 * @param {number} [width] - Intrinsic width for aspect ratio
 * @param {number} [height] - Intrinsic height for aspect ratio
 * @param {string} [className] - Additional CSS classes
 */
export default function ResponsiveImage({
  src,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  widths = [360, 720, 1280, 1920],
  priority = false,
  width,
  height,
  className = '',
  ...props
}) {
  // Generate srcset string for each format
  const generateSrcSet = (format) => {
    return widths
      .map((w) => `/images/w${w}/${src}.${format} ${w}w`)
      .join(', ');
  };

  // Determine loading strategy
  const loadingAttr = priority ? 'eager' : 'lazy';
  const fetchPriorityAttr = priority ? 'high' : 'auto';

  return (
    <picture>
      {/* AVIF - Best compression */}
      <source
        type="image/avif"
        srcSet={generateSrcSet('avif')}
        sizes={sizes}
      />

      {/* WebP - Good browser support */}
      <source
        type="image/webp"
        srcSet={generateSrcSet('webp')}
        sizes={sizes}
      />

      {/* JPEG fallback */}
      <img
        src={`/images/w720/${src}.jpg`}
        srcSet={generateSrcSet('jpg')}
        sizes={sizes}
        alt={alt}
        loading={loadingAttr}
        fetchpriority={fetchPriorityAttr}
        decoding="async"
        width={width}
        height={height}
        className={className}
        {...props}
      />
    </picture>
  );
}

// Example usage demonstration
function ProductCard() {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <ResponsiveImage
        src="products/luxury-gift-box"
        alt="Caja de regalo de lujo con lazo dorado"
        width={1280}
        height={720}
        className="w-full h-auto"
      />
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">Caja de Regalo Premium</h3>
        <p className="text-gray-700 text-base">
          Perfecto para ocasiones especiales. Incluye embalaje personalizado.
        </p>
        <div className="mt-4">
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            €49.99
          </span>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800">
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src="hero/holiday-banner"
          alt="Banner de ofertas navideñas"
          sizes="100vw"
          priority={true}
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">Regalos Únicos</h1>
        <p className="text-xl mb-8">Encuentra el regalo perfecto</p>
        <button className="bg-white text-purple-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Explorar Catálogo
        </button>
      </div>
    </section>
  );
}

// Demo application
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Productos Destacados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>© 2025 Gift Shop. Optimizado para Core Web Vitals ⚡</p>
      </footer>
    </div>
  );
}

```

### Componente Reutilizable en Astro

```astro
---
/**
 * ResponsiveImage.astro
 * Astro component for optimized, responsive images
 * 
 * @prop {string} src - Base path/name without extension
 * @prop {string} alt - Alt text
 * @prop {string} [sizes] - CSS sizes attribute
 * @prop {number[]} [widths] - Available width variants
 * @prop {boolean} [priority] - Disable lazy loading for LCP
 * @prop {number} [width] - Intrinsic width
 * @prop {number} [height] - Intrinsic height
 * @prop {string} [class] - CSS classes
 */

interface Props {
  src: string;
  alt: string;
  sizes?: string;
  widths?: number[];
  priority?: boolean;
  width?: number;
  height?: number;
  class?: string;
}

const {
  src,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  widths = [360, 720, 1280, 1920],
  priority = false,
  width,
  height,
  class: className = '',
  ...attrs
} = Astro.props;

// Generate srcset for each format
const generateSrcSet = (format: string) => {
  return widths
    .map((w) => `/images/w${w}/${src}.${format} ${w}w`)
    .join(', ');
};

const loadingAttr = priority ? 'eager' : 'lazy';
const fetchPriorityAttr = priority ? 'high' : 'auto';
---

<picture>
  <!-- AVIF - Best compression -->
  <source
    type="image/avif"
    srcset={generateSrcSet('avif')}
    sizes={sizes}
  />

  <!-- WebP - Good browser support -->
  <source
    type="image/webp"
    srcset={generateSrcSet('webp')}
    sizes={sizes}
  />

  <!-- JPEG fallback -->
  <img
    src={`/images/w720/${src}.jpg`}
    srcset={generateSrcSet('jpg')}
    sizes={sizes}
    alt={alt}
    loading={loadingAttr}
    fetchpriority={fetchPriorityAttr}
    decoding="async"
    width={width}
    height={height}
    class={className}
    {...attrs}
  />
</picture>

<style>
  picture {
    display: contents;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
</style>
```

**Ejemplo de uso en Astro:**

```astro
---
// pages/products/[slug].astro
import ResponsiveImage from '@/components/ResponsiveImage.astro';
import Layout from '@/layouts/Layout.astro';
---

<Layout title="Producto">
  <main>
    <!-- Hero Image (LCP candidate) -->
    <ResponsiveImage
      src="products/luxury-gift-box"
      alt="Caja de regalo de lujo"
      priority={true}
      width={1920}
      height={1080}
      sizes="100vw"
      class="w-full h-[60vh] object-cover"
    />

    <!-- Product Gallery (lazy loaded) -->
    <div class="grid grid-cols-3 gap-4 mt-8">
      <ResponsiveImage
        src="products/gift-box-detail-1"
        alt="Detalle de la caja"
        width={640}
        height={480}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <ResponsiveImage
        src="products/gift-box-detail-2"
        alt="Interior de la caja"
        width={640}
        height={480}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <ResponsiveImage
        src="products/gift-box-detail-3"
        alt="Embalaje"
        width={640}
        height={480}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  </main>
</Layout>
```

---

### Lazy Loading Nativo

El atributo `loading="lazy"` es **crucial** para Core Web Vitals por estas razones:

**Beneficios:**

1. **Reduce el Initial Load**: Solo carga imágenes visibles en viewport inicial
2. **Ahorra bandwidth**: Usuarios que no hacen scroll no descargan todas las imágenes
3. **Mejora LCP**: Al priorizar recursos críticos del viewport
4. **Sin JavaScript necesario**: Performance nativa del navegador

**Cuándo NO usar lazy loading:**

```astro
---
// ❌ NO lazy load para LCP (hero images, above the fold)
---
<ResponsiveImage
  src="hero/main-banner"
  alt="Banner principal"
  priority={true}  <!-- Esto establece loading="eager" -->
/>

---
// ✅ SÍ lazy load para imágenes below the fold
---
<ResponsiveImage
  src="products/item-45"
  alt="Producto"
  priority={false}  <!-- Default: loading="lazy" -->
/>
```

---

### Preload para Imagen LCP

El `<link rel="preload">` acelera dramáticamente la carga de tu imagen LCP (típicamente el hero image).

**Implementación en Astro:**

```astro
---
// layouts/Layout.astro
interface Props {
  title: string;
  heroImage?: {
    src: string;
    type: 'avif' | 'webp' | 'jpg';
    width: number;
  };
}

const { title, heroImage } = Astro.props;
---

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <title>{title}</title>

  {heroImage && (
    <link
      rel="preload"
      as="image"
      href={`/images/w${heroImage.width}/${heroImage.src}.${heroImage.type}`}
      type={`image/${heroImage.type}`}
      imagesrcset={`
        /images/w360/${heroImage.src}.${heroImage.type} 360w,
        /images/w720/${heroImage.src}.${heroImage.type} 720w,
        /images/w1280/${heroImage.src}.${heroImage.type} 1280w,
        /images/w1920/${heroImage.src}.${heroImage.type} 1920w
      `}
      imagesizes="100vw"
      fetchpriority="high"
    />
  )}
</head>
<body>
  <slot />
</body>
</html>
```

**Uso en página:**

```astro
---
// pages/index.astro
import Layout from '@/layouts/Layout.astro';
import ResponsiveImage from '@/components/ResponsiveImage.astro';
---

<Layout 
  title="Inicio" 
  heroImage={{
    src: 'hero/holiday-banner',
    type: 'avif',
    width: 1920
  }}
>
  <ResponsiveImage
    src="hero/holiday-banner"
    alt="Banner navideño"
    priority={true}
    width={1920}
    height={1080}
    sizes="100vw"
  />
</Layout>
```

**⚠️ Advertencias importantes:**

- **Solo para imágenes LCP**: Preload solo 1-2 imágenes críticas
- **Penaliza otros recursos**: Cada preload retrasa CSS/JS
- **Usa `fetchpriority="high"`**: En combinación con preload para máxima prioridad
- **Test con Lighthouse**: Verifica que mejora LCP real

---

## 4. Gestión de Videos

### Videos de Fondo o Decorativos

Los videos optimizados pueden mejorar conversión sin perjudicar performance si sigues estas prácticas:

```astro
---
/**
 * VideoBackground.astro
 * Optimized background video component for Core Web Vitals
 * 
 * @prop {string} src - Base path/name without extension
 * @prop {string} [poster] - Poster image path
 * @prop {string} [className] - CSS classes
 * @prop {boolean} [overlay] - Show dark overlay
 */

interface Props {
  src: string;
  poster?: string;
  class?: string;
  overlay?: boolean;
}

const {
  src,
  poster,
  class: className = '',
  overlay = true,
  ...attrs
} = Astro.props;
---

<div class:list={['video-background-container', className]} {...attrs}>
  {overlay && <div class="video-overlay"></div>}
  
  <video
    autoplay
    muted
    loop
    playsinline
    preload="metadata"
    poster={poster}
    class="video-background"
    aria-hidden="true"
  >
    <!-- WebM for Chrome/Firefox (mejor compresión) -->
    <source src={`${src}.webm`} type="video/webm" />
    
    <!-- MP4 for Safari/Edge (compatibilidad universal) -->
    <source src={`${src}.mp4`} type="video/mp4" />
    
    <!-- Fallback para navegadores sin soporte -->
    {poster && (
      <img src={poster} alt="Video fallback" class="video-fallback" />
    )}
  </video>
  
  <slot />
</div>

<style>
  .video-background-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .video-background {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
    object-fit: cover;
    z-index: 0;
  }

  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }

  .video-fallback {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }

  /* Reduce motion para usuarios con preferencias de accesibilidad */
  @media (prefers-reduced-motion: reduce) {
    .video-background {
      display: none;
    }
    
    .video-fallback {
      display: block;
    }
  }

  /* Ocultar video en conexiones lentas (opcional) */
  @media (prefers-reduced-data: reduce) {
    .video-background {
      display: none;
    }
    
    .video-fallback {
      display: block;
    }
  }
</style>

<script>
  // Pausar video si no está visible (Intersection Observer)
  document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video-background');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Silently handle autoplay restrictions
            });
          } else {
            video.pause();
          }
        });
      }, {
        threshold: 0.25
      });

      videos.forEach((video) => observer.observe(video));
    }
  });
</script>
```

### Mejores Prácticas para Videos

**1. Compresión y Formatos**

```bash
# Convertir a WebM (VP9) - Mejor compresión
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 \
  -c:a libopus -b:a 128k -vf scale=1920:-2 output.webm

# Convertir a MP4 (H.264) - Compatibilidad Safari
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 \
  -c:a aac -b:a 128k -vf scale=1920:-2 -movflags +faststart output.mp4

# Generar poster optimizado
ffmpeg -i input.mp4 -ss 00:00:02 -vframes 1 -q:v 2 poster.jpg
```

**2. Atributos Críticos**

- **`autoplay`**: Inicia automáticamente (solo funciona con `muted`)
- **`muted`**: Obligatorio para autoplay (políticas de navegadores)
- **`playsinline`**: Evita fullscreen automático en iOS
- **`loop`**: Reproduce en bucle infinito
- **`preload="metadata"`**: Solo carga metadata (no todo el video)
- **`poster`**: Imagen mientras carga (mejora CLS)

**3. Ejemplo de Uso Real**

```astro
---
// pages/index.astro
import VideoBackground from '@/components/VideoBackground.astro';
import Layout from '@/layouts/Layout.astro';
---

<Layout title="Inicio">
  <section class="hero">
    <VideoBackground
      src="/videos/hero-gifts"
      poster="/images/hero-poster.jpg"
      class="hero-video"
      overlay={true}
    >
      <div class="hero-content">
        <h1>Regalos Inolvidables</h1>
        <p>Encuentra el detalle perfecto para cada ocasión</p>
        <a href="/productos" class="cta-button">
          Explorar Catálogo
        </a>
      </div>
    </VideoBackground>
  </section>
</Layout>

<style>
  .hero {
    height: 100vh;
    position: relative;
  }

  .hero-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: white;
    padding: 2rem;
  }

  .hero-content h1 {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .hero-content p {
    font-size: clamp(1rem, 2vw, 1.5rem);
    margin-bottom: 2rem;
    max-width: 600px;
  }

  .cta-button {
    background: white;
    color: #333;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
</style>
```

**4. Optimizaciones Adicionales para Videos**

### Video con Lazy Loading Manual

Para videos que NO son de hero/fondo, puedes implementar carga diferida:

```astro
---
// components/LazyVideo.astro
interface Props {
  src: string;
  poster: string;
  class?: string;
}

const { src, poster, class: className = '' } = Astro.props;
---

<div class:list={['lazy-video-wrapper', className]} data-video-src={src}>
  <img src={poster} alt="Video thumbnail" class="video-thumbnail" />
  <button class="play-button" aria-label="Reproducir video">
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="38" fill="rgba(255,255,255,0.9)" />
      <polygon points="30,20 30,60 60,40" fill="#333" />
    </svg>
  </button>
</div>

<style>
  .lazy-video-wrapper {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: 8px;
  }

  .video-thumbnail {
    width: 100%;
    height: auto;
    display: block;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .play-button:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }

  video {
    width: 100%;
    height: auto;
    display: block;
  }
</style>

<script>
  document.querySelectorAll('.lazy-video-wrapper').forEach((wrapper) => {
    const button = wrapper.querySelector('.play-button');
    const thumbnail = wrapper.querySelector('.video-thumbnail');
    const videoSrc = wrapper.getAttribute('data-video-src');

    button?.addEventListener('click', () => {
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = true;
      
      // WebM source
      const sourceWebM = document.createElement('source');
      sourceWebM.src = `${videoSrc}.webm`;
      sourceWebM.type = 'video/webm';
      video.appendChild(sourceWebM);
      
      // MP4 source
      const sourceMP4 = document.createElement('source');
      sourceMP4.src = `${videoSrc}.mp4`;
      sourceMP4.type = 'video/mp4';
      video.appendChild(sourceMP4);

      // Replace thumbnail with video
      wrapper.innerHTML = '';
      wrapper.appendChild(video);
    });
  });
</script>
```

### Estructura de Carpetas para Videos en CDN

```
/cdn
  /videos
    /hero
      hero-gifts.webm       (1920x1080, ~2MB, VP9)
      hero-gifts.mp4        (1920x1080, ~3MB, H.264)
      hero-gifts-poster.jpg (1920x1080, optimizado)
    /products
      product-demo-001.webm
      product-demo-001.mp4
      product-demo-001-poster.jpg
    /backgrounds
      abstract-pattern.webm  (loop, 10s)
      abstract-pattern.mp4
```

---

## 5. Checklist Final de Optimización

### ✅ Imágenes

- [ ] Todas las imágenes tienen múltiples variantes (360w, 720w, 1280w, 1920w)
- [ ] Formatos modernos implementados (AVIF, WebP) con fallback JPEG
- [ ] Atributo `loading="lazy"` en todas las imágenes below-the-fold
- [ ] Atributo `width` y `height` para prevenir CLS
- [ ] Imagen LCP tiene `<link rel="preload">` en el `<head>`
- [ ] `fetchpriority="high"` en imagen LCP
- [ ] `alt` descriptivos en todas las imágenes
- [ ] `sizes` attribute optimizado para cada contexto

### ✅ Videos

- [ ] Formato WebM para Chrome/Firefox
- [ ] Formato MP4 para Safari/iOS
- [ ] Atributos `autoplay`, `muted`, `playsinline`, `loop`
- [ ] `preload="metadata"` para videos de fondo
- [ ] `poster` image optimizada
- [ ] Intersection Observer para pausar videos fuera del viewport
- [ ] Respeta `prefers-reduced-motion`
- [ ] Tamaño máximo del video < 5MB

### ✅ Performance

- [ ] Lighthouse score > 90 en Performance
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] FID < 100ms
- [ ] Script de optimización automático en `prebuild`
- [ ] CDN configurado con cache headers apropiados
- [ ] Brotli/Gzip compression habilitado

---

## 6. Arquitectura: Debate de Decisiones

Ya que te encanta debatir arquitectura, aquí hay algunos puntos clave donde tomé decisiones que podríamos discutir:

### 🤔 **Decision 1: ¿Build-time vs Runtime Image Optimization?**

**Mi elección**: Build-time con Sharp

**Razones:**
- ✅ Zero overhead en runtime
- ✅ Predecible y versionable
- ✅ Funciona con cualquier CDN (no necesitas transformación on-the-fly)
- ✅ Control total sobre calidad/compresión

**Alternativa**: Runtime con servicios como Cloudinary/imgix
- ✅ Más flexible para contenido dinámico
- ✅ No aumenta tiempo de build
- ❌ Costo adicional
- ❌ Dependencia de servicio externo

**¿Tu opinión?** Para un e-commerce con catálogo relativamente estable, ¿preferirías la predictibilidad del build-time o la flexibilidad del runtime?

---

### 🤔 **Decision 2: ¿Component Wrapper vs Picture Tag Directo?**

**Mi elección**: Componentes reutilizables (`<ResponsiveImage />`)

**Razones:**
- ✅ DRY principle
- ✅ Consistencia en toda la app
- ✅ Fácil actualizar estrategia globalmente
- ✅ Tipado y validación

**Alternativa**: `<picture>` tags directos
- ✅ Más control granular
- ✅ Menos abstracción
- ❌ Repetición de código
- ❌ Difícil mantener consistencia

**¿Tu opinión?** ¿El overhead de un componente justifica la abstracción, o prefieres el control directo del HTML?

---

### 🤔 **Decision 3: ¿Tres formatos (AVIF + WebP + JPEG) o solo dos?**

**Mi elección**: Tres formatos completos

**Razones:**
- ✅ AVIF: ~50% mejor compresión que JPEG
- ✅ WebP: Soporte casi universal (>95% navegadores)
- ✅ JPEG: Fallback absoluto

**Alternativa**: Solo WebP + JPEG
- ✅ Menos archivos que generar
- ✅ Menor complejidad
- ❌ Pierdes 30-40% de ahorro adicional de AVIF

**¿Tu opinión?** ¿Vale la pena el overhead de generar AVIF considerando que solo Chrome/Edge lo soportan actualmente?

---

### 🤔 **Decision 4: ¿Videos autoplay o click-to-play por defecto?**

**Mi elección**: Autoplay para hero backgrounds, click-to-play para contenido

**Razones:**
- ✅ Autoplay mejora engagement en hero sections
- ✅ Click-to-play respeta bandwidth del usuario
- ✅ Mejor accesibilidad con preferencias de usuario

**Alternativa**: Todo click-to-play
- ✅ Más respetuoso con datos
- ✅ Mejor para conexiones lentas
- ❌ Menos impacto visual inicial

**¿Tu opinión?** En un e-commerce, ¿el impacto visual del autoplay justifica el costo en bandwidth?

---

## 7. Recursos Adicionales

### Herramientas de Testing

1. **Lighthouse CI** - Automatiza auditorías en cada deploy
2. **WebPageTest** - Testing exhaustivo con dispositivos reales
3. **Chrome DevTools** - Performance panel + Coverage tab
4. **DebugBear** - Monitoreo continuo de Core Web Vitals

### Documentación Oficial

- [Web.dev - Optimize LCP](https://web.dev/optimize-lcp/)
- [MDN - Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Astro - Images Guide](https://docs.astro.build/en/guides/images/)

---

## Conclusión

Esta estrategia te proporciona una base sólida para un e-commerce de alto rendimiento. Los puntos clave son:

1. **Múltiples formatos y tamaños** = Máxima compatibilidad y eficiencia
2. **Componentes reutilizables** = Consistencia y mantenibilidad
3. **Lazy loading inteligente** = Carga diferida donde tiene sentido
4. **Preload estratégico** = Solo para recursos críticos LCP
5. **Videos optimizados** = Impacto visual sin sacrificar performance

¿Te gustaría que profundicemos en algún aspecto específico? ¿Debatir alguna de las decisiones arquitectónicas? ¿O necesitas ayuda implementando esto en tu proyecto específico?