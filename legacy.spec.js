// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ');

//   const accountNumberTextbox = page.getByRole('textbox', { name: 'ตัวอย่าง:'});
//   const pinTextbox = page.getByRole('textbox', { name: 'รหัส PIN 4 หลัก' });
//   const loginButton = page.getByRole('button', { name: 'เข้าสู่ระบบ' });
//   const logoffButton = page.getByRole('button', { name: 'ออกจากระบบ' });
//   const returnButton = page.getByRole('button', { name: 'กลับ' });
//   const mainBalanceDiv = page.locator('.text-4xl.font-bold');
//   const root = page.locator('#root')
  
//   const goToDepositPageButton = page.getByText('ฝากเงินDeposit');
//   const goToWithdrawPageButton = page.getByText('ถอนเงินWithdrawal');
//   const goToTransferPageButton = page.getByText('โอนเงินTransfer');
//   const goToHistoryPageButton = page.getByText('ประวัติHistory');
//   const secondaryBalanceDiv = page.locator('.text-3xl.font-bold');
//   const notificationToast = page.getByRole('region', { name: 'Notifications (F8)' }).getByRole('status')
//   const errorToast = page.getByRole('region', { name : 'Notifications (F8)' }).locator('[role="status"].destructive');
  
//   const depositButton = page.getByRole('button', { name: 'ฝากเงิน ฿' });
//   const withdrawButton = page.getByRole('button', { name: 'ถอนเงิน ฿' });
//   const transferButton = page.getByRole('button', { name: 'โอนเงิน ฿' });

//   const accountNumberTransferTextbox = page.getByRole('textbox', { name: 'กรอกหมายเลขบัญชี 6 หลัก' });
//   const noteTransferTextbox = page.getByRole('textbox', { name: 'เช่น เงินค่าอาหาร, ค่าเช่าบ้าน' });
//   const customValueTextbox = page.getByPlaceholder('0');
//   const totalDespositDiv = page.locator('.rounded-lg.border.bg-gradient-card.border-secondary\\/20');
//   const totalWithdrawDiv = page.locator('.rounded-lg.border.bg-gradient-card.border-destructive\\/20');
//   const totalTransferDiv = page.locator('.rounded-lg.border.bg-gradient-card.border-primary\\/20');
//   const historyTransactionDiv = page.locator('.flex.items-center.justify-between.p-4.bg-muted\\/30.rounded-lg.hover:bg-muted\\/50.transition-colors'); 

//   const b_500_Button = page.getByRole('button', { name: '฿500.00' });
//   const b_1000_Button = page.getByRole('button', { name: '฿1,000.00' });
//   const b_2000_Button = page.getByRole('button', { name: '฿2,000.00' });
//   const b_5000_Button = page.getByRole('button', { name: '฿5,000.00' });
//   const b_10000_Button = page.getByRole('button', { name: '฿10,000.00' });
//   const b_20000_Button = page.getByRole('button', { name: '฿20,000.00' });
//   const b_50000_Button = page.getByRole('button', { name: '฿50,000.00' });

//   // login
//   await accountNumberTextbox.click();
//   await accountNumberTextbox.fill('123456');
//   await pinTextbox.click();
//   await pinTextbox.fill('1234');
//   await loginButton.click();

//   await expect(mainBalanceDiv).toContainText('฿50,000.00');

//   // deposit
//   await goToDepositPageButton.click();
//     await expect(secondaryBalanceDiv).toContainText('฿50,000.00');

//     await expect(b_500_Button).toBeEnabled();
//     await b_500_Button.click();
//     await depositButton.click();
//     await expect(secondaryBalanceDiv).toContainText('฿50,500.00');
//     await expect(notificationToast).toContainText('ฝากเงิน ฿500.00 เรียบร้อยแล้ว');

//     await expect(b_1000_Button).toBeEnabled();
//     await b_1000_Button.click();
//     await depositButton.click();
//     await expect(secondaryBalanceDiv).toContainText('฿51,500.00');
//     await expect(notificationToast).toContainText('ฝากเงิน ฿1,000.00 เรียบร้อยแล้ว');
//   await returnButton.click();

//   // withdraw
//   await goToWithdrawPageButton.click();
//     await expect(secondaryBalanceDiv).toContainText('฿51,500.00');

//     await expect(b_2000_Button).toBeEnabled();
//     await b_2000_Button.click();
//     await withdrawButton.click();
//     await expect(secondaryBalanceDiv).toContainText('฿49,500.00');
//     await expect(notificationToast).toContainText('ถอนเงิน ฿2,000.00 เรียบร้อยแล้ว');

//     await expect(b_5000_Button).toBeEnabled();
//     await b_5000_Button.click();
//     await withdrawButton.click();
//     await expect(secondaryBalanceDiv).toContainText('฿44,500.00');
//     await expect(notificationToast).toContainText('ถอนเงิน ฿5,000.00 เรียบร้อยแล้ว');
//   await returnButton.click();

//   // transfer
//   await goToTransferPageButton.click();
//     await expect(secondaryBalanceDiv).toContainText('฿44,500.00');

//     await expect(accountNumberTransferTextbox).toBeEnabled()
//     await accountNumberTransferTextbox.click();
//     await accountNumberTransferTextbox.fill('789012');
//     await expect(b_10000_Button).toBeEnabled();
//     await b_10000_Button.click();
//     await transferButton.click();
//     await expect(secondaryBalanceDiv).toContainText('฿34,500.00')
//     await expect(notificationToast).toContainText('โอนเงิน ฿10,000.00 ไปยัง สมศรี วงค์ใหญ่ เรียบร้อยแล้ว');

//     await accountNumberTransferTextbox.click();
//     await accountNumberTransferTextbox.fill('789012');
//     await b_20000_Button.click();
//     await noteTransferTextbox.click();
//     await noteTransferTextbox.fill('For Testing Purposes');
//     await transferButton.click();
//     await expect(secondaryBalanceDiv).toContainText('฿14,500.00')
//     await expect(notificationToast).toContainText('โอนเงิน ฿20,000.00 ไปยัง สมศรี วงค์ใหญ่ เรียบร้อยแล้ว');
//   await returnButton.click();

//   // history
//   await goToHistoryPageButton.click();
//     await expect(totalDespositDiv).toContainText('฿11,500.00');
//     await expect(totalWithdrawDiv).toContainText('฿12,000.00');
//     await expect(totalTransferDiv).toContainText('฿32,000.00');
//     await expect(root).toContainText('โอนเงินไปยัง 789012 (For Testing Purposes)');
//   await returnButton.click();

//   await logoffButton.click();

//   // invalid login
//   await accountNumberTextbox.click();
//   await accountNumberTextbox.fill('123456');
//   await pinTextbox.click();
//   await pinTextbox.fill('fake');
//   await loginButton.click();
//   await expect(errorToast).toContainText('กรุณาตรวจสอบหมายเลขบัญชีและรหัส PIN');

//   await expect(accountNumberTextbox).toBeEnabled();
//   await accountNumberTextbox.click();
//   await accountNumberTextbox.fill('654321');
//   await pinTextbox.click();
//   await pinTextbox.fill('1234');
//   await loginButton.click();
//   await expect(errorToast).toContainText('กรุณาตรวจสอบหมายเลขบัญชีและรหัส PIN');

//   // disable login button on blank inputs
//   await accountNumberTextbox.clear();
//   await expect(loginButton).toBeDisabled();

//   await accountNumberTextbox.fill('123456');
//   await pinTextbox.clear();
//   await expect(loginButton).toBeDisabled();
// });