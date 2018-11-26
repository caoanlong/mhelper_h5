'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	// BASE_API: '"https://api.neworldxo.com"',
	// BASE_API: '"http://localhost:8080"',
	BASE_API: '"http://192.168.1.103:8080"',
	IMG_API: '"http://develop.we-service.cn/hdd/image/"'
})
