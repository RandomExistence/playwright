import { test, expect } from '@playwright/test';
import { ATMPage } from './pages/atm.page';

test('deposit flow', async ({ page }) => {
  const atm = new ATMPage(page);

  // ----------------- before test ----------------- //
  await atm.goto();
  await atm.login('123456', '1234');

  await expect(atm.mainBalanceDiv).toContainText('฿50,000.00');
  await atm.goToDepositPage();
  await expect(atm.secondaryBalanceDiv).toContainText('฿50,000.00');
  
  // ----------------- start input ----------------- //
  // deposit 500 thb
  await atm.deposit('฿500.00');
  await expect(atm.secondaryBalanceDiv).toContainText('฿50,500.00');
  await expect(atm.notificationToast).toContainText('ฝากเงิน ฿500.00 เรียบร้อยแล้ว');

  // deposit 1,000 thb
  await atm.deposit('฿1,000.00');
  await expect(atm.secondaryBalanceDiv).toContainText('฿51,500.00');
  await expect(atm.notificationToast).toContainText('ฝากเงิน ฿1,000.00 เรียบร้อยแล้ว');

  // deposit 1 thb 
  await atm.depositCustom('1');
  await expect(atm.secondaryBalanceDiv).toContainText('฿51,501.00');
  await expect(atm.notificationToast).toContainText('ฝากเงิน ฿1.00 เรียบร้อยแล้ว');
  
  // deposit 100,000 thb 
  await atm.depositCustom('100000');
  await expect(atm.secondaryBalanceDiv).toContainText('฿151,501.00');
  await expect(atm.notificationToast).toContainText('ฝากเงิน ฿100,000.00 เรียบร้อยแล้ว');

  // deposit 0 thb (invalid deposit less than 1 thb)
  await atm.depositCustom('0');
  await expect(atm.depositButton).toBeDisabled();
  await expect(atm.secondaryBalanceDiv).toContainText('฿151,501.00');

  // deposit 100,001 thb (invalid deposit more than 100,000 thb)
  await atm.depositCustom('100001');
  await expect(atm.secondaryBalanceDiv).toContainText('฿151,501.00');
})