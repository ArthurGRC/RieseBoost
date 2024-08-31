import { baseApi } from '@/src/redux/baseApi';
import { User } from '@/src/types/user';

const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<void, User>({
      query: ({ email, password }: User) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Users']
    }),
  }),
});

export const { useCreateUserMutation } = extendedApi;
