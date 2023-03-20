const { pool } = require("../connection");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json("Nao autorizado.");
    }

    try {
        const token = authorization.split(" ")[1];

        const { id } = jwt.verify(token, secret);

        const loginQuery = "SELECT * FROM usuarios WHERE id = $1"
        const { rowCount, rows } = await pool.query(loginQuery, [id]);

        if (rowCount <= 0) {
            return res.status(401).json("Nao autorizado.");
        }

        const { password: _, ...userData } = rows[0]

        req.user = userData;


        next();
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    authenticate
}