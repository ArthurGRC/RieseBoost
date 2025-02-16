import { baseApi } from '@/src/redux/baseApi';

const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSession: builder.query<any, void>({
      query: () => '/userSession',
      providesTags: ['session'],
    }),
  }),
});

export const { useGetUserSessionQuery } = extendedApi;
