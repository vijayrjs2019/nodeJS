const mongoose = require('mongoose');

mongoose_url = process.env.MONGO_URL;

mongoose.connect(mongoose_url)
.then(()=>{
    console.log(`MongosDB connection successfully`);
}).catch((error)=>{
    console.log(`MongosDB connection faild , ${error}`);
});