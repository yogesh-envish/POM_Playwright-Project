import { test, expect } from '@playwright/test'
import { UrbanLoginPage } from '../../Pages/LoginUrbanlader'


//Launching the Urban Ladder URL
test.beforeEach('Launching the Urbanladder url', async ({ page }) => {

    await page.goto("https://www.urbanladder.com/");

    await expect(page).toHaveTitle(/Urban Ladder/)
})


//Try to login with empty creds
test('Login with Empty Creds', async ({ page }) => {

    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.empty_login();
})

//Try to login with empty email cred
test('Login with Empty email', async ({ page }) => {

    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.empty_email();
})

//Try to login with empty pass cred
test('Login with Empty password', async ({ page }) => {

    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.empty_passwprd();
})

//Try to login with valid creds
test('Login with valid Creds', async ({ page }) => {


    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.Valid_login();
})

//Closing  the  tabs
test.afterEach('Closing the tab once execute each testcase', async ({ page }) => {

    await page.close()

})

