"use client";

import { useState, useEffect } from "react";
import { useAbout, useCreateAbout, useUpdateAbout } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { PageLoading } from "@/components/LoadingSpinner";
import { toast } from "@/hooks/use-toast";

export default function AboutAdminPage() {
  const { data: about, isLoading } = useAbout();
  const createMutation = useCreateAbout();
  const updateMutation = useUpdateAbout();

  const [formData, setFormData] = useState({
    bio: "",
    summary: "",
  });

  useEffect(() => {
    if (about) {
      setFormData({
        bio: about.bio || "",
        summary: about.summary || "",
      });
    }
  }, [about]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bio.trim() || formData.bio.trim().length < 10) {
      toast.error("Bio is required and must be at least 10 characters");
      return;
    }

    try {
      if (about && about._id) {
        await updateMutation.mutateAsync(formData);
      } else {
        await createMutation.mutateAsync(formData);
      }
    } catch (error) {
      console.error("Failed to save about data:", error);
    }
  };

  if (isLoading) {
    return <PageLoading text="Loading about profile..." />;
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">About Me Section</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage your personal biography and professional summary.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Bio &amp; Summary</CardTitle>
            <CardDescription>
              Write your introduction, your journey, coding philosophy, and
              goals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="summary">
                Professional Summary / Tagline (Optional)
              </Label>
              <Input
                id="summary"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                placeholder="Fullstack Developer | React & Node.js Enthusiast"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio Description * (min 10 characters)</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="I'm a passionate fullstack developer with 3+ years of experience in building modern web applications. I love learning new technologies and solving complex problems..."
                rows={6}
                required
              />
              <p className="text-xs text-gray-500">
                This bio will be displayed at the center of the About Me section
                on your portfolio.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving
              ? "Saving..."
              : about
                ? "Update About Data"
                : "Create About Data"}
          </Button>
        </div>
      </form>
    </div>
  );
}
