import { test, expect } from '@playwright/test'
import { ATMPage } from './pages/atm.page'

test('transfer flow', async ({ page }) => {
  const atm = new ATMPage(page)
  const receiver = '789012';

  // ----------------- before test ----------------- //
  await atm.goto();
  await atm.login('123456', '1234');

  await expect(atm.mainBalanceDiv).toContainText('฿50,000.00');
  await atm.goToDepositPage();
  await atm.depositCustom('100000');
  await expect(atm.secondaryBalanceDiv).toContainText('฿150,000.00');
  await atm.waitForInputsToBeEnabled([atm.customValueTextbox]);
  await atm.depositCustom('100000');
  await expect(atm.secondaryBalanceDiv).toContainText('฿250,000.00');
  await atm.waitForInputsToBeEnabled([atm.customValueTextbox])
  await atm.depositCustom('100000');
  await expect(atm.secondaryBalanceDiv).toContainText('฿350,000.00');
  await atm.waitForInputsToBeEnabled([atm.customValueTextbox])
  await atm.goToPreviousPage();

  await atm.goToTransferPage();
  await expect(atm.secondaryBalanceDiv).toContainText('฿350,000.00');

  // ----------------- start input ----------------- //
  // transfer 10,000 thb to 789012
  await atm.transfer('฿10,000.00', receiver, 'note 1');
  await expect(atm.secondaryBalanceDiv).toContainText('฿340,000.00');
  await expect(atm.notificationToast).toContainText('โอนเงิน ฿10,000.00 ไปยัง สมศรี วงค์ใหญ่ เรียบร้อยแล้ว');

  // transfer 20,000 thb to 789012
  await atm.transfer('฿20,000.00', receiver, '\\//\\');
  await expect(atm.secondaryBalanceDiv).toContainText('฿320,000.00')
  await expect(atm.notificationToast).toContainText('โอนเงิน ฿20,000.00 ไปยัง สมศรี วงค์ใหญ่ เรียบร้อยแล้ว');

  // transfer 1 thb to 789012
  await atm.transferCustom('1', receiver, 'document.alert("Hello World");');
  await expect(atm.secondaryBalanceDiv).toContainText('฿319,999.00')
  await expect(atm.notificationToast).toContainText('โอนเงิน ฿1.00 ไปยัง สมศรี วงค์ใหญ่ เรียบร้อยแล้ว');

  // transfer 200,001 thb to 789012 (invalid transfer more than 200,000 thb)
  await atm.transferCustom('200001', receiver, '');
  await expect(atm.secondaryBalanceDiv).toContainText('฿319,999.00');

  // transfer 200,000 thb to 789012
  await atm.transferCustom('200000', receiver, '');
  await expect(atm.secondaryBalanceDiv).toContainText('฿119,999.00');
  await expect(atm.notificationToast).toContainText('โอนเงิน ฿200,000.00 ไปยัง สมศรี วงค์ใหญ่ เรียบร้อยแล้ว');

  // transfer 120,000 thb to 789012 (invalid transfer greater than current balance)
  await atm.transferCustom('120000', receiver, '');
  await expect(atm.secondaryBalanceDiv).toContainText('฿119,999.00');
  await expect(atm.transferButton).toBeDisabled();

  // transfer 0 thb to 789021 (invalid transfer less than 1 thb)
  await atm.transferCustom('0', receiver, '');
  await expect(atm.secondaryBalanceDiv).toContainText('฿119,999.00');
  await expect(atm.transferButton).toBeDisabled();

  // transfer 10,000 thb to 491063 (invalid the receiver does not exist)
  await atm.transfer('฿10,000.00', '491063', '');
  await expect(atm.secondaryBalanceDiv).toContainText('฿119,999.00');
  await expect(atm.errorToast).toContainText('หมายเลขบัญชีที่กรอกไม่ถูกต้องหรือไม่มีอยู่ในระบบ');

  // transfer 20,000 thb to 123456 (invalid cannot transfer to themselves)
  await atm.transfer('฿20,000.00', '123456', '');
  await expect(atm.secondaryBalanceDiv).toContainText('฿119,999.00');
  await expect(atm.errorToast).toContainText('ไม่สามารถโอนเงินให้ตนเองได้');
})