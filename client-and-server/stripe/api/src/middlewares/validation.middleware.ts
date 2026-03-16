import { Request } from 'express';
import { z, ZodArray, ZodError, ZodIssueCode, ZodObject, ZodRawShape } from 'zod';
import ApiError from '../errors/api.error';
import logger from '../logger';

export type StrictZodObject = ZodObject<ZodRawShape, 'strict'> | ZodArray<any, 'many'>;

export type Schema<
  Headers extends StrictZodObject | undefined = undefined,
  Params extends StrictZodObject | undefined = undefined,
  Query extends StrictZodObject | undefined = undefined,
  Body extends StrictZodObject | undefined = undefined
> = {
  headerSchema?: Headers;
  paramsSchema?: Params;
  querySchema?: Query;
  bodySchema?: Body;
};

type InferOrUndefined<T> = T extends StrictZodObject ? z.infer<T> : undefined;

type ValidateRouteResult<
  Headers extends StrictZodObject | undefined,
  Params extends StrictZodObject | undefined,
  Query extends StrictZodObject | undefined,
  Body extends StrictZodObject | undefined
> = {
  headers: InferOrUndefined<Headers>;
  params: InferOrUndefined<Params>;
  query: InferOrUndefined<Query>;
  body: InferOrUndefined<Body>;
};

type ParseWithSchemaType<Schema extends StrictZodObject> = {
  data: unknown;
  schema: Schema;
  errorMessage?: string;
};

export function validateRoute<
  Headers extends StrictZodObject | undefined = undefined,
  Params extends StrictZodObject | undefined = undefined,
  Query extends StrictZodObject | undefined = undefined,
  Body extends StrictZodObject | undefined = undefined
>(props: {
  schema: Schema<Headers, Params, Query, Body>;
  req: Request;
}): ValidateRouteResult<Headers, Params, Query, Body> {
  const { schema, req } = props;
  const { headerSchema, paramsSchema, querySchema, bodySchema } = schema;

  const headers = headerSchema
    ? parseWithSchema({
        data: req.headers,
        schema: headerSchema,
        errorMessage: 'Unrecognized header parameters'
      })
    : undefined;

  const params = paramsSchema
    ? parseWithSchema({
        data: req.params,
        schema: paramsSchema,
        errorMessage: 'Unrecognized params parameters'
      })
    : undefined;

  const query = querySchema
    ? parseWithSchema({
        data: req.query,
        schema: querySchema,
        errorMessage: 'Unrecognized query parameters'
      })
    : undefined;

  const body = bodySchema
    ? parseWithSchema({
        data: req.body,
        schema: bodySchema,
        errorMessage: 'Unrecognized body parameters'
      })
    : undefined;

  return { headers, params, query, body } as ValidateRouteResult<
    Headers,
    Params,
    Query,
    Body
  >;
}

export function parseWithSchema<Schema extends StrictZodObject>({
  data,
  schema,
  errorMessage
}: ParseWithSchemaType<Schema>) {
  try {
    return schema.parse(data, {
      errorMap: (error, ctx) => {
        if (error.code === ZodIssueCode.unrecognized_keys && errorMessage) {
          return { message: errorMessage };
        }
        return { message: ctx.defaultError };
      }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log('validation error', error);

      throw ApiError.BadRequest(
        'Validation Error',
        error.issues.map((issue) => {
          const issueKeys = 'keys' in issue ? ' ' + issue.keys.join(', ') : '';
          return `${issue.message}${issueKeys}`;
        })
      );
    }

    throw error;
  }
}
