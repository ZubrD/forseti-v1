const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const pgQuery = require('postgresql-query')
const connection = require("../config/default.json");
const tokenService = require("../services/token.service");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query

const router = express.Router({ mergeParams: true });
router.post("/signUp", [
  check("email", "Некорректный емэйл").isEmail(),
  check("password", "Миниимальная длина пароля 8 символов").isLength({
    min: 8,
  }),
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          error: {
            message: "INVALID_REGISTER_DATA",
            code: 400,
            // errors: errors.array(),
          },
        });
      }

      const { email, username, password } = request.body;

      const hashedPassword = await bcrypt.hash(password, 12);
      const myId = uuidv4();
      const tokens = tokenService.generate({ myId: myId });

      const newUserQueryText =
        "INSERT INTO public.auth_user (password, username, email, my_id) VALUES ($1, $2, $3, $4)";
      const newUserQueryValues = [hashedPassword, username, email, myId];

      const tokenQueryText =
        "INSERT INTO public.tokens (user_id, refresh_token) VALUES ($1, $2)";
      const tokenQueryValues = [myId, tokens.refreshToken];

      await pgQuery.query(newUserQueryText, newUserQueryValues); // Создание нового пользователя
      await pgQuery.query(tokenQueryText, tokenQueryValues); // Сохранение refreshToken в таблице tokens
      response
        .status(201)
        .send({ Пользователь: username, userId: myId, ...tokens });
    } catch (error) {
      console.log("Что-то не так с регистрацией:", error.message);
      return response.status(400).json({
        error: {
          message: "USER_EXISTS",
          code: 400,
        },
      });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "Email некорректный").normalizeEmail().isEmail(),
  check("password", "Пароль не может быть пустым").exists(),
  async (request, response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({
          error: {
            message: "INVALID_EMAIL_LOGIN_DATA",
            code: 400,
          },
        });
      }

      const { email, password } = request.body;

      const existingUserText = `SELECT * FROM public.auth_user WHERE email=$1 ORDER BY id ASC`;
      const existingUserValue = [email];
      const existingUser = await pgQuery.query(
        existingUserText,
        existingUserValue
      );

      if (existingUser.length === 0) {
        return response.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const passwordsIsEqual = await bcrypt.compare(
        password,
        existingUser[0].password
      );

      if (!passwordsIsEqual) {
        return response.status(400).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
            errors: errors.array(),
          },
        });
      }

      const tokens = tokenService.generate({ myId: existingUser[0].my_id });
      const updateRefreshQueryText =
        "UPDATE public.tokens SET refresh_token=$1 WHERE user_id=$2";
      const updateRefreshQueryValue = [
        tokens.refreshToken,
        existingUser[0].my_id,
      ];
      await pgQuery.query(updateRefreshQueryText, updateRefreshQueryValue);

      response.status(201).send({
        Пользователь: existingUser[0].username,
        userId: existingUser[0].my_id,
        ...tokens,
      });
    } catch (error) {
      console.log("Что-то не так с входом на сайт:", error.message);
      response.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже.",
      });
    }
  },
]);

router.post("/token", async (request, response) => {
  try {
    const { refresh_token: refreshToken } = request.body;
    const data = tokenService.validateRefresh(refreshToken);
    const getTokenText = "SELECT * FROM public.tokens WHERE refresh_token = $1";
    const getTokenValues = [refreshToken];
    const tokenData = await pgQuery.query(getTokenText, getTokenValues);

    if (
      !data ||
      !tokenData ||
      data.myId !== tokenData[0]?.user_id?.toString()
    ) {
      //[0] - потому что ответ от базы - массив
      return response.status(401).json({ message: "Unathorized" });
    }

    const tokens = tokenService.generate({ myId: tokenData[0].user_id });
    const updateRefreshText =
      "UPDATE public.tokens SET refresh_token=$1 WHERE user_id=$2";
    const updateRefreshValue = [tokens.refreshToken, tokenData[0].user_id];
    await pgQuery.query(updateRefreshText, updateRefreshValue);

    response
      .status(200)
      .send({ Пользователь: tokenData[0].user_id, tokens: tokens });
  } catch (error) {
    console.log("Что-то не так с входом на сайт:", error.message);
    response.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже.",
    });
  }
});

module.exports = router;