import { test} from '@playwright/test'
import { UrbanLoginPage } from '../../Pages/LoginUrbanlader'


//Launching the Urban Ladder URL
test.beforeEach('Launching the Urbanladder url', async ({ page }) => {

    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.LaunchURL();

})


//Try to login with empty creds
test('Login with Empty Creds', async ({ page }) => {

    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.ProfileandLoginlink();
    await urbanLoginPage.empty_login();
})

//Try to login with empty email cred
test('Login with Empty email', async ({ page }) => {

    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.ProfileandLoginlink();
    await urbanLoginPage.empty_email();
})

//Try to login with empty pass cred
test('Login with Empty password', async ({ page }) => {

    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.ProfileandLoginlink();
    await urbanLoginPage.empty_passwprd();
})

//Try to login with valid creds
test('Login with valid Creds', async ({ page }) => {
    
    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.ProfileandLoginlink();
    await urbanLoginPage.Valid_login("yogesh@gmail.com","Ak9487162553@");
    await urbanLoginPage.clickloginbtn();
})

//Closing  the  tabs
test.afterEach('Closing the tab once execute each testcase', async ({ page }) => {

    await page.close()
})
