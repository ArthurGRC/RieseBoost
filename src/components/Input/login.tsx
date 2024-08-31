'use client';

const LoginInput = ({
  type,
  name,
  id,
  placeholder,
  autoComplete,
  error,
}: {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  autoComplete?: string;
  error?: {
    message: string;
  };
}) => {
  return (
    <div className="my-2">
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="font-kanit font-semibold block w-full h-12 text-center rounded-xl py-1.5 text-gray-900 outline-none border-transparent rounded-lg"
      />
      {error && <p className="text-center font-kanit font-semibold text-red-500 mt-2">{error.message}</p>}
    </div>
  );
};

export default LoginInput;
