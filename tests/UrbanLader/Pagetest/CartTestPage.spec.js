import { test } from '@playwright/test'
import { UrbanLoginPage } from '../../../Pages/LoginUrbanlader'
import { CartPage } from '../../../Pages/CartPage'
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


test('Validating Cart Page content ', async ({ page }) => {

    const cartpage = new CartPage(page);
    await cartpage.Click_carticon();
    await cartpage.verfiycontentincartpage();
    // const productPage = new ProductPage(page);
    // await productPage.click_continuebtn();

})


//Logout from the application
test.afterEach('Logout from the application', async ({ page }) => {
    const urbanLoginPage = new UrbanLoginPage(page);
    await urbanLoginPage.clicklogoutbtn();
})