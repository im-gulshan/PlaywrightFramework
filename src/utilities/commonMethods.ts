import * as fs from "fs";
import * as fs1 from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "path";
import { sauceDemoLocator } from "../locators/sauceDemoLocator"
import { sauceDemoConfig } from "../../ApplicationConfigs/sauceDemoConfig";
import { expect } from "@playwright/test";
import { error } from "console";
import * as unzipper from "unzipper";
import * as readline from "readline";
import * as XLSX from "xlsx";
import * as xml2js from "xml2js";
import ExcelJS from "exceljs";
import { exec } from "child_process";
import * as lockfile from "proper-lockfile";
import * as glob from "glob";
import AdmZip from "adm-zip";
import { stringify } from "csv-stringify";
import { parse } from "csv-parse";
import csv from "csv-parser";
import * as crypto from "crypto";
import { envConfig } from "../../envConfig";

const logFileName = "playwright_log.txt";
const tcPickStatus = "tcPickStatus.json";

interface Range {
    start: number;
    end: number;
}

interface ReadOptions {
    filePath: string;
    sheetName: string;
    columns: string[];
}

interface RowData {
    [key: string]: any;
}

const algorithm = "aes-256-cbc";

const key = Buffer.from(envConfig.key, "hex");
const iv = Buffer.from(envConfig.iv, "hex");

export class CommonMethods {
    public async writeToLogFile(message: string) {
        fs.appendFileSync(logFileName, `${new Date().toISOString()}: ${message}\n`)
    }

    public async cleanStatusFiles() {
        fs.truncateSync(tcPickStatus);
        fs.writeFileSync(tcPickStatus, JSON.stringify({}));
    }

    public async truncateFile(filename: string) {
        fs.truncateSync(filename);
    }

    public async getDefaultAutoSelectFamilyAttemptTimeout(filePath: string) {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, async (err) => {
                if (err)
                    await this.writeToLogFile(
                        `Error deleting file: ${filePath} :: ${err}`
                    );
                else
                    await this.writeToLogFile(`File deleted successfully: ${filePath}`);
            });
        } else {
            await this.writeToLogFile(`File does not exist: ${filePath}`);
        }
    }

    public async returnConfigValue(configName: string, key: string){
        var value = "";
        if(
            configName === "sauceDemoConfig" ||
            configName === "sauceDemo" ||
            configName === "saceDemoProject"
        ){
            value = `${sauceDemoConfig[`${key}` as keyof typeof sauceDemoConfig]}`;
            await this.writeToLogFile(`Value from sauceDemoConfig: ${value}`);
        }else{
            await this.writeToLogFile("Config does not have the required file Path");
        }
        return value;
    }

    public async returnLocatorValue(locatorClassName: string, key:string){
        var value = "";
        if(locatorClassName === "sauceDemo" || locatorClassName === "sauceDemoProject"){
            value = `${sauceDemoLocator[`${key}` as keyof typeof sauceDemoLocator]}`;
            await this.writeToLogFile(`Value from sauceDemoLocator: ${value}`);
        }else{
            await this.writeToLogFile(`Config does not have the required file path`);
        }
        return value;
    }

    public async isValidString(str: string | null |undefined): Promise<boolean>{
        return str !== null && str !== undefined && str.trim().length> 0;
    }

} // commonMethods end