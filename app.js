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

//exports.app = http.createServer(function (req, res) {
//  router.route( req, res );
//}).listen(8099, '192.168.1.104');
exports.app = http.createServer(function (req, res) {
  router.route( req, res );
}).listen(8099, function(){
    console.log("Express server listening on port 8099");
});
