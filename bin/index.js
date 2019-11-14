#!/usr/bin/env node
const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const options = yargs
 .usage("Usage: -c <atlas promo code>")
 .option("c", { alias: "code", describe: "Atlas Promo Code", type: "string", demandOption: true })
 .argv;
const promo = require("../lib/promo");

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
};

async function main(){
    try {
        // console.log(`${options.code}`);
        var code = `${options.code}`;
        var remaining = promo.remaining(code);
        // result = await client.db("dw").collection("dw__cloud_backend__cloud_orgs").findOne({"credits.coupon.code": `${options.code}`});
        const codeMessage = chalk.white.bold("Codes Remaining for " + `${code}` + ": " + `${remaining}`);
        const msgBox = boxen( codeMessage, boxenOptions );

        console.log(msgBox);
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.err);
