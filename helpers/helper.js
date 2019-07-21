const helper = {
	convertDateDBFormat: (date) => {
		date = date.split("-")
		return date[0] + "-" + date[2] + "-" + date[1]
	}
}

module.exports = helper