/**
 * Author: DolphinBoy
 * Date: 12-11-14
 * Time: 下午7:14
 * Description: 网站的基本配置信息，大部分为静态参数
 */

exports.appconfig = {
  //base
  name: 'BirdWay',
  description: 'BirdWay 是用Node.js开发的实时定位平台',
  version: '0.0.1',

  //development
  debug : true,

  host : 'birdway.org',
  port : 80

  //security settings

};
//db settings
exports.mongoconfig = {
//url=mongodb://user:pass@127.0.0.1:27017/birdway/collection
  url: 'mongodb://127.0.0.1/birdway',
  db: 'birdway',
  collection: 'serson',
  host: '127.0.0.1',
  port: 27017,  //默认端口为27017
  username: 'md_admin',
  password: 'md_birdway_admin',
  auto_reconnect: false,
  clear_interval: -1,
  stringify: true
};

exports.redisconfig = {

};
