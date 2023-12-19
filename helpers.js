const axios = require("axios");

const BOT_TOKEN = "6706934976:AAGrz5Z78fu7JMjiihN7H60bX7nfBsTWm2M";
const CHAT_ID = "-1002043998874";
const sendToTelegram = (error) => {
  axios
    .post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: JSON.stringify(error),
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = {sendToTelegram}
