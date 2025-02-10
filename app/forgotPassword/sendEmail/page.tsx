'use client';

import Logo from '@/public/assets/logo.png';
import LoginInput from '@/src/components/Input/Login';
import CircleLoader from '@/src/components/loaders/circleLoader';
import { useSendEmailMutation } from '@/src/services/ForgotPassword';
import { DataError, DataErrorFiltered } from '@/types/redux';
import { DataFiltered } from '@/src/types/customer';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GenericError from '@/src/components/Error';

const SendEmail = () => {
  const route = useRouter();
  const [sendEmail, { error, isLoading }] = useSendEmailMutation();

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

      sendEmail(user)
        .unwrap()
        .then(() => route.push('/forgotPassword/sendEmail/checkEmail'));
    },
    [sendEmail],
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-rbSilver-to-seasalt">
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center pb-20">
          <div className='flex items-center'>
            <Image src={Logo} alt="Logotipo" height={100} quality={100} />
            <h2 className="text-4xl font-bold leading-9 tracking-tight text-rbNight">
              Esqueceu sua senha?
            </h2>
          </div>
          <p className='text-sm text-rbGray'>Crie uma nova agora mesmo, é super fácil!</p>
        </div>
  
        <form id="form" onSubmit={handleSubmit} className="w-96">
          <LoginInput 
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            autoComplete='email'
            error={filteredErrors?.email}
          />

          <GenericError error={!filteredErrors && error}/>
  
          <div className='flex flex-col items-center pt-24'>
            <button type='submit' className='flex justify-center items-center w-80 h-12 font-bold bg-rbDavysGray text-rbSeasalt rounded-full mb-2 hover:text-rbLightCoral'>
              {isLoading ? <CircleLoader width={30} height={30} color='#F28C8C' secondaryColor="rbGray" /> : 'Recuperar Senha'}
            </button>
            <Link href="/" className="text-rbLightCoral text-sm">
              Voltar para o login
            </Link>          
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default SendEmail;
