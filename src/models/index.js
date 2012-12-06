/**
 * Author: DolphinBoy
 * Date: 12-11-14
 * Time: 下午7:14
 * Description:
 */
var mongoose = require('mongoose');

mongoose.connect(global.mongoconfig.url, function(err){
  if (err) {
    console.error('connect to %s error: ', global.mongoconfig.url, err.message);
    process.exit(1);
  }
});
//global.dbconfig.url
// models
require('./sensor');


exports.Sensor = mongoose.model('Sensor');

