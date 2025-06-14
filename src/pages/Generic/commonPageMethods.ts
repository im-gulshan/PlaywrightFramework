import { Page, expect } from "@playwright/test";
import { WebActions } from "../../utilities/webActions";
import { CommonMethods } from "../../utilities/commonMethods";
import { Locators } from "../../locators/locators";
import * as fs from "fs";
import * as path from "path";

let webActions: WebActions;
let getLocator = new Locators();
let commonMethods = new CommonMethods();
let startDate = new Date();

interface Range {
    start: number;
    end: number;
}

export class CommonPageMethods {
    constructor(page: Page) {
        webActions = new WebActions(page);
    }

    public async reloadPage() {
        await webActions.page.reload();
        await webActions.waitForAllNetworkCalls();
    }

    public async navigateToPageOrMenu(menu: string, action: string) {
        await webActions.waitForAllNetworkCalls();
        let pageLocator = await commonMethods.returnLocatorValue(
            global.project,
            menu
        );
        await commonMethods.writeToLogFile(`pageLocator: ${pageLocator}`);
        if (await commonMethods.isValidString(menu)) {
            await commonMethods.writeToLogFile(`${page} menu string passed is valid`);
            if (action === "Click") {
                await webActions.clickElement(pageLocator);
            } else if (action === "Hover") {
                await webActions.mouseHover(pageLocator);
            }
        }
    }







} // CommonPageMethods page