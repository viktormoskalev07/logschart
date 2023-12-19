import fetch from "node-fetch";
import fs from "fs";
import {sendToTelegram} from "./helpers.js";

const receiveData = async () => {
  try {
    const _data = await fetch(
      "https://api.duelmasters.io/api/v0/games/cash/?page=1&page_size=400",
    );
    const data = await _data.json();
    console.log(data)


    const file = "log.json"; // Замените на путь к вашему файлу

    // Функция для чтения и обновления JSON-файла
    function updateJsonFile(dataToAdd) {
      fs.readFile(file, (err, data) => {
        if (err) throw err;
        let jsonData = JSON.parse(data);

        // Проверяем, существует ли массив arr, иначе создаем его
        if (!jsonData.arr) {
          jsonData.arr = [];
        }

        // Добавляем новые данные в массив arr
        jsonData.arr.push(dataToAdd);

        // Записываем обновлённые данные обратно в файл
        fs.writeFile(file, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) throw err;
          console.log("Data added to file successfully.");
        });
      });
    }

    // Пример данных для добавления
    const newData = {
      data,
      time: new Date().toISOString(),
    };

    // Вызываем функцию
    updateJsonFile(newData);
  } catch (e) {
    sendToTelegram({text: e.message})
    console.log("err", e);
  }
};


setInterval(receiveData, 1000*60);
