"use client";

import React, { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import { PageLoading } from "@/components/LoadingSpinner";
import TechStackSelector from "@/components/TechStackSelector";
import type { Project } from "@/types";

const ITEMS_PER_PAGE = 5;

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();
  const reorderMutation = useReorderProjects();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    techStack: Project["techStack"];
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

  const totalItems = filteredProjects?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedProjects = filteredProjects?.slice(startIndex, endIndex) || [];

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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white pl-10 dark:bg-gray-800"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Projects ({totalItems})</CardTitle>
            {totalItems > 0 && (
              <span className="text-xs text-muted-foreground">
                Page {validCurrentPage} of {totalPages}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[385px] overflow-x-auto">
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
                {paginatedProjects && paginatedProjects.length > 0 ? (
                  paginatedProjects.map((project, idx) => {
                    const globalIndex = startIndex + idx;

                    return (
                      <TableRow key={project._id}>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="w-5 font-mono text-xs text-gray-500">
                              {globalIndex + 1}
                            </span>
                            <div className="flex flex-col gap-0.5">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                disabled={
                                  globalIndex === 0 || reorderMutation.isPending
                                }
                                onClick={() => handleMove(globalIndex, "up")}
                                title="Move Up"
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                disabled={
                                  globalIndex === totalItems - 1 ||
                                  reorderMutation.isPending
                                }
                                onClick={() => handleMove(globalIndex, "down")}
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
                            {project.techStack.slice(0, 3).map((tech, tIdx) => {
                              const isObject = typeof tech === "object";
                              const title = isObject ? tech.title : tech;
                              const icon = isObject ? tech.icon : null;
                              const iconDark = isObject ? tech.iconDark : null;
                              const iconLight = isObject
                                ? tech.iconLight
                                : null;

                              return (
                                <Badge
                                  key={tIdx}
                                  variant="secondary"
                                  className="flex items-center gap-1.5"
                                >
                                  {iconDark || iconLight ? (
                                    <>
                                      <Image
                                        src={iconLight || icon || iconDark!}
                                        alt={title}
                                        width={14}
                                        height={14}
                                        className="h-3.5 w-3.5 object-contain dark:hidden"
                                      />
                                      <Image
                                        src={iconDark || icon || iconLight!}
                                        alt={`${title} dark`}
                                        width={14}
                                        height={14}
                                        className="hidden h-3.5 w-3.5 object-contain dark:block"
                                      />
                                    </>
                                  ) : icon ? (
                                    <Image
                                      src={icon}
                                      alt={title}
                                      width={14}
                                      height={14}
                                      className="h-3.5 w-3.5 object-contain"
                                    />
                                  ) : null}
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
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
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

          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row dark:border-gray-800">
              <div className="text-xs text-muted-foreground">
                Showing{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  {startIndex + 1}
                </strong>{" "}
                to{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  {endIndex}
                </strong>{" "}
                of{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  {totalItems}
                </strong>{" "}
                projects
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(1)}
                  disabled={validCurrentPage === 1}
                  title="First Page"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={validCurrentPage === 1}
                  title="Previous Page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1 px-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - validCurrentPage) <= 1
                      );
                    })
                    .map((page, idx, arr) => {
                      const prevPage = arr[idx - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;

                      return (
                        <React.Fragment key={page}>
                          {showEllipsis && (
                            <span className="px-1 text-xs text-gray-400">
                              ...
                            </span>
                          )}
                          <Button
                            variant={
                              validCurrentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            className="h-8 min-w-8 px-2 text-xs"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        </React.Fragment>
                      );
                    })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={validCurrentPage === totalPages}
                  title="Next Page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={validCurrentPage === totalPages}
                  title="Last Page"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
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
