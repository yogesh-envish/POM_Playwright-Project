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
    }


    async empty_login() {
        await this.profileicon.click();
        await this.loginbtn.click();
        await expect(this.popupheadings).toBeVisible();
        await this.logibsubmitbtn.click();
    }

    async empty_email() {
        await this.profileicon.click();
        await this.loginbtn.click();
        await expect(this.popupheadings).toBeVisible();
        await this.emailbox.fill("");
        await this.passbox.fill("Ak9871625533@");
        await this.logibsubmitbtn.click();
    }

    async empty_passwprd() {
        await this.profileicon.click();
        await this.loginbtn.click();
        await expect(this.popupheadings).toBeVisible();
        await this.emailbox.fill("yogesh@gmail.com");
        await this.passbox.fill("");
        await this.logibsubmitbtn.click();
    }

    async Valid_login() {
        await this.profileicon.click();
        await this.loginbtn.click();
        await expect(this.popupheadings).toBeVisible();
        await this.emailbox.fill("yogesh@gmail.com");
        await this.passbox.fill("Ak9871625533@");
        await this.logibsubmitbtn.click();
    }

}