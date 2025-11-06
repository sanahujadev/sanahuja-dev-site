// src/scripts/ConsentManager.ts
import * as CookieConsentAPI from "vanilla-cookieconsent";
import type { CookieConsentType } from "../i18n/utils";
// import type {CookieConsen} from "vanilla-cookieconsent";

export type CookieConsent = typeof CookieConsentAPI;

declare global {
  interface Window {
    gtag: (type: string, action: string, payload: object) => void;
    CookieConsent: typeof CookieConsentAPI; // ✅ CookieConsent, no initCookieConsent
  }
}

export interface ConsentConfig {
  lang: string;
  translations: CookieConsentType;
}

export class ConsentManager {
  private config: ConsentConfig;
  private lastConsentState: string = ''; // ← Guardar último estado

  constructor(configData: ConsentConfig) {
    if (!configData?.lang || !configData?.translations) {
      throw new Error("[ConsentManager] Invalid configuration");
    }
    this.config = configData;
  }

  /**
   * 🎯 MÉTODO NUEVO: Lee la cookie existente y actualiza GTM inmediatamente
   */
  public syncExistingConsent(): void {
    try {
      // Leer la cookie de consentimiento (vanilla-cookieconsent usa 'cc_cookie')
      const cookieValue = this.getCookie('cc_cookie');
      
      if (!cookieValue) return;
      
      const consentData = JSON.parse(cookieValue);
      
      if (consentData?.categories && Array.isArray(consentData.categories)) {
        console.log('[ConsentManager] Cookie existente detectada:', consentData.categories);

        // 🔥 NUEVO: Si gtag no existe, esperar al evento gtm:loaded
        if (typeof window.gtag !== 'function') {
          console.debug('[ConsentManager] gtag no disponible, esperando gtm:loaded...');
          
          window.addEventListener('gtm:loaded', () => {
            this.updateGTMConsent(consentData.categories);
          }, { once: true });  // ← Solo una vez
          
          return;
        }

        this.updateGTMConsent(consentData.categories);
      }
    
    } catch (error) {
      console.error('[ConsentManager] Error leyendo cookie existente:', error);
    }
  }

  public init(): void {
    // ✅ Verificar window.CookieConsent (no initCookieConsent)
    if (typeof window.CookieConsent === "undefined") {
      throw new Error("[ConsentManager] window.CookieConsent not found");
    }

    // ✅ PRIMERO: Sincronizar consentimiento existente con GTM
    this.syncExistingConsent();

    // Guardia contra duplicados
    if (document.querySelector("#cc-main")) {
      return;
    }

    // ✅ API v3: CookieConsent.run()
    window.CookieConsent.run({
      autoClearCookies: true,
      manageScriptTags: true,

      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom right",
        },
        preferencesModal: {
          layout: "box",
        },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: false,
          readOnly: false,
          autoClear: {
            cookies: [
              {
                name: /^(_ga|_gid|_gat)/,
              },
            ],
          },
        },
      },

      // onFirstConsent: ({ cookie }: any) => {
      //   this.updateGTMConsent(cookie.categories);
      // },
// 
      // onConsent: ({ cookie }: any) => {
      //   this.updateGTMConsent(cookie.categories);
      // },

      onChange: ({ cookie }: any) => {
        this.updateGTMConsent(cookie.categories);
      },

      language: {
        default: this.config.lang,
        translations: {
          [this.config.lang]: this.config.translations,
        },
      },
    });
  }

  private updateGTMConsent(categories: string[]): void {
    if (typeof window.gtag !== "function") {
      console.warn('[ConsentManager] gtag no disponible');
      return;
    }

    // 🔥 DEDUPLICACIÓN: Solo actualizar si cambió
    const currentState = JSON.stringify(categories.sort());
    if (currentState === this.lastConsentState) {
      console.debug('[ConsentManager] Consent sin cambios, omitiendo update');
      return;
    }
    this.lastConsentState = currentState;

    const consentUpdate = {
      analytics_storage: categories.includes("analytics")
        ? "granted"
        : "denied",
      ad_storage: "denied",
      functionality_storage: categories.includes("analytics")
        ? "granted"
        : "denied",
      personalization_storage: "denied",
      security_storage: "granted",
    };
    try {
      window.gtag("consent", "update", consentUpdate);
      console.log("[ConsentManager] GTM updated:", consentUpdate);
    } catch (error) {
      console.error("[ConsentManager] Error updating GTM:", error);
    }
  }

   /**
   * 🎯 MÉTODO AUXILIAR: Lee una cookie por nombre
   */
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    }
    
    return null;
  }

  public showSettings(): void {
    window.CookieConsent?.showPreferences();
  }
}
