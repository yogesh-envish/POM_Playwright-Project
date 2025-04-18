import { page, expect } from '@playwright/test'

export class UrbanLoginPage {

    constructor(page) {
        this.page = page;
        this.profileicon = this.page.locator("ul.header__topBarIconList > li:nth-child(2)");
        this.loginbtn = this.page.locator("ul.dropdown>li:nth-child(1)>a");
        this.popupheadings = this.page.locator("xpath=//div[text()='Login to explore great designs']");
        this.emailbox = this.page.locator("div#password-credentials>input#spree_user_email");
        this.passbox = this.page.locator("div.password>input:nth-child(1)");
        this.logibsubmitbtn = this.page.locator("(//input[@type='submit'])[3]");
        this.emailerrmsg = this.page.locator("xpath=(//div[@id='password-credentials']//label[@class='error'])[1]");
        this.passerrmsg = this.page.locator("xpath=(//div[@id='password-credentials']//label[@class='error'])[1]");
    }

    async LaunchURL() {
        await this.page.goto("https://www.urbanladder.com/")

        await expect(this.page).toHaveTitle(/Urban Ladder/);
    }

    async ProfileandLoginlink() {
        await this.profileicon.click();
        await this.loginbtn.click();
        await expect(this.popupheadings).toBeVisible();
    }

    async empty_login() {
        await this.logibsubmitbtn.click();
        await expect(this.emailerrmsg).toBeVisible();
        await expect(this.passerrmsg).toBeVisible();
        await expect(this.emailerrmsg).toHaveText("This field is required.");
        await expect(this.passerrmsg).toHaveText("This field is required.");
    }

    async empty_email() {
        await this.emailbox.fill("");
        await this.passbox.fill("Ak9871625533@");
        await this.logibsubmitbtn.click();
        await expect(this.emailerrmsg).toBeVisible();
        await expect(this.emailerrmsg).toHaveText("This field is required.");

    }

    async empty_passwprd() {
        await this.emailbox.fill("yogesh@gmail.com");
        await this.passbox.fill("");
        await this.logibsubmitbtn.click();
        await expect(this.passerrmsg).toBeVisible();
        await expect(this.passerrmsg).toHaveText("This field is required.");
    }

    async Valid_login() {
        await this.emailbox.fill("yogesh@gmail.com");
        await this.passbox.fill("Ak9871625533@");
    }

    async clickloginbtn() {
        await this.logibsubmitbtn.click();
    }
    
}