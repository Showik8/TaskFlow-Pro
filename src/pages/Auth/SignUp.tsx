import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import ProfilePictureSelector from "../../components/ui/ProfilePictureSelector";
import Input from "../../components/ui/Input";
import { signupSchema, type SignUpSchemaType } from "../../shemas/signupShema";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof SignUpSchemaType, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError(null);

    const result = signupSchema.safeParse({
      profilePic,
      fullName,
      email,
      password,
      adminToken,
    });

    if (!result.success) {
      const errors: Partial<Record<keyof SignUpSchemaType, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof SignUpSchemaType;
        if (!errors[key]) errors[key] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/dashboard");
    } catch {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col p-6 space-y-4 text-center">
        <h3 className="text-2xl font-bold">Create Account</h3>
        <p className="text-sm text-muted-foreground">Join us today!</p>
      </div>

      <div className="p-6 pt-0 w-full">
        <form onSubmit={handleSignUp} className="space-y-4">
          <ProfilePictureSelector
            image={profilePic!}
            setImage={(value) => setProfilePic(value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Full Name"
                value={fullName}
                placeholder="John Doe"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFullName(e.target.value)
                }
                type="text"
              />
              {fieldErrors.fullName && (
                <p className="text-red-500 text-sm">{fieldErrors.fullName}</p>
              )}
            </div>

            <div>
              <Input
                label="Email"
                value={email}
                placeholder="email@example.com"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                type="email"
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          <Input
            label="Password"
            value={password}
            placeholder="********"
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-sm">{fieldErrors.password}</p>
          )}

          <Input
            label="Admin Token (Optional)"
            value={adminToken}
            placeholder="Enter token if admin"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAdminToken(e.target.value)
            }
            type="text"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded-md bg-primary text-white font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-center text-muted-foreground mt-4">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
