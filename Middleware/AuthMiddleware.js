const joi = require('joi');

const singnupValidation = (req, res, next) => {
    const rules = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    })

    const { error } = rules.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Bad requset", error });
    }

    next();

}


module.exports = {
    singnupValidation
}