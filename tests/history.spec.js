import { test, expect } from '@playwright/test'
import { ATMPage } from './pages/atm.page'

test('history flow', async ({ page }) => {
  const atm = new ATMPage(page)

  // setup
  await atm.goto();
  await atm.login('123456','1234');
  await expect(atm.mainBalanceDiv).toContainText('฿50,000.00');

  await atm.goToDepositPage();
  await atm.depositCustom('100000');
  await expect(atm.secondaryBalanceDiv).toContainText('฿150,000.00');
  await atm.goToPreviousPage();

  await atm.goToWithdrawPage();
  await atm.withdrawCustom('300');
  await expect(atm.secondaryBalanceDiv).toContainText('฿149,700.00');
  await atm.goToPreviousPage();

  await atm.goToTransferPage();
  await atm.transferCustom('123456', '789012', '');
  await expect(atm.secondaryBalanceDiv).toContainText('฿26,244.00');
  await atm.goToPreviousPage();

  await atm.goToHistoryPage();

  // start evaluation
  await expect(atm.totalDespositDiv).toContainText('฿110,000.00');
  await expect(atm.totalWithdrawDiv).toContainText('฿5,300.00');
  await expect(atm.totalTransferDiv).toContainText('฿125,456.00');

  await atm.filterHistoryBy('ทั้งหมด');
  await expect(atm.root).toContainText('แสดงรายการ 6 รายการ');
  await expect(atm.historyPanel).toHaveCount(6);
  await expect(atm.historyDepositPanel).toHaveCount(2);
  await expect(atm.historyWithdrawPanel).toHaveCount(2);
  await expect(atm.historyTransferPanel).toHaveCount(2);

  await atm.filterHistoryBy('ฝากเงิน');
  await expect(atm.root).toContainText('แสดงรายการ 2 รายการ');
  await expect(atm.historyPanel).toHaveCount(2);
  await expect(atm.historyDepositPanel).toHaveCount(2);
  await expect(atm.historyWithdrawPanel).not.toBeAttached();
  await expect(atm.historyTransferPanel).not.toBeAttached();

  await atm.filterHistoryBy('ถอนเงิน');
  await expect(atm.root).toContainText('แสดงรายการ 2 รายการ');
  await expect(atm.historyPanel).toHaveCount(2);
  await expect(atm.historyDepositPanel).not.toBeAttached();
  await expect(atm.historyWithdrawPanel).toHaveCount(2);
  await expect(atm.historyTransferPanel).not.toBeAttached();

  await atm.filterHistoryBy('โอนเงิน');
  await expect(atm.root).toContainText('แสดงรายการ 2 รายการ');
  await expect(atm.historyPanel).toHaveCount(2);
  await expect(atm.historyDepositPanel).not.toBeAttached();
  await expect(atm.historyWithdrawPanel).not.toBeAttached();
  await expect(atm.historyTransferPanel).toHaveCount(2);
})