'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	// BASE_API: '"http://api.app.angel.jyw91.com"',
	BASE_API: '"http://localhost:8080"',
	IMG_API: '"http://develop.we-service.cn/hdd/image/"'
})
