import {Page} from "@playwright/test";
import {LoginPageLocator} from "../../locators/loginLocators";
import { WebActions } from "../../utilities/webActions";
import { CommonMethods } from "../../utilities/commonMethods";

let commonMethods = new CommonMethods();
let webActions: WebActions;
let logInPageLocator: LoginPageLocator = new LoginPageLocator();

export class LogInPage{
    constructor(page: Page){
        webActions = new WebActions(page);
    }

    public async logIn(url:string, username: string, password: any){
        await commonMethods.writeToLogFile("Navigating to: "+ url);

        await page.goto(url);
        await webActions.enterElementText(logInPageLocator.username, username);
        await webActions.enterElementText(logInPageLocator.password, password);
        await webActions.clickElement(logInPageLocator.btnLogin);

        await webActions.waitForAllNetworkCalls();
        await webActions.delay(2000);
    }








    
} // logInPage