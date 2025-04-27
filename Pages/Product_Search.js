import { page, expect } from '@playwright/test'
import test from 'node:test';


export class ProductPage {

    constructor(page) {
        this.page = page;
        this.carticon = this.page.locator("ul.header__topBarIconList > li:nth-child(4)");
        this.emptytxt = this.page.locator("//p[@class='empty_msg']");
        this.closebtn = this.page.locator("div.close > div >a");
        this.continuebtn = this.page.locator("(//div//a[text()='Continue shopping'])[1]");
        this.livingbtn = this.page.locator("//div[@id='topnav_wrapper']/ul/li[4]");
        this.cofetablebtn = this.page.locator("//div[@id='topnav_wrapper']/ul/li[4]/div/div/ul/li[1]/ul/li[1]/a");
        this.sortbtn = this.page.locator("//div[@class='item']//div//span[contains(text(),'Recommended')]");
        this.alloptions = this.page.locator("ul.sortoptions > li");


        //expected text
        this.expectedemptytxt = "Your cart is empty";
    }


    async Click_carticon() {
        await this.carticon.isVisible();
        await this.carticon.click();
        await expect(this.page).toHaveURL(/cart/);

        await expect(this.emptytxt).toHaveText(this.expectedemptytxt)

        if (this.emptytxt.isVisible()) {
            await this.continuebtn.click();
        } else {
            await this.closebtn.click();
        }
    }

    async Click_LivingCategory() {
        await this.livingbtn.isVisible();
        await this.livingbtn.click();
    }

    async Click_CoffeTable() {
        await this.cofetablebtn.click();
    }

    async Click_Sortbtn() {
        await this.sortbtn.click();
        await this.alloptions.last();
        const expectedoption = "Price: High to Low";
        console.log("Expected option is: " + expectedoption);
        const count = await this.alloptions.count();
        console.log("Total number of options are: " + count);
        for (let i = 0; i <= count; i++) {
            if (await this.alloptions.nth(i).textContent() === expectedoption) {
                await this.alloptions.nth(i).click();
                break;
            }
         
        }
        await this.page.waitForTimeout(2000);
    }
}