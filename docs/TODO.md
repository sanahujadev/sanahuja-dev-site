hacer animacion de de imagenes de servicios a sus políticas

actualizar mi linkedIn

/[lang]/terms

/[lang]/conditions

cabeceras anticross-site

 Plan: Componente de Héroe Genérico para Páginas de Servicio

  Objetivo: Crear un componente Astro reutilizable para la sección de héroe de las páginas de servicios, con un nombre genérico y props flexibles para diferentes
  contenidos. Reemplazará el código duplicado en src/pages/[lang]/services/add-ons.astro y estará disponible para otras páginas de servicio.

  Pasos:

   1. Crear `src/components/ServiceHero.astro`:
       * Encapsulará la estructura del héroe (título, descripción, imagen).
       * Aceptará props como title, description, imageName, imageAlt, reversed (opcional), basePath (opcional, por defecto "sanahujadev"), fallbackFormat (opcional, por
         defecto "jpeg"), imageSizes (opcional), imageWidth (opcional) e imageClass (opcional).
       * Importará Container.astro y ResponsiveImage.astro.
       * La estructura se basará en la sección de héroe de src/pages/[lang]/services/add-ons.astro.

   2. Refactorizar `src/pages/[lang]/services/add-ons.astro`:
       * Eliminar el código existente de la sección de héroe.
       * Importar ServiceHero.astro.
       * Reemplazar el código eliminado con una instancia de <ServiceHero>, pasando las props adecuadas de addOns.

   3. Identificar otras páginas de servicio para refactorizar (opcional para mañana):
       * Buscar otros archivos en src/pages/[lang]/services/ que puedan usar este nuevo componente.

    4. una vez hecho esto, usaremos la API de Astro para crear navegaciones animadas añadiendoles id a la imagen desde el services/index.astro al servicio en concreto... Para eso habrá que añadir ids a servicesIndex.json y distintas paginas