import { Page, Locator, expect } from '@playwright/test'

export class ATMPage {

  readonly page: Page;
  readonly accountNumberTextbox: Locator;
  readonly pinTextbox: Locator;
  readonly loginButton: Locator;
  readonly logoffButton: Locator;
  readonly returnButton: Locator;
  readonly mainBalanceDiv: Locator;
  readonly root: Locator;
  
  readonly goToDepositPageButton: Locator;
  readonly goToWithdrawPageButton: Locator;
  readonly goToTransferPageButton: Locator;
  readonly goToHistoryPageButton: Locator;
  readonly secondaryBalanceDiv: Locator;
  readonly notificationToast: Locator;
  readonly errorToast: Locator;
  
  readonly depositButton: Locator;
  readonly withdrawButton: Locator;
  readonly transferButton: Locator;

  readonly accountNumberTransferTextbox: Locator;
  readonly noteTransferTextbox: Locator;
  readonly customValueTextbox: Locator;
  readonly totalDespositDiv: Locator;
  readonly totalWithdrawDiv: Locator;
  readonly totalTransferDiv: Locator;
  readonly historyTransactionDiv: Locator;
  readonly historyFilterAll: Locator;
  readonly historyFilterDeposit: Locator;
  readonly historyFilterWithdraw: Locator;
  readonly historyFilterTransfer: Locator;
  readonly historyPanel: Locator;
  readonly historyDepositPanel: Locator;
  readonly historyWithdrawPanel: Locator;
  readonly historyTransferPanel: Locator;

  readonly b_500_Button: Locator;
  readonly b_1000_Button: Locator;
  readonly b_2000_Button: Locator;
  readonly b_5000_Button: Locator;
  readonly b_10000_Button: Locator;
  readonly b_20000_Button: Locator;
  readonly b_50000_Button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountNumberTextbox = page.getByRole('textbox', { name: 'ตัวอย่าง:'});
    this.pinTextbox = page.getByRole('textbox', { name: 'รหัส PIN 4 หลัก' });
    this.loginButton = page.getByRole('button', { name: 'เข้าสู่ระบบ' });
    this.logoffButton = page.getByRole('button', { name: 'ออกจากระบบ' });
    this.returnButton = page.getByRole('button', { name: 'กลับ' });
    this.mainBalanceDiv = page.locator('.text-4xl.font-bold');
    this.root = page.locator('#root')
    
    this.goToDepositPageButton = page.getByText('ฝากเงินDeposit');
    this.goToWithdrawPageButton = page.getByText('ถอนเงินWithdrawal');
    this.goToTransferPageButton = page.getByText('โอนเงินTransfer');
    this.goToHistoryPageButton = page.getByText('ประวัติHistory');
    this.secondaryBalanceDiv = page.locator('.text-3xl.font-bold');
    this.notificationToast = page.getByRole('region', { name: 'Notifications (F8)' }).getByRole('status')
    this.errorToast = page.getByRole('region', { name : 'Notifications (F8)' }).locator('[role="status"].destructive');
    
    this.depositButton = page.getByRole('button', { name: 'ฝากเงิน ฿' });
    this.withdrawButton = page.getByRole('button', { name: 'ถอนเงิน ฿' });
    this.transferButton = page.getByRole('button', { name: 'โอนเงิน ฿' });

