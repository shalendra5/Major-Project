const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoUrl= "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(()=> {
        console.log("Connection Successful.")
    })
    .catch(err => { 
        console.log(err)
    });
async function main() {
    await mongoose.connect(mongoUrl);
};

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner : "6716a5a4c87ce44e010748f7"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized.");
};
initDB();