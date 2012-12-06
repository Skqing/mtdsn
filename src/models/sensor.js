/**
 * Author: DolphinBoy
 * Date: 12-11-14
 * Time: 下午7:14
 * Description: 从手机客户端获取的所有传感器数据
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var SensorSchema = new Schema({
  user_id: { type: String, index: true },  //用户ID
  data_id: { type: Number },  //数据从客户端传递过来的时候的ID，不持久化
  longitude: { type: Number },  //经度
  latitude: { type: Number },  //纬度
  altitude: { type: Number },  //海拔
  accuracy: { type: Number },  //精确度
  bear: { type: Number },  //偏离正北方的度数
  speed: { type: Number },  //速度
  gpstime: { type: Date },  //GPS时间
  collect_time: { type: Date },  //采集时间
  send_time: { type: Date },  //发送时间
  create_at: { type: Date, default: Date.now }  //此条数据写入数据库时间
});

mongoose.model('Sensor', SensorSchema);