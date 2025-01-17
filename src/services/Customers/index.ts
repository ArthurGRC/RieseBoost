import { baseApi } from '@/src/redux/baseApi';
import { Customer } from '@/src/types/customer';

const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation<void, Customer>({
      query: ({ email, password }: Customer) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Customers'],
    }),
  }),
});

export const { useCreateCustomerMutation } = extendedApi;
