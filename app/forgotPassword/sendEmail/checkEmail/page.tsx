'use client';

import Logo from '@/public/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { Inbox } from 'lucide-react'

const CheckEmail = () => (
  <div className="min-h-screen flex items-center justify-center bg-rbSilver-to-seasalt">
    <div className="flex flex-col items-center text-center">
      <div className="flex flex-col items-center pb-20">
        <div className='flex items-center'>
          <Image src={Logo} alt="Logotipo" height={100} quality={100} />
          <h2 className="text-4xl font-bold leading-9 tracking-tight text-rbNight">
            Cheque seu email
          </h2>
        </div>
        <p className='text-sm text-rbGray text-wrap w-96'>
          Entre no seu email e acesse o link fornecido para redefinir sua senha. Caso você não tenha recebido o email, entre em contato com o suporte
        </p>
      </div>

      < Inbox className='text-rbLightCoral w-40 h-40'/>
  
      <div className='flex flex-col items-center pt-24'>
        <Link 
          href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_SUPPORT_NUMBER}&text=VIm%20pelo%20Riese%20Boost%20e%20preciso%20de%20ajuda`} 
          className='flex justify-center items-center w-80 h-12 font-bold bg-rbDavysGray text-rbSeasalt rounded-full mb-2 hover:text-rbLightCoral' 
        >
          Contatar o suporte
        </Link>
      </div>
    </div>
  </div>
);

export default CheckEmail;
