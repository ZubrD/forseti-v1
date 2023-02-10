const express = require("express");
const Pool = require("pg").Pool;
const config = require('config')

const router = express.Router({ mergeParams: true });
const pool = new Pool(config.get('connectDb'))

router.get("/", (request, response) => {
    pool.query(
      "SELECT * FROM public.forseti_deputy ORDER BY id ASC",
      (error, results) => {
        if (error) {
          console.log('Что-то не так с запросом getDeputy', error);
        }
        response.status(200).json(results.rows)
      }
    );
    // pool.end()  
});

module.exports = router;