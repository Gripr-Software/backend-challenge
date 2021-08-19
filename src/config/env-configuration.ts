import * as Joi from "joi";

export const validationSchema = Joi.object({
  //system common
  ENV: Joi.string().default("development"),
  API_SECRET: Joi.string().required(),
  USER_INVITE_SECRET: Joi.string().required(),
  PORT: Joi.number().required(),
  FE_URL: Joi.string().default("https://app.godigital.no"),
  NOREPLY_EMAIL: Joi.string().default("noreply@gosys.no"),
  API_AUTH_JWT_EXPIRES_IN: Joi.number().default(900),

  //Auth0
  AUTH0_CLIENT_ID: Joi.string().required(),
  AUTH0_CLIENT_SECRET: Joi.string().required(),
  AUTH0_DOMAIN: Joi.string().required(),
  AUTH0_AUDIENCE: Joi.string().default("https://v3api.azurewebsites.net/"),

  //DB
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_PORT: Joi.string().default(5432),
  DATABASE_SYNC: Joi.string().valid("true", "false").required(),
  DATABASE_USERNAME: Joi.string().required(),

});
