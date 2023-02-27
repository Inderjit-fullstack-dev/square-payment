import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SquarePaymentService {
  private scriptLoaded = false;

  public async init(applicationId: string, locationId: string): Promise<void> {
    if (!this.scriptLoaded) {
      await this.loadScript('https://js.squareup.com/v2/paymentform');
      this.scriptLoaded = true;
    }
    return new Promise<void>((resolve, reject) => {
      window.SquarePaymentForm.init(applicationId, locationId, resolve, reject);
    });
  }

  public async tokenize(paymentForm: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      paymentForm.requestCardNonce(resolve, reject);
    });
  }

  private loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }
}

declare global {
  interface Window {
    SquarePaymentForm: any;
  }
}
