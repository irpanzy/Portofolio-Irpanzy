"use client";

import { useState, useEffect } from "react";
import { useHero, useCreateHero, useUpdateHero } from "@/hooks/useApi";
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
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import { PageLoading } from "@/components/LoadingSpinner";
import { toast } from "@/hooks/use-toast";

export default function HeroAdminPage() {
  const { data: hero, isLoading } = useHero();
  const createMutation = useCreateHero();
  const updateMutation = useUpdateHero();

  const [formData, setFormData] = useState({
    avatarImage: "",
    avatarImageFileId: "",
    greeting: "Hello! I'm Irfan Muria",
    title: "",
    description: "",
    resumeLink: "",
  });

  useEffect(() => {
    if (hero) {
      setFormData({
        avatarImage: hero.avatarImage || "",
        avatarImageFileId: hero.avatarImageFileId || "",
        greeting: hero.greeting || "Hello! I'm Irfan Muria",
        title: hero.title || "",
        description: hero.description || "",
        resumeLink: hero.resumeLink || "",
      });
    }
  }, [hero]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.avatarImage.trim()) {
      toast.error("Avatar Image is required");
      return;
    }
    if (!formData.title.trim()) {
      toast.error("Title / Headline is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!formData.resumeLink.trim()) {
      toast.error("Resume Link is required");
      return;
    }

    try {
      if (hero && hero._id) {
        await updateMutation.mutateAsync(formData);
      } else {
        await createMutation.mutateAsync(formData);
      }
    } catch (error) {
      console.error("Failed to save hero data:", error);
    }
  };

  if (isLoading) {
    return <PageLoading text="Loading hero settings..." />;
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hero / Home Section</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage your landing page introduction, avatar photo, headline, and
          resume link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar & Greeting Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Avatar &amp; Greeting</CardTitle>
            <CardDescription>
              Main avatar picture and greeting header displayed on the hero
              section.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="border-primary/20 relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-2 bg-gray-100 dark:bg-gray-800">
                {formData.avatarImage ? (
                  <Image
                    src={formData.avatarImage}
                    alt="Hero Avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    No Avatar
                  </div>
                )}
              </div>

              <div className="w-full flex-1 space-y-4">
                <ImageUpload
                  label="Upload Avatar Image *"
                  value={formData.avatarImage}
                  fileId={formData.avatarImageFileId}
                  onUploadSuccess={(url, fileId) => {
                    setFormData((prev) => ({
                      ...prev,
                      avatarImage: url,
                      avatarImageFileId: fileId,
                    }));
                  }}
                  category="ABOUT"
                  showPreview={false}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="greeting">Greeting Text</Label>
              <Input
                id="greeting"
                value={formData.greeting}
                onChange={(e) =>
                  setFormData({ ...formData, greeting: e.target.value })
                }
                placeholder="Hello! I'm Irfan Muria"
              />
            </div>
          </CardContent>
        </Card>

        {/* Content & Resume Card */}
        <Card>
          <CardHeader>
            <CardTitle>Headline &amp; Resume</CardTitle>
            <CardDescription>
              Your professional title, short hero elevator pitch, and Google
              Drive resume link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Main Title / Headline *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Fullstack Web Developer Enthusiast"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Hero Short Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="I build modern fullstack apps with React, Node.js, Express..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resumeLink">
                Resume URL (Google Drive / Cloud) *
              </Label>
              <Input
                id="resumeLink"
                type="url"
                value={formData.resumeLink}
                onChange={(e) =>
                  setFormData({ ...formData, resumeLink: e.target.value })
                }
                placeholder="https://drive.google.com/file/d/..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving
              ? "Saving..."
              : hero
                ? "Update Hero Data"
                : "Create Hero Data"}
          </Button>
        </div>
      </form>
    </div>
  );
}
