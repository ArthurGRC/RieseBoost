'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';

import CheckBoxInput from '@/components/Input/CheckBox';
import LoginInput from '@/components/Input/login';
import CircleLoader from '@/components/loaders/CircleLoader';
import Logo from '@/public/assets/logo.png';
import GenericError from '@/src/components/Error';
import { useLoginCustomerMutation } from '@/src/services/Customers';
import { DataFiltered } from '@/src/types/customer';
import { DataError, DataErrorFiltered } from '@/types/redux';

function Home() {
  const state = Math.floor(Math.random() * 100000);
  const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&state=${state}`;
  const [loginCustomer, { error, isLoading }] = useLoginCustomerMutation();

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const user = Object.fromEntries(formData);

      loginCustomer(user)
        .unwrap()
        .then(() => {
          window.location.href = authUrl;
        });
    },
    [loginCustomer, authUrl],
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-rbSilver-to-seasalt">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center pb-20">
          <Image src={Logo} alt="Logotipo" height={100} quality={100} />
          <h2 className="text-4xl font-bold leading-9 tracking-tight text-rbNight">Riese Boost</h2>
        </div>

        <form id="form" onSubmit={handleSubmit} className="w-96">
          <LoginInput
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            error={filteredErrors?.email}
          />
          <LoginInput
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            autoComplete="currentPassword"
            error={filteredErrors?.password}
          />

          <GenericError error={!filteredErrors && error} />

          <div className="flex gap-2 items-center pb-24">
            <CheckBoxInput id="rememberMe" name="rememberMe" />
            <p className="font-bold text-rbGray">Permanecer conectado</p>
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="flex justify-center items-center w-80 h-12 font-bold bg-rbDavysGray text-rbSeasalt rounded-full mb-2 hover:text-rbLightCoral"
            >
              {isLoading ? <CircleLoader width={30} height={30} color="#F28C8C" secondaryColor="rbGray" /> : 'Entrar'}
            </button>
            <Link href="/forgotPassword/sendEmail" className="text-rbGray text-sm">
              Esqueceu sua senha?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
