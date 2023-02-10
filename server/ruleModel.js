const Pool = require("pg").Pool;
const pool = new Pool({
  user: "forseti_admin",
  host: "localhost",
  database: "forseti_db",
  password: "12345",
  // port: 3000,
});

const getRule = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM public.forseti_rules WHERE rule_number='987674-7' ORDER BY id ASC LIMIT 100"
      /* "SELECT * FROM public.forseti_rules ORDER BY id ASC LIMIT 20" */,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getRule,
};
