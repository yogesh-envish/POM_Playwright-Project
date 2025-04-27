import { test } from '@playwright/test'
import { UrbanLoginPage } from '../../Pages/LoginUrbanlader'
import { ProductPage } from '../../Pages/Product_Search'


//Launching the Urban Ladder URL
test.beforeEach('Launching the Urbanladder url', async ({ page }) => {

    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.LaunchURL();
    await urbanLoginPage.ProfileandLoginlink();
    await urbanLoginPage.Valid_login("yogesh@gmail.com", "Ak9487162553@");
    await urbanLoginPage.clickloginbtn();
})


//Try to login with valid creds
test('Searching the Product ', async ({ page }) => {

    const productPage = new ProductPage(page);
    await productPage.Click_carticon();
    await productPage.Click_LivingCategory();
    await productPage.Click_CoffeTable();
    await productPage.Click_Sortbtn();

})

//Logout from the application
test.afterEach('Logout from the application', async ({ page }) => {
    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.clicklogoutbtn();
})