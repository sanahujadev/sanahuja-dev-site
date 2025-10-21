// src/scripts/contact-form.ts

export class ContactForm {
  private form: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private formStatus: HTMLDivElement;
  private emailInput: HTMLInputElement;
  private emailErrorIcon: HTMLDivElement;

  // private turnstileSiteKey: string;
  // private turnstileToken: string | null = null;
  // private turnstileWidgetId: string | null = null;

  private apiUrl: string;
  private apiKey: string;

  private originalButtonText: string;

  constructor(formElement: HTMLFormElement) {
    this.form = formElement;

    // 1. Obtener la clave del sitio desde el atributo data-*
    // this.turnstileSiteKey = this.form.dataset.turnstileSiteKey || "";
    this.apiUrl = this.form.dataset.apiUrl || "";
    this.apiKey = this.form.dataset.apiKey || "";

    // if (!this.turnstileSiteKey) {
    //   console.error("Turnstile site key is not defined on the form element.");
    // }
    if (!this.apiUrl || !this.apiKey) {
      console.error("API URL or API Key is not defined on the form element.");
    }

    // 2. Seleccionar todos los elementos necesarios una sola vez
    this.submitButton = this.form.querySelector("#submit-button")!;
    this.formStatus = this.form.querySelector("#form-status")!;
    this.emailInput = this.form.querySelector("#email")!;
    this.emailErrorIcon = this.form.querySelector("#email-error-icon")!;
    this.originalButtonText =
      this.submitButton.querySelector("span")?.textContent || "Submit";

    // 3. Inicializar todo
    this.addEventListeners();
    // this.initTurnstile();
    this.updateButtonState();
  }

  /*
  private initTurnstile() {
    if (typeof window.turnstile === "undefined") {
      // Si Turnstile no se ha cargado, reintenta en un momento.
      setTimeout(() => {
        console.log("REINICIALIZANDO TURNSTILE");
        return this.initTurnstile();
      }, 500);
      return;
    }

    this.turnstileWidgetId = window.turnstile.render("#turnstile-widget", {
      sitekey: this.turnstileSiteKey,
      callback: (token: string) => {
        this.turnstileToken = token;
        this.updateButtonState();
      },
      "error-callback": () => {
        this.turnstileToken = null;
        this.updateButtonState();
        this.showStatus(
          "Security verification failed. Please refresh.",
          "error",
        );
      },
      "expired-callback": () => {
        this.turnstileToken = null;
        this.updateButtonState();
        if (this.turnstileWidgetId) {
          window.turnstile.reset(this.turnstileWidgetId);
        }
      },
    });
  }
  */

  private addEventListeners() {
    // Usamos .bind(this) para mantener el contexto de la clase en los manejadores de eventos
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.form.addEventListener("input", this.updateButtonState.bind(this));
    this.emailInput.addEventListener(
      "blur",
      this.validateEmailOnBlur.bind(this),
    );
  }

  private validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private checkFormValidity(): boolean {
    const nameInput = this.form.querySelector<HTMLInputElement>("#name")!;
    const messageInput =
      this.form.querySelector<HTMLTextAreaElement>("#message")!;

    const isNameValid = nameInput.value.trim() !== "";
    const isEmailValid = this.validateEmailFormat(this.emailInput.value);
    const isMessageValid = messageInput.value.trim() !== "";

    return (
      isNameValid &&
      isEmailValid &&
      isMessageValid
    );
  }

  private updateButtonState() {
    if (this.submitButton) {
      this.submitButton.disabled = !this.checkFormValidity();
    }
  }

  private validateEmailOnBlur() {
    const isValid = this.validateEmailFormat(this.emailInput.value);
    if (!isValid && this.emailInput.value.trim() !== "") {
      this.emailInput.classList.add("border-red-500", "dark:border-red-500");
      this.emailErrorIcon?.classList.remove("hidden");
    } else {
      this.emailInput.classList.remove("border-red-500", "dark:border-red-500");
      this.emailErrorIcon?.classList.add("hidden");
    }
  }

  private showStatus(message: string, type: "success" | "error") {
    this.formStatus.textContent = message;
    this.formStatus.className = `p-4 text-center rounded-lg ${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`;
    setTimeout(() => {
      this.formStatus.className = "hidden";
    }, 7000);
  }

  private async handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!this.checkFormValidity()) return;

    this.submitButton.disabled = true;
    this.submitButton.querySelector("span")!.textContent = `Enviando...`;

    const formData = new FormData(this.form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      nickname: formData.get("nickname"), // Honeypot
      // "cf-turnstile-response": this.turnstileToken,
    };

    try {
      const response = await fetch(this.apiUrl+"/forms", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
        },
      });

      if (response.ok) {
        this.showStatus("¡Mensaje enviado con éxito!", "success");
        this.form.reset();
        // if (this.turnstileWidgetId) {
        //   window.turnstile.reset(this.turnstileWidgetId);
        // }
      } else {
        this.showStatus(
          "Error al enviar el mensaje. Inténtalo de nuevo.",
          "error",
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      this.showStatus(
        "Error de red. Por favor, comprueba tu conexión.",
        "error",
      );
    } finally {
      this.submitButton.disabled = false;
      this.submitButton.querySelector("span")!.textContent =
        this.originalButtonText;
    }
  }
}

/*
// Declaración para que TypeScript conozca el objeto global `turnstile`
declare global {
  interface Window {
    turnstile: {
      render: (container: string, params: any) => string;
      reset: (widgetId: string) => void;
    };
  }
}
*/
