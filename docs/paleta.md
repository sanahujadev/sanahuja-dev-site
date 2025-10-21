# Documentación de la Paleta de Colores

Este documento describe la paleta de colores del proyecto, la transición desde la paleta original y la definición de la paleta de marca final.

## 1. Paleta Original (Pre-Refactorización)

La paleta inicial del proyecto era una mezcla de múltiples familias de colores de Tailwind CSS, lo que generaba inconsistencia. Los colores principales no estaban claramente definidos y se usaban indistintamente:

- **Naranja:** Usado como color primario.
- **Índigo:** Usado como color de acento principal.
- **Teal:** Usado como color de acento secundario.
- **Azul, Púrpura, Cian, Sky:** Usados en varios lugares, especialmente en degradados, sin una jerarquía clara.

Esta mezcla llevó a una confusión de nombres y valores, donde `--color-primary` era naranja pero otros elementos de "acento" usaban índigo o púrpura.

## 2. Paleta de Marca Definida

Para solucionar la inconsistencia, se ha definido una nueva paleta de marca con una jerarquía clara de 4 colores.

- **Color Primario: Naranja**
  - **Uso:** Para los llamados a la acción más importantes, botones principales y elementos que requieren la máxima atención.
  - **Valor Base:** `#FF6F00` (Tailwind's `orange-600`)

- **Color Secundario: Índigo**
  - **Uso:** Para acentos importantes, fondos de sección, y como color principal en modo oscuro. Complementa al naranja.
  - **Valor Base:** `#4F46E5` (Tailwind's `indigo-600`)

- **Color Terciario: Teal (Verde Azulado)**
  - **Uso:** Para elementos de información, acentos menos prominentes y gráficos.
  - **Valor Base:** `#0D9488` (Tailwind's `teal-600`)

- **Color Cuaternario: Azul**
  - **Uso:** Para enlaces, estados "info" y otros acentos de UI.
  - **Valor Base:** `#2563EB` (Tailwind's `blue-600`)

- **Escala de Grises:**
  - Se mantiene la escala de grises estándar de Tailwind (`gray`) para fondos, bordes y textos.

## 3. Definición de Degradados

Los degradados de fondo decorativos se han redefinido para usar exclusivamente la nueva paleta de marca.

### Degradado 1 (Cálido)

Usado en `HeroSection` y `CallToAction`.

- **Modo Claro:** Un degradado "atardecer" que va de Naranja a Ámbar.
  - `from`: `var(--color-primary)` (`orange-600`)
  - `to`: `#FBBF24` (`amber-400`)
- **Modo Oscuro:** Un degradado "anochecer" que empieza en un Índigo oscuro.
  - `from`: `#3730A3` (`indigo-800`)

### Degradado 2 (Frío)

Usado en `HeroSection` y `CallToAction`.

- **Modo Claro:** Un degradado vibrante que va de Teal a Azul.
  - `from`: `#2DD4BF` (`teal-400`)
  - `to`: `#60A5FA` (`blue-400`)
- **Modo Oscuro:** El degradado termina en un Índigo principal.
  - `to`: `#6366F1` (`indigo-500`)
