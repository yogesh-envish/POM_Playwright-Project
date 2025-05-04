import { page, expect } from '@playwright/test'


export class CartPage {
    constructor(page) {
        this.page = page
        this.carticon = this.page.locator('#header-icon-cart');
        this.helpoption =  this.page.getByRole('link', { name: 'Help' })
        this.trackorderlink = this.page.locator('#header').getByText('Track Order');
        this.changepincodebtn = this.page.getByRole('link', { name: 'Change Pincode' });
        
    }

    async Click_carticon() {
        await this.carticon.isVisible();
        await this.carticon.click();
    }

    async verfiycontentincartpage() {
        await expect(this.helpoption).toBeVisible();
        await expect(this.trackorderlink).toBeVisible();
        await expect(this.changepincodebtn).toBeVisible();
    }

}