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

router.options('/save', cors())
router.post('/save', saveFile)

async function saveFile(req, res) {
	allowAcessControl(res)
	res.json({ vai: true })

	// const query = `INSERT INTO logs (user_id, company_id, event_name, action, date_time) VALUES ()
	// `

	// db.query(query).then(data => {
	// 	console.log(data)
	// 	res.json(data)
	// })
}

module.exports = router
