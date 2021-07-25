const { MongoClient } = require('mongodb');

class MongoConnect {

    constructor() {

        this.options = {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
        
        this.dbSession;

    }

    async connect() {
        try {
            this.dbSession = await MongoClient.connect(process.env.DB_HOST, this.options);
            console.log('DB Connection has been established.');
        } catch(err) {
            console.log(`DB Connection Error: ${err}`);
        }
    }

    getDB() {
        return this.dbSession.db(process.env.DB_NAME);
    }
}

module.exports = new MongoConnect();

