// PostGres
const { Client } = require('pg')
// DB connection config
const config = {
	local: {
		host: 'localhost',
		port: 5432,
		database: 'ionprev',
		user: 'postgres',
		password: '123456',
		ssl: false
	},
	heroku: {
		host: 'ec2-54-243-130-33.compute-1.amazonaws.com',
		port: 5432,
		database: 'd7prt1q51db3eu',
		user: 'damrcwkrpyzvve',
		password: '88bbc971be10c7520ce195613f4c3798a904d61daa0e0bae29a4c2b91c11a47a',
		ssl: true
	}
}
// Set Config
const usedConfig = config.local
// Connection String
const conString = `postgres://${ usedConfig.user }:${ usedConfig.password }@${ usedConfig.host }:${ usedConfig.port }/${ usedConfig.database }?ssl=${ usedConfig.ssl }`
// DB instance
const client = new Client(conString)
client.connect()

async function sqlQuery(query) {
	const res = await client.query(query)
	await res
	return res.rows
}

const dbConnector = {
	query: async function (query) {
		try {
			return await sqlQuery(query)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = dbConnector