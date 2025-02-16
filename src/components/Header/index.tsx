'use client';

import { useState, useEffect } from 'react';

import Title from '@/components/Title';
import { useGetUserSessionQuery } from '@/src/services/Session';

import { Avatar, AvatarFallback, AvatarImage } from '../Ui/avatar';

function Header() {
  const { data, error } = useGetUserSessionQuery();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (data) {
      if (data?.client?.lastLoginTime) {
        const elapsedMinutes = (Date.now() - new Date(data.client.lastLoginTime).getTime()) / (1000 * 60);
        setShowWelcome(elapsedMinutes < 10);
      }
    }
  }, [data]);

  return (
    <div className="w-full flex justify-between items-center pr-5 my-5">
      {error ? (
        <div>Usuário não está logado</div>
      ) : showWelcome ? (
        <Title content={`Bem-vindo, ${data?.client.name.split(' ')[0]} 👋🏻`} />
      ) : (
        <div />
      )}
      <div className="flex gap-2">
        <div className="flex flex-col gap-1 justify-center items-end">
          <p className="text-xs text-rbGrey">example@email.com</p>
          <h1 className="text-black text-sm font-bold">User name</h1>
        </div>
        <Avatar>
          <AvatarImage />
          <AvatarFallback className="bg-rbSilver">RB</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
