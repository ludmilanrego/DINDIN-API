const { pool } = require("../connection")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const secret = require("../secret")

const createUser = async (req, res) => {

    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json("Nome, email e senha obrigatorios.");
    }

    try {
        const findUserQuery = "SELECT * FROM usuarios WHERE email = $1";
        const findUserParams = [email]
        const { rowCount } = await pool.query(findUserQuery, findUserParams);

        if (rowCount > 0) {
            return res.status(400).json("Já existe usuário cadastrado com o e-mail informado.");
        }

        const hashPassword = await bcrypt.hash(senha.toString(), 10);

        const insertUserQuery = "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *";
        const insertUserParam = [nome, email, hashPassword]
        const createdUser = await pool.query(insertUserQuery, insertUserParam);

        if (createdUser.rowCount <= 0) {
            return res.status(500).json("A criacao do usuario falhou");
        }

        const { senha: _, ...user } = createdUser.rows[0];

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const loginUser = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json("Email e senha obrigatorios.");
    }

    try {
        const loginQuery = "SELECT * FROM usuarios WHERE email = $1"
        const loginQueryParam = [email]
        const user = await pool.query(loginQuery, loginQueryParam);

        if (user.rowCount === 0) {
            return res.status(400).json("Email ou senha invalidos");
        }

        const validPassword = await bcrypt.compare(senha, user.rows[0].senha);

        if (!validPassword) {
            return res.status(400).json("Email ou senha invalidos");
        }

        const token = jwt.sign({ id: user.rows[0].id }, secret, { expiresIn: '4h' })

        const { senha: _, ...registredUser } = user.rows[0];

        return res.status(200).json({
            user: registredUser,
            token
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const listUser = async (req, res) => {
    const { id } = req.user;

    try {
        const { rows, rowCount } = await pool.query(
            'SELECT id, nome, email from usuarios WHERE id = $1',
            [id]
        )

        if (rowCount < 1) {
            return res.status(401).json({ mensagem: 'Não autorizado' });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const updateUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    const id = req.user.id;

    if (!nome || !email || !senha) {
        return res.status(400).json("Nome, email e senha obrigatorios.");
    }

    try {
        const { rows } = await pool.query('SELECT email, id FROM usuarios WHERE email = $1 and id = $2', [email, id]);

        if (rows[0]) {
            return res.status(400).json("O email informado já existe");
        }

        const validPassword = await bcrypt.hash(senha, 10);

        await pool.query('UPDATE usuarios SET nome = $2, email = $3, senha = $4 WHERE id = $1', [id, nome, email, validPassword]);

        return res.status(201).json()

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = {
    createUser,
    loginUser,
    listUser,
    updateUser
}