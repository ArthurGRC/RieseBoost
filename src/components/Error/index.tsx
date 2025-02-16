function GenericError({ error }: { error: any }) {
  return (
    error && (
      <div className="flex w-96 h-16 bg-rbRed rounded-lg items-center justify-center">
        <p className=" text-rbSeasalt text-sm">
          Ocorreu um erro inesperado, entre em contato com o{' '}
          <a
            href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_SUPPORT_NUMBER}&text=VIm%20pelo%20Riese%20Boost%20e%20preciso%20de%20ajuda`}
            className="text-rb underline"
          >
            suporte
          </a>
        </p>
      </div>
    )
  );
}

export default GenericError;
