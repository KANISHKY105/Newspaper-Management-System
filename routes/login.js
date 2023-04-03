const express = require('express')
const router = express.Router()

const {renderLogin, logUser} = require('../controllers/login')

router.route('/')
.get(renderLogin)
.post(logUser)

module.exports = router