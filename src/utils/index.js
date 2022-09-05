/*
 * @Author: 一只小闷闷 979070814@qq.com
 * @Date: 2022-09-05 18:31:42
 * @LastEditors: 一只小闷闷 979070814@qq.com
 * @LastEditTime: 2022-09-05 20:15:03
 * @FilePath: \微信天气公众号\src\utils\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const axios = require("axios");

const formateWeek = (week) => {
  switch (week) {
    case 1:
      return "星期一";
      break;
    case 2:
      return "星期二";
      break;
    case 3:
      return "星期三";
      break;
    case 4:
      return "星期四";
      break;
    case 5:
      return "星期五";
      break;
    case 6:
      return "星期六";
      break;
    case 0:
      return "星期日";
      break;
    default:
      break;
  }
};

// 获取时间
const getDate = () => {
  // xxxx年xx月xx日 xx 星期x
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const week = new Date().getDay();
  const afterFormatWeek = formateWeek(week);
  return `今天是${year}年${month}月${day}日 ${afterFormatWeek}`;
};

// 获取天气
const getWeather = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://yiketianqi.com/api?unescape=1&version=v6&appid=85189345&appsecret=6aZ8SlJ9&cityid=101071001`)
      .then((res) => {
        const { data } = res;
        resolve({
          low: data.tem2,
          high: data.tem1,
          now: data.tem,
          weather: data.wea,
          humidity: data.humidity,
          win: data.win,
          win_speed: data.win_speed,
          air_level: data.air_level,
          air_pm25: data.air_pm25,
          air_tips: data.air_tips,
        });
        // console.log(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  // `https://www.tianqiapi.com/index/doc?version=v6`;
  // const cityId = "101071001";
};

// 获取情话
const getLoveWords = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://api.tianapi.com/saylove/index?key=ccd46de3f012aea1f33c641a810fa6e2`)
      .then((res) => {
        const {
          data: { newslist },
        } = res;
        resolve(newslist[0].content);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// console.log(getDate());
// getWeather();

module.exports = {
  getDate,
  getWeather,
  getLoveWords,
};
