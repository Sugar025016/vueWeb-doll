'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // APIPATH: '"http://localhost:8080"',
  // CUSTOMPATH: '"spring"',//自定义路径
  APIPATH: '"https://vue-course-api.hexschool.io"',
  CUSTOMPATH: '"spring"',
})
