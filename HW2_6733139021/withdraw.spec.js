import { test, expect } from '@playwright/test';
import { ATMPage} from './pages/atm.page'

test('withdraw flow', async ({ page }) => {
  const atm = new ATMPage(page);
  const locators = [
    atm.b_2000_Button,
    atm.b_5000_Button,
    atm.customValueTextbox,
  ]

  // ----------------- before test ----------------- //
  await atm.goto();
  await atm.login('123456', '1234');

  await expect(atm.mainBalanceDiv).toContainText('฿50,000.00');
  await atm.goToDepositPage();
  await atm.depositCustom('50000');
  await atm.goToPreviousPage();

  await expect(atm.mainBalanceDiv).toContainText('฿100,000.00');
  await atm.goToWithdrawPage();
  await expect(atm.secondaryBalanceDiv).toContainText('฿100,000.00');

  // ----------------- start input ----------------- //
  // withdraw 2,000 thb
  await atm.withdraw('฿2,000.00');
  await expect(atm.secondaryBalanceDiv).toContainText('฿98,000.00');
  await expect(atm.notificationToast).toContainText('ถอนเงิน ฿2,000.00 เรียบร้อยแล้ว');

  // withdraw 5,000 thb
  await atm.withdraw('฿5,000.00');
  await expect(atm.secondaryBalanceDiv).toContainText('฿93,000.00');
  await expect(atm.notificationToast).toContainText('ถอนเงิน ฿5,000.00 เรียบร้อยแล้ว');

  // withdraw 100 thb
  await atm.withdrawCustom('100');
  await expect(atm.secondaryBalanceDiv).toContainText('฿92,900.00');
  await expect(atm.notificationToast).toContainText('ถอนเงิน ฿100.00 เรียบร้อยแล้ว');

  // withdraw 50,000 thb
  await atm.withdrawCustom('50000');
  await expect(atm.secondaryBalanceDiv).toContainText('฿42,900.00');
  await expect(atm.notificationToast).toContainText('ถอนเงิน ฿50,000.00 เรียบร้อยแล้ว')

  // withdraw 99 thb (invalid less than 100)
  await atm.withdrawCustom('99');
  await expect(atm.secondaryBalanceDiv).toContainText('฿42,900.00');

  // withdraw 101 thb (invalid not a multiple of 100)
  await atm.withdrawCustom('101');
  await expect(atm.secondaryBalanceDiv).toContainText('฿42,900.00');

  // withdraw 50,000 thb (invalid withdraw greater than current balance )
  await atm.withdrawCustom('50000');
  await expect(atm.withdrawButton).toBeDisabled();
  await expect(atm.secondaryBalanceDiv).toContainText('฿42,900.00');
  
})