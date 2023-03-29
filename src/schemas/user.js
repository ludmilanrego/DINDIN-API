const joi = require("joi");

const createUserSchema = joi.object({
    nome: joi.string().required()
        .messages({
            'any.required': 'O Preenchimento do campo Nome é obrigatório',
            'string.empty': 'O Preenchimento do campo Nome é obrigatório'
        })
    ,
    email: joi.string().email().required()
        .messages({
            'any.required': 'O Preenchimento do campo E-mail é obrigatório',
            'string.empty': 'O Preenchimento do campo E-mail é obrigatório',
            'string.email': 'O E-mail deve ser preenchido com um formato válido'
        })
    ,
    senha: joi.string().min(6).required()
        .messages({
            'any.required': 'O Preenchimento do campo Senha é obrigatório',
            'string.empty': 'O Preenchimento do campo Senha é obrigatório',
            'string.min': 'A senha deve ter 6 ou mais caracteres'
        })
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

module.exports = { createUserSchema, loginUserSchema }