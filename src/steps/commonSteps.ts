import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import * as fs from "fs";
import { CommonMethods } from "../utilities/commonMethods";
import { CommonPageMethods } from "../pages/Generic/commonPageMethods";
import * as lockfile from "proper-lockfile";
import path, { parse } from "path";
import test, { expect } from "@playwright/test";
import { sauceDemoPage } from "../pages/SauceDemo/sauceDemoPage";


let commonPageMethods: CommonPageMethods;
let commonMethods = new CommonMethods();

BeforeStep(async () => {
    commonPageMethods = new CommonPageMethods(global.page);
});

Given("I reset the Error and Warning Messages", async () => {
    try {
        if (global.errorMessages != null || global.errorMessages != undefined) {
            for (let i = global.errorMessages.length; i > 0; i--) {
                global.errorMessages.pop();
            }
        }
    } catch (error) {
        await commonMethods.writeToLogFile(
            `Failure in resetting the Error and Warning messages: ${error}`
        );
    }
});

Given("I reload the page", async () => {
    try {
        await commonPageMethods.reloadPage();
    } catch (error) {
        await commonMethods.writeToLogFile(
            `Failure in reloading the page: ${error}`
        );
    }
});

When("I navigate to the {string}.", async (label: string ,dataTable) => {
    var[menu, action]: string = ""

    const elements = dataTable.hashes();

    for (const element of elements) {
        const { Menu, Action } = element;
        menu = Menu;
        action = Action;

        await commonMethods.writeToLogFile(`Menu: ${menu}`);
        await commonMethods.writeToLogFile(`Action: ${action}`);
        await commonPageMethods.navigateToPageOrMenu(menu, action);

    }
});

Then("I should see the {string} in {string}.", async (options, locator) => {
    await commonPageMethods.verifyText(options, locator)
});