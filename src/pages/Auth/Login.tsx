import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import { loginSchema, type LoginSchemaType } from "../../shemas/LoginShema";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import image from "../../../public/favicon.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof LoginSchemaType, string>>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updateUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError(null);

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors: Partial<Record<keyof LoginSchemaType, string>> = {};

      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof LoginSchemaType;
        if (!errors[key]) errors[key] = issue.message;
      });

      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
      }

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col p-6 space-y-4 text-center">
        <div className="flex justify-center">
          <div className="p-3 bg-primary rounded-xl">
            {/* <CheckSquare className="w-8 h-8 text-white" /> */}
            <img className="w-8 h-8" src={image} alt="Images" />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold tracking-tight">TaskFlow Pro</h3>
          <p className="text-sm text-muted-foreground">
            Team task management made simple
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 w-full">
        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <div>
            <Input
              value={email}
              onChange={({ target }: { target: { value: string } }) =>
                setEmail(target.value)
              }
              label="Email address"
              placeholder="email@gmail.com"
              type="text"
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <Input
              value={password}
              onChange={({ target }: { target: { value: string } }) =>
                setPassword(target.value)
              }
              label="Password"
              placeholder="********"
              type="password"
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-md bg-primary text-white font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-primary font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
