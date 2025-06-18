"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signin } from "@/actions/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function SigninForm() {
  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error, message } = await signin(form.email, form.password);
      if (error) setError(message || "An error occurred");
      router.push("/");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        {error && (
          <h1 className="text-destructive text-sm text-center">{error}</h1>
        )}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            id="email"
            type="email"
            placeholder=""
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            id="password"
            type="password"
            required
          />
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Sign in"}
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}
