const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database:"dietapp"
})

const porConfig = {
    connetionString: process.env.DATABASE_URL
}

const DatePool = new Pool(process.env.NODE_ENV === 'production' ? porConfig : pool)

module.exports = pool