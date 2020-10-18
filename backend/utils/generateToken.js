const jwt = require('jsonwebtoken');

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT, { expiresIn: '30d' });
};

module.exports = createToken;
