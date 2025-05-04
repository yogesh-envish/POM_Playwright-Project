//Importing the required modules and classes
//Importing the test class from the LoginUrbanlader page
import { test } from '@playwright/test'
import { UrbanLoginPage } from '../../../Pages/LoginUrbanlader'
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
    //Iterating through the test data
    //Using the for of loop to iterate through the test data
    for (const data of datas) {
        await urbanLoginPage.Valid_login(data.Username, data.Password);
    }
    await urbanLoginPage.clickloginbtn();

})

//Closing  the  tabs
test.afterEach('Closing the tab once execute each testcase', async ({ page }) => {

    await page.close()
})
