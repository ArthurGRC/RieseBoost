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
    <div className="my-4">
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="font-semibold block w-96 h-12 text-left rounded-full py-1.5 text-rbSeasalt placeholder-rbSeasalt bg-rbGray focus:ring-0"
      />
      {error && <p className="text-left text-sm font-semibold text-red-500 mt-2">{error.message}</p>}
    </div>
  );
};

export default LoginInput;
