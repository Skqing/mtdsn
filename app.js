/**
 * Author: DolphinBoy
 * Date: 12-11-13
 * Time: 下午7:05
 * Description:
 */

var http = require("http");

var router = require("./router");

global.appconfig = require('./config/app_config').appconfig;
global.mongoconfig = require('./config/app_config').mongoconfig;

exports.app = http.createServer(function (req, res) {
  router.route( req, res );
}).listen(8099, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8099/');
