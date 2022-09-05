/*
 * @Author: 一只小闷闷 979070814@qq.com
 * @Date: 2022-09-05 14:25:00
 * @LastEditors: 一只小闷闷 979070814@qq.com
 * @LastEditTime: 2022-09-05 21:20:20
 * @FilePath: \微信天气公众号\src\getToken\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// nodejs
// axios
// moment

const axios = require("axios");
const path = require("path"); // 处理路径
const fs = require("fs"); // 读写文件，保存token
const moment = require("moment");

// 1. 获取token 读token.json是否过期
// 2. 没过期直接返回token的值
// 3. 过期了去请求公众号接口，获取新的token
// 4. 把获取到token放到json里/*  */
const getToken = (params) => {
  return new Promise((resolve, reject) => {
    const tokenFile = path.join(__dirname, "token.json");
    fs.readFile(tokenFile, "utf-8", function (err, data) {
      if (err) {
        // console.log(err);
        reject(err);
      } else {
        if (data) {
          // console.log(data);
          const token = JSON.parse(data);
          if (token.expires_in > moment().unix()) {
            resolve(token.access_token);
            return;
          }
        }
      }
      const appId = params.appId;
      const appSecret = params.appSecret;

      axios
        .get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`)
        .then((res) => {
          // console.log(res);
          if (res.data && res.data.errcode) {
            reject(data);
            return;
          }
          resolve(res.data.access_token);
          const t = res.data;
          t.expires_in = t.expires_in + moment().unix() - 1200;
          fs.writeFile(tokenFile, JSON.stringify(t), function (err) {
            if (err) {
              // console.log(err);
              reject(err);
            }
          });
        })
        .catch((err) => {
          // console.log(err);
          reject(err);
        });
    });
  });
};

module.exports = {
  getToken,
};
