const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('../helpers/dbConnector')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: true,
	uploadDir: './uploads'
}))

function allowAcessControl(res) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
}

router.options('/', cors())
router.get('/', getUsers)

async function getUsers(req, res) {
	allowAcessControl(res)

	const query = `select * from users order by name`

	db.query(query).then(data => {
		res.json(data)
	})
}

router.options('/topActions', cors())
router.get('/topActions', getTopActions)

async function getTopActions(req, res) {
	allowAcessControl(res)

	const query =
		`select ld.user_id, ld.company_id, u.email, c.name as company,
		count(ld.action) from logs_data ld
		join users u on u.id = ld.user_id
		join companies c on c.id = ld.company_id
		group by ld.user_id, ld.company_id, u.email, c.name
		order by count desc`

	db.query(query).then(data => {
		res.json(data[0])
	})
}

router.options('/topAccess', cors())
router.get('/topAccess', getTopAccess)

async function getTopAccess(req, res) {
	allowAcessControl(res)

	const query =
		`select event_name, count(event_name)
		from logs_data
		group by event_name
		order by count desc`

	db.query(query).then(data => {
		res.json(data[0])
	})
}

module.exports = router
