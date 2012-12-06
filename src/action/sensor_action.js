/**
 * Author: DolphinBoy
 * Date: 12-11-14
 * Time: 下午7:14
 * Description:
 */

var url = require("url");
var qs = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
/**
 * 手机客户端通过此方法上传采集到的数据
 * 此方法是实时的，主要用于用户实时定位
 * 接收的数据量较小，但是频率比较高
 * 接收的URI格式为：rtdata?token=504ca79689fdda581f000001&data={"id":"3242",.....}
 * @param req
 * @param res
 */
exports.realTimeData = function(req, res){
  var query = url.parse(req.url).query;
  var token = qs.parse(query)['token'];
  var data = qs.parse(query)['data'];

  console.log("token:"+token+'#'+'data:'+data);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("token:"+token+'#'+'data:'+data);  //要定义返回格式
  res.end();
}

/**
 * 手机客户端通过此方法上传采集到的数据
 * 此方法是只有用户使用WIFI或者手动提交的时候才调用
 * 接收的数据比较多
 * @param req
 * @param res
 */
exports.uploadData = function(req, res){
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    /* Possible error on Windows systems:
     tried to rename to an already existing file */
    fs.rename(files.upload.path, "/tmp/test.png", function(err) {
      if (err) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
      }
    });
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("received image:<br/>");
    res.write("<img src='/show' />");
    res.end();
  });
};

/**
 * 手机客户端请求此方法来从服务器下载一段时间内的数据
 * @param req
 * @param res
 */
exports.downLoadData = function(req, res){

};