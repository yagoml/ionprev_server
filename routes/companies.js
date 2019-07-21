const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('../helpers/dbConnector')
const helper = require('../helpers/helper')

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
router.get('/', getCompanies)

async function getCompanies(req, res) {
	allowAcessControl(res)

	const query = `select * from companies order by name`

	db.query(query).then(data => {
		res.json(data)
	})
}

router.options('/reports', cors())
router.post('/reports', reportCompany)

async function reportCompany(req, res) {
	allowAcessControl(res)
	const data = req.body

	data.from = helper.convertDateDBFormat(data.from)
	data.to = helper.convertDateDBFormat(data.to)

	const query =
		`SELECT * FROM public.logs_data ld
		INNER JOIN users u ON u.id = ld.user_id
		WHERE ld.company_id = ${ data.companyID }
		AND ld.date_time >= '${ data.from }' 
		AND ld.date_time <= '${ data.to } 23:59'
		ORDER BY ld.date_time`

	db.query(query).then(data => {
		res.json(data)
	})
}

module.exports = router
