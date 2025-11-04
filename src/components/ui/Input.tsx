import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
type props = {
  value: string;
  label?: string;
  placeholder: string;
  type: string;
  onChange: CallableFunction;
  outline?: boolean;
};

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type,
  outline,
}: props) => {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="space-y-2">
      <label>{label}</label>

      <div className="flex">
        <input
          className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 w-full underline-offset-0 ${
            !outline && "outline-0"
          } `}
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          name={label}
        />
        {type === "password" &&
          (showPassword ? (
            <FaRegEyeSlash
              size={22}
              onClick={toggleShowPassword}
              className="cursor-pointer m-2"
            />
          ) : (
            <FaRegEye
              size={22}
              onClick={toggleShowPassword}
              className="cursor-pointer m-2"
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
