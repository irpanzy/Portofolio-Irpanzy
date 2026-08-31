"use client";

import { useState } from "react";
import {
  useExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
  useReorderExperiences,
} from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Search,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import { PageLoading } from "@/components/LoadingSpinner";
import type { Experience } from "@/types";

export default function ExperiencesPage() {
  const { data: experiences, isLoading, error } = useExperiences();
  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience();
  const deleteMutation = useDeleteExperience();
  const reorderMutation = useReorderExperiences();

  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [deletingExperience, setDeletingExperience] =
    useState<Experience | null>(null);

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (!filteredExperiences) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filteredExperiences.length) return;

    const newItems = [...filteredExperiences];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const orders = newItems.map((item, i) => ({
      id: item._id,
      order: i + 1,
    }));

    try {
      await reorderMutation.mutateAsync(orders);
    } catch (err) {
      console.error("Experience reorder failed:", err);
    }
  };

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    responsibilities: [] as string[],
    logo: "",
    order: 0,
  });

  const getNextOrder = () => {
    if (!experiences || experiences.length === 0) return 1;
    return Math.max(...experiences.map((e) => e.order || 0)) + 1;
  };

  const handleCreate = () => {
    setEditingExperience(null);
    setFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      responsibilities: [],
      logo: "",
      order: getNextOrder(),
    });
    setDialogOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company,
      position: experience.position,
      location: experience.location,
      startDate: experience.startDate.split("T")[0],
      endDate: experience.endDate ? experience.endDate.split("T")[0] : "",
      current: experience.current,
      description: experience.description,
      responsibilities: experience.responsibilities,
      logo: experience.logo || "",
      order: experience.order,
    });
    setDialogOpen(true);
  };

  const handleDelete = (experience: Experience) => {
    setDeletingExperience(experience);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.company.trim() || !formData.position.trim()) {
      return;
    }
    if (!formData.startDate) {
      return;
    }

    try {
      if (editingExperience) {
        await updateMutation.mutateAsync({
          id: editingExperience._id,
          data: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to save experience:", error);
    }
  };

  const confirmDelete = async () => {
    if (!deletingExperience) return;

    try {
      await deleteMutation.mutateAsync(deletingExperience._id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  const filteredExperiences = experiences?.filter(
    (exp) =>
      exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <PageLoading text="Loading experiences..." />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">
              Error loading experiences: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="p-6">
      {/* Sticky Header & Search Toolbar */}
      <div className="sticky top-0 z-20 -mx-6 -mt-6 mb-6 border-b border-gray-200/80 bg-gray-50/95 px-6 pb-4 pt-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Experiences</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your work experiences
            </p>
          </div>
          <Button className="gap-2" onClick={handleCreate}>
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white pl-10 dark:bg-gray-800"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            All Experiences ({filteredExperiences?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Order</TableHead>
                  <TableHead className="w-[80px]">Logo</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExperiences && filteredExperiences.length > 0 ? (
                  filteredExperiences.map((exp, idx) => (
                    <TableRow key={exp._id}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="w-5 font-mono text-xs text-gray-500">
                            {idx + 1}
                          </span>
                          <div className="flex flex-col gap-0.5">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5"
                              disabled={idx === 0 || reorderMutation.isPending}
                              onClick={() => handleMove(idx, "up")}
                              title="Move Up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5"
                              disabled={
                                idx === filteredExperiences.length - 1 ||
                                reorderMutation.isPending
                              }
                              onClick={() => handleMove(idx, "down")}
                              title="Move Down"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {exp.logo ? (
                          <div className="relative h-12 w-12 overflow-hidden rounded-md">
                            <Image
                              src={exp.logo}
                              alt={exp.company}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-200 text-xs font-bold text-gray-600">
                            {exp.company.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {exp.position}
                      </TableCell>
                      <TableCell>{exp.company}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDate(exp.startDate)} -{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{exp.location}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(exp)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(exp)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      <div className="py-8 text-gray-500">
                        <p>No experiences found</p>
                        <Button
                          className="mt-4"
                          size="sm"
                          onClick={handleCreate}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Your First Experience
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-[600px] dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>
              {editingExperience ? "Edit Experience" : "Create New Experience"}
            </DialogTitle>
            <DialogDescription>
              {editingExperience
                ? "Update experience information"
                : "Add a new work experience"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  placeholder="Job title"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Remote, Jakarta, etc."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  disabled={formData.current}
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="current">Current Position</Label>
                <p className="text-sm text-gray-500">I currently work here</p>
              </div>
              <Switch
                id="current"
                checked={formData.current}
                onCheckedChange={(checked) => {
                  setFormData({
                    ...formData,
                    current: checked,
                    endDate: checked ? "" : formData.endDate,
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of your role"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">
                Responsibilities (one per line)
              </Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilities.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    responsibilities: e.target.value
                      .split("\n")
                      .filter((s) => s.trim() !== ""),
                  })
                }
                placeholder={
                  "Engineered UI components for vehicle management\nImplemented secure starter control workflows\nDeveloped advanced report export features"
                }
                rows={5}
              />
            </div>

            <ImageUpload
              label="Company Logo"
              value={formData.logo}
              fileId=""
              onUploadSuccess={(url) => {
                setFormData((prev) => ({ ...prev, logo: url }));
              }}
              category="EXPERIENCES"
              showPreview={true}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : editingExperience
                  ? "Update"
                  : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Delete Experience</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the experience at{" "}
              <strong>{deletingExperience?.company}</strong>? This action will
              move it to the recycle bin.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
