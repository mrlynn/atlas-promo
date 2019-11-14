const {MongoClient} = require('mongodb');
require('dotenv').config();

exports.remaining = async function(code) {
    const uri = "mongodb+srv://" + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASS + "@datawarehouseprod-coq6x.mongodb.net/dw?authSource=%24external&authMechanism=PLAIN";
    const client = new MongoClient(uri,
        {
        "useNewUrlParser": true,
        "useUnifiedTopology": true,
        }
    );
     
    try {
        await client.connect();
        result = await client.db("dw").collection("dw__cloud_backend__cloud_orgs").findOne({"credits.coupon.code": `${options.code}`});
        // const codeMessage = chalk.white.bold("Credit Remaining for " + `${options.code}`.toFixed(2) + ": " + result.credits[0].remaining_amount_cents);
        // const msgBox = boxen( codeMessage, boxenOptions );
        // console.log(msgBox);
        return result.credits[0].remaining_amount_cents;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}