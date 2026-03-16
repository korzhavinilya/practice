import { type BaseQueryArg, type BaseQueryFn } from '@reduxjs/toolkit/query';

export type QueryDef<QueryArg> = (arg: QueryArg) => BaseQueryArg<BaseQueryFn>;

export type GetEntitiesQueryArg<T extends object = object> = T & {
  page?: string;
  limit?: string;
  sort?: string;
  search?: string;
};

export interface GetEntityForIdQueryArg {
  id: string;
}

export interface UpdateEntityForIdMutationArg<T> {
  id: string;
  payload: T;
}
