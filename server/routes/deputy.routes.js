const express = require("express");
const pgQuery = require('postgresql-query')
const connection = require("../config/default.json");

pgQuery.config(connection.connectViaPgQueries); // Соединение с базой через postgresql-query
const router = express.Router({ mergeParams: true });

router.get("/deputies-total-list", async (request, response)=>{
  const selectDeputies = "SELECT * FROM public.forseti_deputy ORDER BY id ASC"
  const deputiesList = await pgQuery.query(selectDeputies)
  response.status(200).send(deputiesList)
})
router.get("/:deputyName", async (request, response)=> {
  try{
    const {deputyName}=request.params
    console.log(deputyName)
    response.status(200).send(deputyName)
  } catch(error){

  }
})

module.exports = router;