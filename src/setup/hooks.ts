import {
    After,
    AfterAll,
    AfterStep,
    Before,
    BeforeAll
} from "@cucumber/cucumber";
import {
    Browser,
    BrowserContext,
    chromium,
    Page,
    expect,
    APIRequestContext,
    APIResponse,
} from "@playwright/test"

import { CommonMethods } from "../utilities/commonMethods";
import { isExamplePicked, markExampleAsPicked } from "../setup/tcPickStatus"
import { initializeStore } from "../utilities/threadLocalStorage";

import { envConfig } from "../../envConfig";
import { LogInPage } from "../pages/Generic/logInPage";
import path from "path";
import { sauceDemoConfig } from "../../ApplicationConfigs/sauceDemoConfig";
import { glob } from "fs";

let commonMethods = new CommonMethods();
let logInPage: LogInPage;

declare global {
    var browser: Browser;
    var context: BrowserContext;
    var page: Page;
    var request: APIRequestContext;
    var actualResoonse: APIResponse | any;
    var project: any;
    var testCaseID: any;
    var testDataFilePath: any;
    var testCaseFilePath: any;
    var apiTestCaseFilePath: any;
    var errorMessages: string[];
    var payload: string[] | any;
    var expectedResponse: string[] | any;
    var expectedResponseCode: string[] | any;
    var formName: string[] | any;
    var masterPayLoadFilePath: string[] | any;
    var masterResponseFilePath: string[] | any;
    var masterErrorResponseFilePath: string[] | any;
    var payloadFilePath: string[] | any;
    var expectedResponseFilePath: string[] | any;
    var expectedErrorResponseFilePath: string[] | any;
    var actualResponseFilePath: string[] | any;
    var payLoadDataPointFile: string[] | any;
    var responseDataPointFile: string[] | any;
    var masterFilePath: string[] | any;
    var downloadAndUnzipFilePath: string[] | any;
    var expectedResultsForCucumberFilePath: string[] | any;
    var rulesIdColumnFilePath: string[] | any;
    var temActualResponseFilePath: string[] | any;
    var temExpectedResponseFilePath: string[] | any;
    var deleteActualResponseFilePath: string[] | any;
    var deleteExpectedResponseFilePath: string[] | any;
    var deleteTemActualResponseFilePath: string[] | any;
    var deletePayLoadFilePath: string[] | any;
}

let now = new Date();
let skipTestCase: boolean = false;

BeforeAll(async () => {
    console.log("process.env.project: " + process.env.project);
    console.log("process.env.executeSauceDemoUITests: " + process.env.executeSauceDemoUITests);

    global.errorMessages = [];
    if (
        process.env.project === "sauceDemoProject" ||
        process.env.executeSauceDemoUITests === "true"||
        envConfig.executeSauceDemoUITests === "true"
    ) {
        global.project = "sauceDemoProject";
        console.log("global.project - sauceDemo : " + global.project);
    } // add elseIf here similarly like above one conditon if you add another future project 

    try {
        console.log("global.project : " + global.project);
        expect(global.project).toBeDefined();
        expect(global.project).not.toBeNull();
    } catch (e: any) {
        commonMethods.writeToLogFile(`Error in setting project...`);
        commonMethods.writeToLogFile(`global.project is : ${e}`);
    }

    // global.testDataFilePath = await commonMethods.returnConfigValue(
    //     global.project,
    //     "UI_TESTDATA_FILE_PATH"
    // );

    // global.testCaseFilePath = await commonMethods.returnConfigValue(
    //     global.project,
    //     "UI_TESTCASE_FILE_PATH"
    // );

    // add other file paths if required in future

    if(
        process.env.executeSauceDemoUITests === "true" ||
        envConfig.executeSauceDemoUITests === "true"
    ){
        commonMethods.writeToLogFile(`Launching browser....`);
        global.browser = await chromium.launch({
            args: ["--start-maximized"],
            headless: false,
            timeout: 120000,
        });
    }

    try {
        global.context = await global.browser.newContext({
            acceptDownloads: true,
        });

        global.page = await global.context.newPage();
        await global.page.setViewportSize({ width: 1350, height: 750 });
        global.page.setDefaultNavigationTimeout(120000);
        logInPage = new LogInPage(global.page);
    } catch (e) {
        await commonMethods.writeToLogFile(
            `Error in creating new instance of context and page....`
        );
        await commonMethods.writeToLogFile(`Error : ${e}`);
        throw e;
    }

    if (global.project === "sauceDemoProject") {

        await logInPage.logIn(
            sauceDemoConfig.sauceDemoTestEnvURL,
            sauceDemoConfig.sauceDemoTestEnvUserName,
            sauceDemoConfig.sauceDemoTestEnvPassword
        );
    }
}); // BeforeAll

