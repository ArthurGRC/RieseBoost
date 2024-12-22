'use client';

import Logo from '@/public/assets/logo.png';
import LoginInput from '@/src/components/Input/Login';
import CheckBoxInput from '@/src/components/Input/CheckBox';
import CircleLoader from '@/src/components/loaders/circleLoader';
import { useCreateUserMutation } from '@/services/users';
import { DataError, DataErrorFiltered } from '@/types/redux';
import { DataFiltered } from '@/types/user';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';

const Home = () => {
  const state = Math.floor(Math.random() * 100000);
  const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&state=${state}`;
  const [createUser, { error, isLoading }] = useCreateUserMutation();

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
    async (e: any) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const user: any = Object.fromEntries(formData);

      createUser(user)
        .unwrap()
        .then(() => (window.location.href = authUrl));
    },
    [createUser, authUrl],
  );

  return (
    <div className="flex h-screen flex-col justify-center py-14 items-center bg-rbSilver-to-seasalt">
        <div className="flex justify-center items-center pb-20">
          <Image src={Logo} alt="Logotipo" height={100} quality={100} />
          <h2 className="text-center text-4xl font-bold leading-9 tracking-tight text-rbNight">
            Riese Boost
          </h2>
        </div>

        <form id="form" onSubmit={handleSubmit}>
          <LoginInput 
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            autoComplete='email'
            error={filteredErrors.email}
          />
          <LoginInput 
            type='password'
            name='password'
            id='password'
            placeholder='Senha'
            autoComplete='currentPassword'
            error={filteredErrors.password}
          />
          <div className='flex gap-2 items-center pb-24'>
            <CheckBoxInput id='checkboxLogin' name='checkboxLogin'/>
            <p className='font-bold text-rbGray'>Stay signed in</p>
          </div>

          <div className='flex flex-col items-center'>
            <button type='submit' className='flex justify-center items-center w-96 h-16 font-bold bg-rbDavysGray text-rbSeasalt rounded-full mb-2 hover:text-rbLightCoral'>
              {isLoading ? <CircleLoader width={30} height={30} color='#F28C8C' secondaryColor="rbGray" /> : 'SIGN IN'}
            </button>
            <a href="#" className='text-rbGray text-sm'>Forgot Password?</a>
          </div>
        </form>
    </div>
  );
};

export default Home;
