"use client";

import { useState } from "react";
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useReorderProjects,
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
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import { PageLoading } from "@/components/LoadingSpinner";
import TechStackSelector from "@/components/TechStackSelector";
import type { Project } from "@/types";

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();
  const reorderMutation = useReorderProjects();

  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (!filteredProjects) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filteredProjects.length) return;

    const newItems = [...filteredProjects];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const orders = newItems.map((item, i) => ({
      id: item._id,
      order: i + 1,
    }));

    try {
      await reorderMutation.mutateAsync(orders);
    } catch {}
  };

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    bgImage: string;
    demoLink: string;
    githubLink: string;
    techStack: Array<string | { title: string; icon?: string }>;
    isVisible: boolean;
  }>({
    title: "",
    description: "",
    bgImage: "",
    demoLink: "",
    githubLink: "",
    techStack: [],
    isVisible: true,
  });

  const handleCreate = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      bgImage: "",
      demoLink: "",
      githubLink: "",
      techStack: [],
      isVisible: true,
    });
    setDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      bgImage: project.bgImage,
      demoLink: project.demoLink || "",
      githubLink: project.githubLink || "",
      techStack: project.techStack,
      isVisible: project.isVisible,
    });
    setDialogOpen(true);
  };

  const handleDelete = (project: Project) => {
    setDeletingProject(project);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      return;
    }
    if (!formData.description.trim()) {
      return;
    }
    if (!formData.bgImage.trim()) {
      return;
    }

    try {
      if (editingProject) {
        await updateMutation.mutateAsync({
          id: editingProject._id,
          data: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      setDialogOpen(false);
    } catch {}
  };

  const confirmDelete = async () => {
    if (!deletingProject) return;

    try {
      await deleteMutation.mutateAsync(deletingProject._id);
      setDeleteDialogOpen(false);
    } catch {}
  };

  const filteredProjects = projects?.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <PageLoading text="Loading projects..." />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">
              Error loading projects: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Sticky Header & Search Toolbar */}
      <div className="sticky top-0 z-20 -mx-6 -mt-6 mb-6 border-b border-gray-200/80 bg-gray-50/95 px-6 pb-4 pt-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your portfolio projects
            </p>
          </div>
          <Button className="gap-2" onClick={handleCreate}>
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white pl-10 dark:bg-gray-800"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects ({filteredProjects?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Order</TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Tech Stack</TableHead>
                  <TableHead className="w-[100px]">Visibility</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects && filteredProjects.length > 0 ? (
                  filteredProjects.map((project, idx) => (
                    <TableRow key={project._id}>
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
                                idx === filteredProjects.length - 1 ||
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
                        <div className="relative h-12 w-12 overflow-hidden rounded-md">
                          <Image
                            src={project.bgImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {project.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 3).map((tech, idx) => {
                            const isObject = typeof tech === "object";
                            const title = isObject ? tech.title : tech;
                            const icon = isObject ? tech.icon : null;

                            return (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="flex items-center gap-1.5"
                              >
                                {icon && (
                                  <Image
                                    src={icon}
                                    alt={title}
                                    width={14}
                                    height={14}
                                    className="h-3.5 w-3.5 object-contain"
                                  />
                                )}
                                {title}
                              </Badge>
                            );
                          })}
                          {project.techStack.length > 3 && (
                            <Badge variant="secondary">
                              +{project.techStack.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {project.isVisible ? (
                          <Badge className="gap-1">
                            <Eye className="h-3 w-3" />
                            Visible
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <EyeOff className="h-3 w-3" />
                            Hidden
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {project.demoLink && (
                            <a
                              href={project.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                title="View Demo"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(project)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(project)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      <div className="py-8 text-gray-500">
                        <p>No projects found</p>
                        <Button
                          className="mt-4"
                          size="sm"
                          onClick={handleCreate}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Your First Project
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
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Create New Project"}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? "Update project information"
                : "Add a new project to your portfolio"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Project title"
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
                placeholder="Brief description of the project"
                rows={3}
              />
            </div>

            <ImageUpload
              label="Background Image *"
              value={formData.bgImage}
              fileId=""
              onUploadSuccess={(url) => {
                setFormData((prev) => ({ ...prev, bgImage: url }));
              }}
              category="PROJECTS"
              showPreview={true}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="demoLink">Demo Link</Label>
                <Input
                  id="demoLink"
                  value={formData.demoLink}
                  onChange={(e) =>
                    setFormData({ ...formData, demoLink: e.target.value })
                  }
                  placeholder="https://demo.example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub Link</Label>
                <Input
                  id="githubLink"
                  value={formData.githubLink}
                  onChange={(e) =>
                    setFormData({ ...formData, githubLink: e.target.value })
                  }
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <TechStackSelector
              selected={formData.techStack}
              onChange={(techStack) => setFormData({ ...formData, techStack })}
            />

            <div
              onClick={() =>
                setFormData({ ...formData, isVisible: !formData.isVisible })
              }
              className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-colors duration-200 ${
                formData.isVisible
                  ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                  : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    formData.isVisible
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                      : "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400"
                  }`}
                >
                  {formData.isVisible ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="isVisible" className="text-sm font-semibold">
                    {formData.isVisible ? "Visible" : "Hidden"}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {formData.isVisible
                      ? "This project is shown on your portfolio"
                      : "This project is hidden from your portfolio"}
                  </p>
                </div>
              </div>
              <Switch
                id="isVisible"
                checked={formData.isVisible}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isVisible: checked })
                }
              />
            </div>
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
                : editingProject
                  ? "Update"
                  : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deletingProject?.title}
              &quot;? This action will move the project to the recycle bin.
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
