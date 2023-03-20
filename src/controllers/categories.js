const { pool } = require("../connection")

const listCategories = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categorias');

    return res.json(rows);

  } catch (error) {
    return res.status(500).json(error.message)
  }
}
 
module.exports = {
  listCategories
}