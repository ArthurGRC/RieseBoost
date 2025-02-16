import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

function LoginInput({
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
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="my-4">
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="font-semibold block w-96 h-12 text-left rounded-full py-1.5 pl-4 pr-12 text-rbSeasalt placeholder-rbSeasalt bg-rbGray focus:ring-0"
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-4 flex items-center text-rbSeasalt"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>

      {error && <p className="text-left text-sm font-semibold text-rbRed mt-2">{error.message}</p>}
    </div>
  );
}

export default LoginInput;