    this.accountNumberTransferTextbox = page.getByRole('textbox', { name: 'กรอกหมายเลขบัญชี 6 หลัก' });
    this.noteTransferTextbox = page.getByRole('textbox', { name: 'เช่น เงินค่าอาหาร, ค่าเช่าบ้าน' });
    this.customValueTextbox = page.getByPlaceholder('0');
    this.totalDespositDiv = page.locator('.rounded-lg.border.bg-gradient-card.border-secondary\\/20');
    this.totalWithdrawDiv = page.locator('.rounded-lg.border.bg-gradient-card.border-destructive\\/20');
    this.totalTransferDiv = page.locator('.rounded-lg.border.bg-gradient-card.border-primary\\/20');
    this.historyTransactionDiv = page.locator('.flex.items-center.justify-between.p-4.bg-muted\\/30.rounded-lg.hover:bg-muted\\/50.transition-colors'); 
    this.historyFilterAll = page.getByRole('button', { name: 'ทั้งหมด (' });
    this.historyFilterDeposit = page.getByRole('button', { name: 'ฝากเงิน (' });
    this.historyFilterWithdraw = page.getByRole('button', { name: 'ถอนเงิน (' });
    this.historyFilterTransfer = page.getByRole('button', { name: 'โอนเงิน (' });
    this.historyPanel = page.locator('.flex.items-center.justify-between.p-4.bg-muted\\/30')
    this.historyDepositPanel = page.locator('.w-12.h-12.rounded-full.flex.items-center.justify-center.bg-secondary\\/20')
    this.historyWithdrawPanel = page.locator('.w-12.h-12.rounded-full.flex.items-center.justify-center.bg-destructive\\/20');
    this.historyTransferPanel = page.locator('.w-12.h-12.rounded-full.flex.items-center.justify-center.bg-primary\\/20');
    this.b_500_Button = page.getByRole('button', { name: '฿500.00' });  
    this.b_1000_Button = page.getByRole('button', { name: '฿1,000.00' });
    this.b_2000_Button = page.getByRole('button', { name: '฿2,000.00' });
    this.b_5000_Button = page.getByRole('button', { name: '฿5,000.00' });
    this.b_10000_Button = page.getByRole('button', { name: '฿10,000.00' });
    this.b_20000_Button = page.getByRole('button', { name: '฿20,000.00' });
    this.b_50000_Button = page.getByRole('button', { name: '฿50,000.00' });
  }

  async goto() {
    await this.page.goto('https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ');
  }

  async waitForInputsToBeEnabled(elements: Locator[]) {
    for(var element of elements) {
      await expect(element).toBeEnabled();
    }
  }

  async login(accountNumber:string , pin:string) {
    await this.accountNumberTextbox.fill(accountNumber);
    await this.pinTextbox.fill(pin);
    await this.loginButton.click();
  }

  async logoff() {
    await this.logoffButton.click();
  }

  async goToDepositPage() {
    await this.goToDepositPageButton.click();
  }

  async goToWithdrawPage() {
    await this.goToWithdrawPageButton.click();
  }

  async goToTransferPage() {
    await this.goToTransferPageButton.click();
  }

  async goToHistoryPage() {
    await this.goToHistoryPageButton.click();
  }

  async goToPreviousPage() {
    await this.returnButton.click();
  }

  async deposit(buttonName: string) {
    await this.page.getByRole('button', { name: buttonName }).click();
    if (await this.depositButton.isDisabled()) return
    await this.depositButton.click();
  }

  async depositCustom(amount: string) {
    await this.customValueTextbox.clear()
    await this.customValueTextbox.fill(amount);
    if (await this.depositButton.isDisabled()) return
    await this.depositButton.click();
  }

  async withdraw(buttonName: string) {
    await this.page.getByRole('button', { name: buttonName }).click();
    if (await this.withdrawButton.isDisabled()) return
    await this.withdrawButton.click();
  }

  async withdrawCustom(amount: string) {
    await this.customValueTextbox.clear()
    await this.customValueTextbox.fill(amount);
    if (await this.withdrawButton.isDisabled()) return
    await this.withdrawButton.click();
  }

  async transfer(buttonName: string, accountNumber: string, note: string) {
    await this.accountNumberTransferTextbox.clear();
    await this.noteTransferTextbox.clear();
    await this.accountNumberTransferTextbox.fill(accountNumber);
    await this.page.getByRole('button' , { name: buttonName }).click();
    await this.noteTransferTextbox.fill(note);
    if (await this.transferButton.isDisabled()) return
    await this.transferButton.click();
  }

  async transferCustom(amount: string, accountNumber: string, note: string) {
    await this.customValueTextbox.clear();
    await this.accountNumberTransferTextbox.clear();
    await this.noteTransferTextbox.clear();
    await this.accountNumberTransferTextbox.fill(accountNumber);
    await this.customValueTextbox.fill(amount)
    await this.noteTransferTextbox.fill(note);
    if (await this.transferButton.isDisabled()) return
    await this.transferButton.click();
  }

  async filterHistoryBy(filter: string) {
    await this.page.getByRole('button', { name: `${filter} (` }).click();
  }
  
}