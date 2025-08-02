import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [showSignIn, setShowSignIn] = useState(true);
  const navigate = useNavigate();

  const onLogin = () => {
    navigate({
      to: "/app",
    });
  };

  return showSignIn ? (
    <SignInForm
      onSwitchToSignUp={() => setShowSignIn(false)}
      onLogin={onLogin}
    />
  ) : (
    <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
  );
}
