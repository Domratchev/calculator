import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async clickButton(symbol: string): Promise<void> {
    return element(by.css(`calc-button[ng-reflect-value="${symbol}"]`)).firstElementChild.click();
  }

  async getButtonText(symbol: string): Promise<string> {
    return element(by.css(`calc-button[ng-reflect-value="${symbol}"]`)).getText();
  }

  async getDisplayText(): Promise<string> {
    return element(by.css('calc-app .content calc-display')).getText();
  }
}