Before(async function (sourceLocation) {
    initializeStore({ globalFlag: false });
    const scenarioName = sourceLocation.pickle.name;
    const pickleID = sourceLocation.pickle.id;
    await commonMethods.writeToLogFile(
        `sourceLocation.pickle.name : ` + sourceLocation.pickle.name
    )

    await commonMethods.writeToLogFile(
        `sourceLocation.pickle.astNodeIds : ` + sourceLocation.pickle.astNodeIds
    )

    await commonMethods.writeToLogFile(`pickleID : ` + pickleID);
    let breakLoop = false;

    for (let i = 0; i < sourceLocation.pickle.astNodeIds.length; i++) {
        skipTestCase = false;
        const astNodeId = sourceLocation.pickle.astNodeIds[i];
        await commonMethods.writeToLogFile(`astNodeId : ` + astNodeId);
        if ((await isExamplePicked(scenarioName, astNodeId)) === true) {
            await commonMethods.writeToLogFile(
                `Test case '${sourceLocation.pickle.name} ${astNodeId}' is already picked. Skipping....`
            );
            skipTestCase = true;
            continue;
        } else {
            if (!((await isExamplePicked(scenarioName, astNodeId)) === true))
                markExampleAsPicked(scenarioName, astNodeId);
            await commonMethods.writeToLogFile(
                `Test case '${sourceLocation.pickle.name} ${astNodeId}' picked....`
            );
            breakLoop = true;
            break;
        }
    }
    if (breakLoop)
        await commonMethods.writeToLogFile(`scenario picked and break loop`);
});

AfterStep(async function (sourceLocation) {
    const stepText = sourceLocation.pickleStep?.text || "";
    if (
        !stepText.toLowerCase().includes("download") &&
        (
            process.env.executeSauceDemoUITests === "true" ||
            envConfig.executeSauceDemoUITests === "true"
        )
    ) {
        await page.waitForLoadState("networkidle");
        await page.waitForLoadState("load");
        await page.waitForLoadState("domcontentloaded");
        const screenshotPath = path.resolve(
            `screenshots/${sourceLocation.testCaseStartedId}-${Date.now()}.png`
        );

        try {
            if (page && (await page.isVisible("body"))) {
                await page.screenshot({ path: screenshotPath });
                this.attach(`Screenshot taken : ${screenshotPath}`);
                await commonMethods.writeToLogFile(
                    `Screenshot taken: ${screenshotPath}`
                );
            } else {
                await commonMethods.writeToLogFile(`Error in taking screenshot....`);
            }
        } catch (e) {
            await commonMethods.writeToLogFile(`Error in takin screenshot....`);
            await commonMethods.writeToLogFile(`Error: ${e}`);
        }
    }
});

After(async () => {
    await commonMethods.writeToLogFile(`Throwing allglobal errors if any....`);
    if (global.errorMessages.length > 0) {
        const allErrors = global.errorMessages.join("\n");
        throw new Error(allErrors);
    }
});

AfterAll(async () => {
    if (
        process.env.executeSauceDemoUITests === "true" ||
        envConfig.executeSauceDemoUITests === "true"
    ) {
        commonMethods.writeToLogFile(`Logging out....`);
        commonMethods.writeToLogFile(`Closing context and page....`);

        await global?.page.close();
        await global?.context.close();

        global.browser?.close();
        commonMethods.writeToLogFile("Closed context and page....");
        now = new Date();

        commonMethods.writeToLogFile("now : " + now);
        const formatterdDateTime = `${now.getFullYear()}-${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
                .getHours()
                .toString()
                .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
                    .getSeconds()
                    .toString()
                    .padStart(2, "0")}`;

        commonMethods.writeToLogFile(
            "Execution En Date Time : " + formatterdDateTime
        );

    }
})