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
        this.productbox = this.page.locator("div.productbox");
        this.productnames = this.page.locator("div.product-info-block > a > div > span.name");
        this.viewprodbtn = this.page.locator(".otherinfo > a:nth-child(2)");   


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
        await this.page.waitForTimeout(2000);
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

    async click_expectedproduct() {
        await this.productbox.last();
        const expectedproduct = "Square Solid Wood Coffee Table in Gold";
        const prpoductboxcount = await this.productbox.count();
        console.log("Total number of products are: " + prpoductboxcount);

        //If you want to open the product in new tab then add this params
        //1. Open in same tab
        //2. Open in new tab -> use any one of them

        let openstyle = "Open in same tab";
        for (let i = 0; i <= prpoductboxcount; i++) {
            if (await this.productnames.nth(i).textContent() === expectedproduct) {

                switch (openstyle) {
                    case "Open in new tab":
                        await this.page.waitForTimeout(2000);
                        await this.productbox.nth(i).click();
                        break;
                    case "Open in same tab":
                        await this.page.waitForTimeout(2000);
                        await this.productbox.nth(i).hover();
                        await this.page.waitForTimeout(2000);
                        await this.viewprodbtn.nth(i).click();
                        await this.page.waitForTimeout(2000);
                        break;
                }
                break;
            }
        }
    }
}