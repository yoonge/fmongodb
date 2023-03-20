const { dbUrl, dbName } = require('./config')
const { MongoClient } = require('mongodb')

class Db {
    static getInstance() {
        if (!Db.instance) {
            Db.instance = new Db()
        }
        return Db.instance
    }

    constructor() {
        this.dbClient = null
        this.connect()
    }

    async connect() {
        if (!this.dbClient) {
            const client = new MongoClient(dbUrl)
            await client.connect()
            this.dbClient = client.db(dbName)
        }
        return this.dbClient
    }

    async find(collectionName, json = {}) {
        const dbClient = await this.connect()
        const result = dbClient.collection(collectionName).find(json)
        const data = await result.toArray()
        return data
    }

    async insert(collectionName, json) {
        const dbClient = await this.connect()
        const result = dbClient.collection(collectionName).insertOne(json)
        return result
    }

    update() {

    }

    remove() {

    }
}

module.exports = Db.getInstance()
