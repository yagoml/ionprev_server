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

module.exports = router
