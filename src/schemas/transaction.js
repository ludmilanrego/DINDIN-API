const joi = require("joi");

const createTransactionSchema = joi.object({
    descricao: joi.string().required()
        .messages({
            'any.required': 'O Preenchimento do campo Descrição é obrigatório',
            'string.empty': 'O Preenchimento do campo Descrição é obrigatório'
        })
    ,
    valor: joi.number().positive().required()
        .messages({
            'any.required': 'O Preenchimento do campo Valor é obrigatório',
            'number.positive': 'Não e permitido cadastro de transação com valor negativo',
        })
    ,
    data: joi.date().required()
        .messages({
            'any.required': 'O Preenchimento do campo Data é obrigatório',
            'date.base': 'A data deve ser preenchida em um formato válido',
            'date.format': 'A data deve ser preenchida em um formato válido',
        }),
    categoria_id: joi.number().required()
        .messages({
            'any.required': 'O Preenchimento do campo Categoria é obrigatório',
        }),
    tipo: joi.string().required()
        .messages({
            'any.required': 'O Preenchimento do campo Senha é obrigatório',
            'string.empty': 'O Preenchimento do campo Senha é obrigatório',
        }),
})

const loginUserSchema = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'O Preenchimento do campo E-mail é obrigatório',
        'string.empty': 'O Preenchimento do campo E-mail é obrigatório',
        'string.email': 'O E-mail deve ser preenchido com um formato válido'
    }),
    senha: joi.string().min(6).required().messages({
        'any.required': 'O Preenchimento do campo Senha é obrigatório',
        'string.empty': 'O Preenchimento do campo Senha é obrigatório',
        'string.min': 'A senha deve ter 6 ou mais caracteres'
    })
})

module.exports = { createTransactionSchema }