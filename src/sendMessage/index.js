/*
 * @Author: 一只小闷闷 979070814@qq.com
 * @Date: 2022-09-05 18:03:56
 * @LastEditors: 一只小闷闷 979070814@qq.com
 * @LastEditTime: 2022-09-05 21:19:56
 * @FilePath: \微信天气公众号\src\sendMessage\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 *
 */
const axios = require("axios");

const sendMessage = (params) => {
  const { access_token, touser, template_id, data = {} } = params;
  return new Promise((resolve, reject) => {
    axios
      .post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`, {
        touser,
        template_id,
        data,
      })
      .then((res) => {
        resolve(res);
      });
  });
};

module.exports = {
  sendMessage,
};
