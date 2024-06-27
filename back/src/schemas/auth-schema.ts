import { Role } from "@prisma/client";
import { PassThrough } from "stream";
import * as yup from "yup";

export const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
});

export const registerSchema = yup.object({
  body: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    role: yup.string().oneOf([Role.ADMIN, Role.USER]).required(),
  }),
});

export const forgotPasswordSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
  }),
});

export const resetPasswordSchema = yup.object({
  body: yup.object({
    password: yup.string().min(8).required(),
    token: yup.string().required(),
  }),
});
