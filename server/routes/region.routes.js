const express = require("express");
const pgQuery = require('postgresql-query')
const connection = require("../config/default.json");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query
const router = express.Router({ mergeParams: true });

router.get("/regions-total-list", async (request, response)=>{
  const selectRegions = "SELECT * FROM public.forseti_federalregion ORDER BY id ASC"
  const regionsList = await pgQuery.query(selectRegions)
  response.status(200).send(regionsList)

})

module.exports = router;