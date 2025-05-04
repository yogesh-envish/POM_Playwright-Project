import { test } from '@playwright/test'
import { UrbanLoginPage } from '../../../Pages/LoginUrbanlader'
import { ProductPage } from '../../../Pages/Product_Search'

import fs from 'fs'
import { parse } from 'csv-parse/sync'

//Importing the test data from the CSV file
const datas = parse(fs.readFileSync("test-data/LoginCredsUrbanladder.csv"), {
    columns: true,
    skip_empty_lines: true
})


//Launching the Urban Ladder URL
test.beforeEach('Launching the Urbanladder url', async ({ page }) => {

    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.LaunchURL();
    await urbanLoginPage.ProfileandLoginlink();
    //Iterating through the test data
    //Using the for of loop to iterate through the test data
    for (const data of datas) {
        await urbanLoginPage.Valid_login(data.Username, data.Password);
    }
    await urbanLoginPage.clickloginbtn();
})


//Try to login with valid creds
test('Searching the Product ', async ({ page }) => {
    test.setTimeout(60000);
    const productPage = new ProductPage(page);
    await productPage.Click_carticon();
    await productPage.Click_LivingCategory();
    await productPage.Click_CoffeTable();
    await productPage.Click_Sortbtn();
    await productPage.click_expectedproduct();
    await productPage.verifyproductdetails();
    await productPage.click_addtocartbtn();
    await productPage.click_continuebtn();

})

//Logout from the application
test.afterEach('Logout from the application', async ({ page }) => {
    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.clicklogoutbtn();
})