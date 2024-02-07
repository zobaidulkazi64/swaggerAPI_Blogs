const fs = require('fs/promises');
const path = require('path');


// console.log(process.env.DB_URL);
// console.log(path.resolve(process.env.DB_URL))


class connectionDatabase {
    constructor(dbURL) {
        this.db = null;
        this.dbURL = dbURL;
    }

  async  read(){
        this.dbStr = await fs.readFile(this.dbURL);
        this.db = JSON.parse(this.dbStr);
    }
 async  write(){
        if(this.db){
         await   fs.writeFile(this.dbURL, JSON.stringify(this.db));

        }
    }

    async getDB(){
        if(this.db){
            return this.db
        }
        await this.read();
        return this.db
    }


}


const connection = new connectionDatabase(path.resolve(process.env.DB_URL));

module.exports = connection



// const connection1 = new connectionDatabase(path.resolve(process.env.DB_URL));

// module.exports = connection other connection posable to use 
// module.exports = {
//     db: connection.getDB

// }