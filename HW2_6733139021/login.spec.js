import { test, expect } from '@playwright/test';
import { ATMPage } from './pages/atm.page';

test('login flow', async ({ page }) => {
  const atm = new ATMPage(page);
  const locators = [
    atm.accountNumberTextbox,
    atm.pinTextbox
  ]

  await atm.goto();

  await atm.waitForInputsToBeEnabled(locators);
  await atm.login('123456', '1234');
  await expect(atm.mainBalanceDiv).toContainText('฿50,000.00');
  await atm.logoff();

  await atm.waitForInputsToBeEnabled(locators);
  await atm.login('789012', '5678');
  await expect(atm.mainBalanceDiv).toContainText('฿75,000.00');
  await atm.logoff();

  await atm.waitForInputsToBeEnabled(locators);
  await atm.login('123456','fake');
  await expect(atm.errorToast).toContainText('กรุณาตรวจสอบหมายเลขบัญชีและรหัส PIN');

  await atm.waitForInputsToBeEnabled(locators);
  await atm.login('fakeNo','1234');
  await expect(atm.errorToast).toContainText('กรุณาตรวจสอบหมายเลขบัญชีและรหัส PIN');

  await atm.waitForInputsToBeEnabled(locators);
  await atm.accountNumberTextbox.clear();
  await expect(atm.loginButton).toBeDisabled();
});