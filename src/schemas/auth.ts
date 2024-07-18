import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password can only contain alphanumeric characters",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  name: Joi.string().min(1).required().messages({
    "string.min": "Name must be at least 1 character long",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
});

export const signInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password can only contain alphanumeric characters",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
});

export const requestPasswordResetSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
});

export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required()
    .messages({
      "string.min": "New password must be at least 6 characters long",
      "string.pattern.base":
        "New password can only contain alphanumeric characters",
      "string.empty": "New password is required",
      "any.required": "New password is required",
    }),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required()
    .messages({
      "string.min": "Current password must be at least 6 characters long",
      "string.pattern.base":
        "Current password can only contain alphanumeric characters",
      "string.empty": "Current password is required",
      "any.required": "Current password is required",
    }),
  newPassword: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required()
    .messages({
      "string.min": "New password must be at least 6 characters long",
      "string.pattern.base":
        "New password can only contain alphanumeric characters",
      "string.empty": "New password is required",
      "any.required": "New password is required",
    }),
});
