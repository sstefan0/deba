import * as yup from "yup";

export const addNewsSchema = yup.object({
  body: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
  }),
});

export const getNewsSchema = yup.object({
  query: yup.object({
    page: yup.number().positive().required(),
    limit: yup.number().positive().required(),
  }),
});

export const updateNewsSchema = yup.object({
  body: yup.object({
    id: yup.string().uuid().required(),
    title: yup.string(),
    description: yup.string(),
  }),
});
