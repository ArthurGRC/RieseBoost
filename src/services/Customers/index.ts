import { baseApi } from '@/src/redux/baseApi';
import { Customer } from '@/src/types/customer';

const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginCustomer: builder.mutation<void, Customer>({
      query: ({ email, password, rememberMe }: Customer) => ({
        url: '/login',
        method: 'POST',
        body: { email, password, rememberMe },
      }),
      invalidatesTags: ['Customers'],
    }),
  }),
});

export const { useLoginCustomerMutation } = extendedApi;
