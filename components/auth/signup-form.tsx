"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignupForm() {
  const [form, setForm] = useState<{
    email: string;
    password: string;
    confirm_password: string;
  }>({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // add logic
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
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm Password</Label>
          </div>
          <Input
            value={form.confirm_password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, confirm_password: e.target.value }))
            }
            id="confirm-password"
            type="password"
            required
          />
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Create account"}
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
}
