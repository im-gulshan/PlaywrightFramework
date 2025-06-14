import { expect, Page } from "@playwright/test";
import { WebActions } from "../../utilities/webActions";
import { Locators } from "../../locators/locators";
import { CommonMethods } from "../../utilities/commonMethods";
import { CommonPageMethods } from "../Generic/commonPageMethods";


let webActions: WebActions;
let getLocator = new Locators();
let commonMethods = new CommonMethods();

export class sauceDemoPage{
    constructor(page: Page){
        webActions = new WebActions(page);
    }

    

} // sauceDemoPage