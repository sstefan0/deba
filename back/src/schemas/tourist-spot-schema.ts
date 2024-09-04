import { query } from "express";
import * as yup from "yup";

export const addSpotSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    potentialTypeId: yup.string().uuid().required(),
    lat: yup.number().min(-90).max(90),
    lon: yup.number().min(-180).max(180),
    website: yup.string().nullable(),
  }),
});

export const addVideosSchema = yup.object({
  body: yup.object({
    tourismPotentialId: yup.string().uuid().required(),
    videos: yup.array(yup.string().url()).required(),
  }),
});
export const addCoordinatesSchema = yup.object({
  body: yup.object({
    tourismPotentialId: yup.string().uuid().required(),
    coordinates: yup
      .array(
        yup.object({
          lat: yup.number().min(-90).max(90).required(),
          lon: yup.number().min(-180).max(180).required(),
        })
      )
      .required(),
  }),
});

export const getByIdSchema = yup.object({
  query: yup.object({ id: yup.string().uuid().required() }),
});

export const updateSpotSchema = yup.object({
  query: yup.object({ id: yup.string().uuid().required() }),
  body: yup.object({
    name: yup.string(),
    description: yup.string(),
    potentialTypeId: yup.string().uuid(),
    lat: yup.number().min(-90).max(90),
    lon: yup.number().min(-180).max(180),
    website: yup.string().nullable(),
  }),
});
