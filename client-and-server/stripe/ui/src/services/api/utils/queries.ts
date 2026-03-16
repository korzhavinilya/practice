import { ApiTag, EndpointBuilder } from '@/shared/services/api/baseApi';
import {
  GetEntityForIdQueryArg,
  QueryDef
} from '@/shared/services/api/utils/types';

// /**
//  * Constructs an RTK Query for a `GET /entity/{id}` endpoint.
//  */
// export function getEntityForIdQuery<
//   T,
//   QueryArg extends GetEntityForIdQueryArg = GetEntityForIdQueryArg
// >(
//   builder: EndpointBuilder,
//   query: QueryDef<QueryArg>,
//   cacheTagType: ApiTag,
//   getId: (datum: T) => string,
//   options?: QueryOptions<T, QueryArg>
// ) {
//   return builder.query<T, QueryArg>({
//     ...options,
//     query: (arg) => query(arg),
//     providesTags: (result) => {
//       if (!result) return [];

//       return getEntityTags(result, getId(result), cacheTagType);
//     }
//   });
// }
