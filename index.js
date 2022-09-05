/*
 * @Author: 一只小闷闷 979070814@qq.com
 * @Date: 2022-09-05 13:49:01
 * @LastEditors: 一只小闷闷 979070814@qq.com
 * @LastEditTime: 2022-09-05 22:09:49
 * @FilePath: \微信天气公众号\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { params } = require("./src/config/config");
const { getToken } = require("./src/getToken");
const { sendMessage } = require("./src/sendMessage");
const { getDate, getWeather, getLoveWords } = require("./src/utils");
let birthDate = 175;
const start = async () => {
  let access_token = await getToken(params);
  let { low, high, now, weather, humidity, win, win_speed, air_level, air_pm25, air_tips } = await getWeather();
  let loveWords = await getLoveWords();
  let year = new Date().getFullYear();
  if (birthDate == 0) {
    loveWords = "生日快乐，今天的你格外帅气，一定要永远开心，永远18岁，你无可挑剔";
  }
  const data = {
    nowDate: {
      value: getDate(),
      color: "#EE2230",
    },
    city: {
      value: "辽阳",
      color: "#F20BB4",
    },
    weather: {
      value: weather,
      color: "#AC06B6",
    },
    now: {
      value: now,
      color: "#6C18DF",
    },
    low: {
      value: low,
      color: "#6C18DF",
    },
    high: {
      value: high,
      color: "#6C18DF",
    },
    humidity: {
      value: humidity,
      color: "#3128F6",
    },
    win: {
      value: win,
      color: "#1BD1EC",
    },
    win_speed: {
      value: win_speed,
      color: "#1BD1EC",
    },
    air_level: {
      value: air_level,
      color: "#1BECC7",
    },
    pm25: {
      value: `${air_pm25}`,
      color: "#1BEC73",
    },
    air_tips: {
      value: air_tips,
      color: "#e965bf",
    },
    birthDate: {
      value: `${birthDate}`,
      color: "#5B5B5B",
    },
    txt: {
      value: loveWords,
      color: "#E8611E",
    },
  };
  console.log(data);
  sendMessage({
    access_token,
    ...params,
    data,
  })
    .then((res) => {
      // console.log(res);
      if (res.data && res.data.errcode) {
        console.log("发送失败", res);
        return;
      }
      console.log("发送成功，去微信查看消息");
      if (birthDate > 0) {
        birthDate--;
      } else {
        if ((0 == year % 4 && year % 100 != 0) || 0 == year % 400) {
          birthDate += 366;
        } else {
          birthDate += 365;
        }
      }
    })
    .catch((err) => {
      console.log("发送失败", err);
    });
};

start();

// start();
// getToken(params);
