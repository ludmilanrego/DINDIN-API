const { pool } = require("../connection");

const transaction = async (req, res) => {

    try {
        const usuario_id = req.user.id;
        const query = 'SELECT t.*, c.descricao as categoria_nome FROM transacoes as t JOIN categorias as c on c.id = t.categoria_id WHERE t.usuario_id = $1'
        const { rows } = await pool.query(query, [usuario_id]);

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const getTransactionById = async (req, res) => {
    const id = Number(req.params.id);

    const query =
        "SELECT t.*, c.descricao as categoria_nome FROM transacoes as t JOIN categorias as c on c.id = t.categoria_id WHERE t.id = $1 and t.usuario_id = $2;"

    const { rowCount, rows } = await pool.query(query, [id, req.user.id]);

    if (rowCount <= 0) {
        return res.status(400).json("Transação nao encontrada");
    }

    return res.status(200).json(rows[0]);
}

const createTransaction = async (req, res) => {
    const {
        descricao,
        valor,
        data,
        categoria_id,
        tipo
    } = req.body

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json("Todos os campos obrigatórios devem ser informados.");
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
        return res.status(400).json("descrição de tipo inválida.");
    }

    const insertQuery = "INSERT INTO transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const { rows } = await pool.query(insertQuery, [
        descricao,
        valor,
        data,
        categoria_id,
        tipo,
        req.user.id
    ]);

    const transactionId = rows[0].id

    const query =
        "SELECT t.*, c.descricao FROM transacoes as t LEFT JOIN categorias as c on c.id = t.categoria_id WHERE t.id = $1 and t.usuario_id = $2;"

    const { rowCount: transactionRowCount, rows: transactions } = await pool.query(query, [transactionId, req.user.id]);


    if (transactionRowCount <= 0) {
        return res.status(500).json("Falha no cadastro de transação");
    }

    return res.status(200).json(transactions[0]);
}

const updateTransaction = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const usuario_id = req.user.id;
    const id = Number(req.params.id);

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json("Todos os campos são obrigatorios.");
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
        return res.status(400).json("Escolha 'entrada' ou 'saida' como o tipo de transação");
    }

    const { rows } = await pool.query('SELECT * FROM transacoes WHERE usuario_id = $1', [usuario_id]);

    if (rows.length === 0) {
        return res.status(400).json("O usuário não possui transações cadastradas.");
    }

    await pool.query('UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6', [descricao, valor, data, categoria_id, tipo, id]);

    return res.status(204).json();

}

const getBankStatement = async (req, res) => {
    const query =
        "SELECT tipo, SUM(valor) FROM transacoes WHERE usuario_id = $1 GROUP BY tipo;"

    const { rows } = await pool.query(query, [req.user.id]);

    const income = rows.find((row) => {
        return row.tipo === 'entrada';
    });

    const outcome = rows.find((row) => {
        return row.tipo === 'saida';
    });

    const bankStatementMensage = { "entrada": (!income ? 0 : income.sum), "saida": (!outcome ? 0 : outcome.sum) }

    return res.status(200).json(bankStatementMensage);
}

const deleteTransaction = async (req, res) => {
    const id = Number(req.params.id);

    try {
        await pool.query('DELETE  FROM transacoes WHERE id = $1', [id]);

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json(error.message)
    }
}


module.exports = {
    transaction,
    getTransactionById,
    createTransaction,
    getBankStatement,
    updateTransaction,
    deleteTransaction
}