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
	const input = req.body
	let logID = 0

	await db.query(`
		INSERT INTO public.logs(comments) VALUES ('Default import') returning (id);
	`).then(result => {
		logID = result[0].id
	})

	let inserts = ''
	input.forEach(data => {
		inserts +=
			`INSERT INTO logs_data (user_id, company_id, event_name, action, date_time, log_id)
			VALUES (${data.user_id}, ${data.company_id}, '${data.event_name}', '${data.action}',
			'${data.date_time}', ${logID});`
	});

	await db.query(inserts)
	res.json({ sucess: true })
}

module.exports = router
