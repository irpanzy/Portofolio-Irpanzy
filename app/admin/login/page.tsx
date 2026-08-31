"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/store";
import axiosInstance from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isRemembered = localStorage.getItem("admin_remember_me") === "true";
    if (isRemembered) {
      const savedEmail = localStorage.getItem("admin_saved_email") || "";
      const savedPassword = localStorage.getItem("admin_saved_password") || "";
      setFormData({
        email: savedEmail,
        password: savedPassword,
      });
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login", formData);

      const { token, admin } = response.data.data;

      if (rememberMe) {
        localStorage.setItem("admin_remember_me", "true");
        localStorage.setItem("admin_saved_email", formData.email);
        localStorage.setItem("admin_saved_password", formData.password);
      } else {
        localStorage.removeItem("admin_remember_me");
        localStorage.removeItem("admin_saved_email");
        localStorage.removeItem("admin_saved_password");
      }

      login(token, {
        email: admin.email,
        name: admin.name,
      });

      toast.success("Login successful!");
      router.push("/admin/dashboard");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 font-outfit dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md border-gray-200 shadow-xl dark:border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Admin Login
          </CardTitle>
          <p className="text-center text-sm text-gray-500">
            Enter your credentials to access the dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form method="POST" onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="username email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              />
              <Label
                htmlFor="rememberMe"
                className="cursor-pointer text-sm font-normal text-gray-600 dark:text-gray-400"
              >
                Remember me (Auto save login)
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
