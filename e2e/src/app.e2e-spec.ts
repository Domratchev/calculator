import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
  });

  it('should initialize with empty display', async () => {
    expect(await page.getDisplayText()).toEqual('');
  });

  // it('should display clicked numeric digit', async () => {
  //   await page.clickButton('8');
  //   expect(await page.getDisplayText()).toEqual('8');
  // });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
