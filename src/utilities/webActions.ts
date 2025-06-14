import {Page, expect, ElementHandle, Download} from "@playwright/test";
import { envConfig } from "../../envConfig";
import { CommonMethods } from "./commonMethods";
import { Locators } from "../locators/locators";
const waitForElement = envConfig.waitForElement;
import * as os from "os";
import * as fs from "fs";
let commonMethods = new CommonMethods();
let getLocator = new Locators();

export class WebActions {
    readonly page: Page;
    
    constructor(page: Page){
        this.page = page;
    }

    async navigateToURL(url: string){
        await this.page.goto(url);
    }

    async waitForElementAttached(locator: string): Promise<void>{
        await page.waitForSelector(locator, {
            state: "visible",
            timeout : waitForElement,
        })
    }

    async verifyElementIsNotDisplayed(
        locator: string,
        errorMessages: string
    ): Promise<void>{
        await page
        .waitForSelector(locator, {state: `detached`, timeout: waitForElement})
        .catch(() => {
            throw new Error(`${errorMessages}`);
        })
    }

    async enterElementText(
        locator: string,
        text: number | string
    ) : Promise<void>{
        await this.waitForElementAttached(locator);
        await this.page.press(locator, "F2");
        await this.page.fill(locator, text.toString());
    }

    async clickElement(locator: string): Promise<void>{
        await this.waitForElementAttached(locator);
        await this.page.click(locator);
    }

    async delay(time: number): Promise<void>{
        return new Promise(function (resolve){
            setTimeout(resolve, time);
        });
    }

    async waitForAllNetworkCalls(){
        await page.waitForLoadState("networkidle");

        var loaders: string[] = [
            "page-loader",
            "loader-cntr",
            "Loading",
            "loading",
            "Spin",
            "spin",
            "Wheel",
            "wheel",
        ];

        if(global.project === "sauceDemo" || global.project === "sauceDemoProject"){
            for(let i = 0; i<loaders.length; i++){
                var loadersLocators = getLocator.ByContains("*", "class", loaders[i]);

                await this.verifyElementIsNotDisplayed(
                    loadersLocators,
                    `${loaders[i]} Loader is still displayed`
                );
            }
            await this.page.waitForLoadState("load");
        }
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForLoadState("domcontentloaded");
    }

    async mouseHover(locator: string) : Promise<void>{
        await this.page.locator(locator).hover();
    }

} // WebActionsPage