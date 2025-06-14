import fs, { read } from "fs";
import { CommonMethods } from "../utilities/commonMethods";
let commonMethods = new CommonMethods();

const stateFile = "tcPickStatus.json";

if (!fs.existsSync(stateFile)) {
    fs.writeFileSync(stateFile, JSON.stringify({}));
}

const readState = async () => {
    try {
        const data = fs.readFileSync(stateFile, "utf-8");
        return data ? JSON.parse(data) : {};
    } catch (error) {
        await commonMethods.writeToLogFile(`Error reading state file: ${error}`);
        return {};
    }
}

const readStateWithRetry = async (retries: number = 1): Promise<any> => {
    let state = readState();
    let attempts = 0;

    while (state === null && attempts < retries) {
        await commonMethods.writeToLogFile(
            `Retrying readState.... Attempt ${attempts + 1}`
        );
        state = readState();
        attempts++;
    }
    if (state === null) {
        throw new Error("Failed to read state after multiple attempts");
    }

    return state;
}

const writeState = (state: any) => {
    try {
        fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
    } catch (error) {
        console.error("Error writing state file: ", error);
    }
}

export const isExamplePicked = async (scenarioName: any, astNodeId: string) => {
    const state = await readStateWithRetry(3);
    return state[scenarioName]?.[astNodeId] || false;
}

export const markExampleAsPicked = async (
    scenarioName: string,
    astNodeId: string
) => {
    const state = await readState();
    if (!state[scenarioName]) {
        state[scenarioName] = {};
    }

    state[scenarioName][astNodeId] = true;
    writeState(state);
}

export const markTestAsDone = async (testName: string) => {
    const state = await readState();
    state[testName] = true;
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
}

export const isTestDone = async (testName: string) => {
    const state = await readState();
    return state[testName] || false;
}

export const markExampleAsDone = async (
    scenarioName: string,
    exampleIndex: string
) => {
    const state = await readState();
    if (!state[scenarioName]) {
        state[scenarioName] = {};
    }
    state[scenarioName][exampleIndex] = true;
    writeState(state);
}

export const isExampleDone = async (scenarioName: any, astNodeId: string) => {
    const state = await readState();
    return state[scenarioName]?.[astNodeId] || false;
}

export const areAllExampleDone = async (
    scenarioName: string,
    totalExamples: number
) => {
    const state = await readState();
    if (!state[scenarioName]) {
        return false;
    }
    return Object.keys(state[scenarioName]).length === totalExamples;
}