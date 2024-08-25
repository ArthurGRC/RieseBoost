const LoginInput = ({
  type,
  name,
  id,
  placeholder,
  autoComplete,
}: {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  autoComplete?: string;
}) => {
  return (
    <div className="my-2">
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="font-kanit block w-full h-12 text-center rounded-xl py-1.5 text-gray-900 focus:outline-none focus:border-transparent"
      />
    </div>
  );
};

export default LoginInput;
