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

var check = require('validator').check,
  sanitize = require('validator').sanitize;

var models = require("models");
var User = models.User;
var Loginrecord = models.LoginRecord;

//var RedisStore = require('connect-redis');

var redis = require("redis");
const session_client = redis.createClient();
const redis_client = redis.createClient();
//const test_c = redis.createClient();
/**
 * 手机客户端通过此方法上传采集到的数据
 * 此方法是实时的，主要用于用户实时定位
 * 接收的数据量较小，但是频率比较高
 * 接收的URI格式为：rtdata?token=504ca79689fdda581f000001&data={"id":"3242",.....}
 * @param req
 * @param res
 */
exports.freeway = function(req, res){
  var query = url.parse(req.url).query;
  var token = qs.parse(query)['token'];
  var point = qs.parse(query)['point'];

  session_client.get(token, function(err, reply) {
    // reply is null when the key is missing
    if(reply === null){  //如果用户在移动客户端的session中不存在，则检查此用户是否已注册
      User.findOne({ '_id': token }, function(err, user){
        if(err){  //出错处理
          console.log('err:'+err);
        }
        if(!user){  //此用户未注册
          res.writeHead(404, {"Content-Type": "application/json"});
//  res.write("token:"+token+'#'+'data:'+data);  //要定义返回格式
          res.end();
        }
        //key:用户id，value:用户对象的字符串格式
        var userid = user._id;
        var userstr = JSON.stringify(user);
        session_client.set(userid, userstr);
      });
    }else{  //如果用户在移动客户端的session中已存在，则发布接收的GPS数据
      //  redis_client.set("public_points", data, redis.print);
      var lng = point.split(',')[0];
      var lat = point.split(',')[0];
      var data = {"user":[], "point":[lng,lat], "orgin": []};
      var datastr = JSON.stringify(data);
      redis_client.publish("public_points", datastr, redis.print);
    }
    console.log(reply);
  });

  redis_client.set("uid", "token", redis.print);


//  test_c.on("message", function (channel, message) {
//    console.log("test_c channel " + channel + ": " + message);
//  });
//  test_c.subscribe("public_points");

  console.log("token:"+token+'#'+'data:'+data);
  res.writeHead(200, {"Content-Type": "text/html"});
//  res.write("token:"+token+'#'+'data:'+data);  //要定义返回格式
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