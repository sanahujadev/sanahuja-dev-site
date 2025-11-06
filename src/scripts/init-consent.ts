// src/scripts/init-consent.ts
import { ConsentManager } from "./ConsentManager";
import type { CookieConsentType } from "../i18n/utils";

interface ConsentConfig {
  lang: string;
  translations: CookieConsentType;
}

const MAX_RETRIES = 10;
let retries = 0;

export function initializeCookieConsent(config: ConsentConfig) {
  // Guardia 1: Evitar múltiples instancias (MANTENER)
  if (
    (window as any).__consentManagerInstance
  ) {
    // Si ya existe la instancia, solo sincronizar el consentimiento
    const existingInstance = (window as any).__consentManagerInstance as ConsentManager;
    existingInstance.syncExistingConsent();
    return;
  }

   // Guardia 2: ¿Están AMBAS dependencias listas?
  const hasCookieConsent = typeof window.CookieConsent !== "undefined";
  const hasGtag = typeof window.gtag === "function";
  // Guardia 2: ¿Está window.CookieConsent disponible?
  if (!hasCookieConsent || !hasGtag) {
    retries++;
    if (retries < MAX_RETRIES) {
      setTimeout(() => initializeCookieConsent(config), 100);
    } else {
      console.error(
        "[Gambito] window.CookieConsent no se cargó después de",
        MAX_RETRIES,
        "intentos",
        { hasCookieConsent, hasGtag }
      );
    }
    return;
  }

  // ¡La librería está lista!
  try {
    const manager = new ConsentManager(config);
    manager.init();
    (window as any).__consentManagerInstance = manager;
    console.log('[ConsentManager] ✅ Initialized successfully');
    retries = 0;
  } catch (error) {
    console.error("[ConsentManager] Init failed:", error);
  }
}

// Auto-init si hay config en window
function autoInit() {
  const config = (window as any).__CONSENT_CONFIG__;
  if (config) {
    initializeCookieConsent(config);
  }
}

// 🎯 ESTRATEGIA MEJORADA: Escuchar evento custom de GTM
window.addEventListener('gtm:loaded', autoInit);

// Fallback para primera carga
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoInit);
} else {
  autoInit();
}

document.addEventListener("astro:page-load", autoInit);
