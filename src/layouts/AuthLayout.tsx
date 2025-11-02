import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="rounded-lg border bg-card text-card-foreground w-full max-w-md shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
