import { z } from 'zod';

export const idAndNoteIdParamSchema = {
  paramsSchema: z.strictObject({
    id: z.string().uuid(),
    noteId: z.string().uuid()
  })
};

export const createCollectionPayloadSchema = z.strictObject({
  name: z.string()
});
export const createCollectionSchema = {
  bodySchema: createCollectionPayloadSchema
};

export const updateCollectionParamsSchema = z.strictObject({
  id: z.string().uuid()
});
export const updateCollectionSchema = {
  paramsSchema: updateCollectionParamsSchema,
  bodySchema: createCollectionPayloadSchema
};
