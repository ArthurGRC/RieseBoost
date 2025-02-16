'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import GenericError from '@/components/Error';
import LoginInput from '@/components/Input/login';
import CircleLoader from '@/components/loaders/CircleLoader';
import Logo from '@/public/assets/logo.png';
import { useResetPasswordMutation } from '@/services/ForgotPassword';
import { DataFiltered } from '@/types/customer';
import { DataError, DataErrorFiltered } from '@/types/redux';

function ResetPassword() {
  const route = useRouter();
  const [resetPassword, { error, isLoading }] = useResetPasswordMutation();

  const filteredErrors: DataFiltered = useMemo(() => {
    if (!error) return {};

    const {
      data: { errors },
    } = error as DataError;

    return errors.reduce(
      (previousValue: DataErrorFiltered, { path, message }: DataErrorFiltered) => ({
        ...previousValue,
        [path]: { message },
      }),
      {} as DataErrorFiltered,
    );
  }, [error]);

  const token = useSearchParams().get('token') || '';
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const user = Object.fromEntries(formData);

      resetPassword({ ...user, token })
        .unwrap()
        .then(() => route.push('/'));
    },
    [resetPassword],
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-rbSilver-to-seasalt">
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center pb-20">
          <div className="flex items-center">
            <Image src={Logo} alt="Logotipo" height={100} quality={100} />
            <h2 className="text-4xl font-bold leading-9 tracking-tight text-rbNight">Redefinir senha</h2>
          </div>
        </div>

        <form id="form" onSubmit={handleSubmit} className="w-96">
          <LoginInput
            type="password"
            name="password"
            id="password"
            placeholder="Nova senha"
            autoComplete="currentPassword"
            error={filteredErrors?.password}
          />
          <LoginInput
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirmar senha"
            autoComplete="currentPassword"
            error={filteredErrors?.confirmPassword}
          />

          <GenericError error={!filteredErrors && error} />

          <div className="flex flex-col items-center pt-24">
            <button
              type="submit"
              className="flex justify-center items-center w-80 h-12 font-bold bg-rbDavysGray text-rbSeasalt rounded-full mb-2 hover:text-rbLightCoral"
            >
              {isLoading ? (
                <CircleLoader width={30} height={30} color="#F28C8C" secondaryColor="rbGray" />
              ) : (
                'Redefinir'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
