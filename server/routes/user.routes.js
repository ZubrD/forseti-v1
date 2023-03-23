const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const pgQuery = require("postgresql-query");
const connection = require("../config/default.json");

pgQuery.config(connection.connectViaPgQueries);

router.get("/:userId", auth, async (request, response) => {
  try {
    const { userId } = request.params;
    const text = "SELECT * FROM public.auth_user WHERE my_id=$1";
    const value = [userId];
    const userById = await pgQuery.query(text, value);

    console.log("request.user (текущий пользователь)", request.user);
    console.log("userById (id пользователя из поисковой строки): ", userById[0]);

    if (userById.length !== 0) {
      if (request.user.myId === userById[0].my_id) {
        response.send({ "Пользователь может вносить изменения": userById[0] });
      } else {
        response.send({ "Пользователь НЕ может вносить изменения, т.к. это не тот, кто вошёл": userById[0] });
      }
    } else {
      response.status(401).send({ Запрос: "такого пользователя нет" });
    }
  } catch (error) {
    response.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/", auth, async (request, response) => {
  try {
    const getUsersText = "SELECT * FROM public.auth_user ORDER BY id DESC";
    const users = await pgQuery.query(getUsersText);
    response.send({ "Список пользователей": users });
  } catch (error) {
    response.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;