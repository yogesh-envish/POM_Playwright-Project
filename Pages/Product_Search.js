import { page, expect } from '@playwright/test'



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
        this.producttitle = this.page.locator("div > h1.product-title");
        this.priceofproduct = this.page.locator("div.price > div.discounted-price");
        this.addtocartbtn = this.page.locator("button#add-to-cart-button");


        //expected text
        this.expectedemptytxt = "Your cart is empty";
    }


    async Click_carticon() {
        await this.carticon.isVisible();
        await this.carticon.click();
        await expect(this.page).toHaveURL(/cart/);

        if (await this.emptytxt.isVisible()) {
            await expect(this.emptytxt).toHaveText(this.expectedemptytxt);
            await this.continuebtn.click();
        } else {
            await this.closebtn.click();
            await this.continuebtn.click();
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
        await this.page.waitForTimeout(4000);
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
                        await this.page.waitForTimeout(3000);
                        await this.productbox.nth(i).hover();
                        await this.page.waitForTimeout(3000);
                        await this.viewprodbtn.nth(i).click();
                        await this.page.waitForTimeout(3000);
                        break;
                }
                break;
            }
        }
    }

    async verifyproductdetails() {
        await this.producttitle.isVisible();
        const expectedproducttitle = "Square Solid Wood Coffee Table in Gold";
        const actualproducttitle = await this.producttitle.textContent();
        console.log("Actual product title is: " + actualproducttitle);
        console.log("Expected product title is: " + expectedproducttitle);
        await expect(this.producttitle).toHaveText(expectedproducttitle);

        await this.page.waitForTimeout(2000);

        await expect(this.priceofproduct).toBeVisible();
        await this.priceofproduct.scrollIntoViewIfNeeded();
        let actualprice = await this.priceofproduct.textContent();
        let finalactualprice = actualprice.replace("MRP", '').replace("₹", '').replace(",", '').trim();
        console.log("Actual product price is: " + finalactualprice);
        const expectedprice = "99999";
        console.log("Expected product price is: " + expectedprice);
        //await expect(finalactualprice).toHaveText(expectedprice);;
        if (finalactualprice === expectedprice) {
            console.log("Price is matching with expected price");
        }
        else {
            console.log("Price is not matching with expected price");
        }
    }

    async click_addtocartbtn() {
        await this.addtocartbtn.isVisible();
        await this.addtocartbtn.click();
        await this.page.waitForTimeout(2000);
    }

    async click_continuebtn() {
        await this.continuebtn.isVisible();
        await this.continuebtn.click();
    }
}