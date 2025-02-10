import { baseApi } from '@/src/redux/baseApi';
import { ForgotPassword } from '@/src/types/forgotPassword';

const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation<void, ForgotPassword>({
      query: ({ email }: ForgotPassword) => ({
        url: '/forgotPassword/sendEmail',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['ForgotPassword'],
    }),
    resetPassword: builder.mutation<void, ForgotPassword>({
      query: ({ token, password, confirmPassword }: ForgotPassword) => ({
        url: '/forgotPassword/resetPassword',
        method: 'POST',
        body: { token, password, confirmPassword },
      }),
      invalidatesTags: ['ForgotPassword'],
    }),
  }),
});

export const { useSendEmailMutation, useResetPasswordMutation } = extendedApi;
