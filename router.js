/**
 * Author: DolphinBoy
 * Date: 12-11-14
 * Time: 下午7:08
 * Description:
 */
var url = require("url");
var sensor = require('./src/action/sensor_action');

var handle = {};
handle["/rtdata"] = sensor.freeway;
handle["/updata"] = sensor.uploadData;
handle["/dwdata"] = sensor.downLoadData;

//这个应该是扫描的

exports.route = function(req, res){
  var pathname = url.parse(req.url).pathname;
  console.log("About to route a pathname for " + pathname);
  var requri = url.parse(req.url).query;
  console.log("About to route a query for " + requri);

  if (typeof handle[pathname] === 'function') {
    handle[pathname](req, res);
  } else {
    console.log("No request handler found for " + pathname);
    res.writeHead(404, {"Content-Type": "application/json"});
    res.write("404");  //要定义返回格式
    res.end();
  }
};
