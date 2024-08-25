'use client';

import Logo from '@/public/assets/logo.png';
import LoginInput from '@/src/components/Input/login';
import Image from 'next/image';

const Home = () => {
  const state = Math.floor(Math.random() * 100000);
  const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&state=${state}`;

  return (
    <div className="flex h-screen flex-col justify-center items-center bg-rbGray">
      <div className="bg-rbGrey w-4/12 rounded-2xl px-5 py-5 border">
        <div className="flex flex-col justify-center items-center">
          <Image src={Logo} alt="Logotipo" height={100} quality={100} />
          <h2 className="font-kanit text-center text-4xl font-bold leading-9 tracking-tight text-rbGray">
            Riese Boost
          </h2>
        </div>

        <div className="mt-10 w-full">
          <form id="form" className="space-y-6" action="#">
            <LoginInput type="email" name="email" id="email" placeholder="Insira seu email" autoComplete="email" />
            <LoginInput
              type="password"
              name="password"
              id="password"
              placeholder="Insira sua senha"
              autoComplete="currentPassword"
            />
            <hr />
            <div>
              <button
                type="submit"
                className="flex w-full h-14 items-center justify-center rounded-lg bg-rbGray px-3 py-1.5 text-lg font-semibold leading-6 text-white hover:bg-rbFordDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
