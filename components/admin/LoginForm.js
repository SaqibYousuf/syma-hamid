"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Alert, Button, Field, Input, api } from "./ui";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Alert>{error}</Alert>
      <Field label="Username">
        <Input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" autoFocus required />
      </Field>
      <Field label="Password">
        <div className="relative">
          <Input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center text-[#8A8478] hover:text-[#1C2E22]"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </Field>
      <Button type="submit" loading={loading} className="w-full">
        Sign in
      </Button>
    </form>
  );
}
