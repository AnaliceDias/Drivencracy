import joi from "joi";

const userSchema = joi.object({
    title: joi.string().required(),
    pollId: joi.required()
});