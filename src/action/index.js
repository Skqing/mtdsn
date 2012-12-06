/**
 * Author: DolphinBoy
 * Date: 12-11-14
 * Time: 下午7:11
 * Description:
 */

var fs = require('fs');

module.exports = (function (){
  var utils = {};
  var list = fs.readdirSync(__dirname);  //奇怪了这里的 __dirname 不能用我的全局变量--global.BASEDIR 不理解
  list.forEach(function(item, index, arr){
    var isFile = fs.statSync(__dirname + '/' + item).isFile();
    if (isFile && item !== 'index.js'){
      utils[item.substring(0, item.length-3)] = require(__dirname + '/' + item);
    }
  });
  return utils;
})();