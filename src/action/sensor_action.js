/**
 * Author: DolphinBoy
 * Date: 12-11-14
 * Time: 下午7:14
 * Description: 主要用户数据接收：实时数据接收，移动客户端累积数据上传，历史数据下载
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
 * 接收的URI格式为：rtdata?token=504ca79689fdda581f000001&point=lng,lat&orgin=x,y,z
 * @param req
 * @param res
 */
exports.freeway = function(req, res){
  var query = url.parse(req.url).query;
  var token = qs.parse(query)['token'];
  var point = qs.parse(query)['point'];
  var orgin = qs.parse(query)['orgin'];

  /**
    这里要考虑的是用event_proxy来实现
    1.使用token检测用户是否登录，如果用户没有登录，则要求用户登录
    2.如果用户已经登录，则保存用户数据到密集型collection中，然后检查用户是否公开其坐标，如果允许则发送数据到首页
    3.检测此用户都被其他哪些用户观察，如果其他观察者有在线的，则把用户的坐标数据推送到观察者的客户端
    
  */

  session_client.get(token, function(err, reply) {
    //如果用户在移动客户端的session中不存在，则返回提示：用户未登录
    if(reply === null){  // reply is null when the key is missing
      res.writeHead(200, {"Content-Type": "text/plan"});
      res.write('nosession');  //要定义返回格式
      res.end();
    } 
    //保存用户数据到密集型collection中



    //解析接收的数据
    var lng = point.split(',')[0];
    var lat = point.split(',')[1];
    var user = JSON.parse(reply);
    var orgin_x = orgin.split(',')[0];
    var orgin_y = orgin.split(',')[1];
    var orgin_z = orgin.split(',')[2];

    var data = {"user":{"uid":user._id, "nickname":user.nickname, "avatar":user.avatar}, 
                "point":{"lng":lng, "lat":lat}, "orgin": {"x":orgin_x, "y":orgin_y, "z":orgin_z}};
    var datastr = JSON.stringify(data);
    //发布数据,格式为：{"user":{"uid":"43mk54k5kl643l", "nickname":"Zhan san", "avatar":"http://127.0.0.1/user/image/3223.png"},
            // "point":{"lng":123.21, "lat":21.54}, "orgin": {"x":32, "y":34, "z":54}};
    redis_client.publish("public_points", datastr, redis.print);
    
    console.log('publish data:'+datastr);
  });

  res.writeHead(200, {"Content-Type": "application/json"});
  res.write('aok');  //要定义返回格式
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