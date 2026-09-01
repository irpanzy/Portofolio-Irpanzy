"use client";

import { useState } from "react";
import {
  useTechStack,
  useCreateTechStack,
  useUpdateTechStack,
  useDeleteTechStack,
  useReorderTechStacks,
} from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ChevronDown,
  Star,
  Code2,
  Layout,
  Server,
  Smartphone,
  Database,
  Cloud,
  Wrench,
  ArrowUp,
  ArrowDown,
  GripVertical,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import { PageLoading } from "@/components/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { TechCategory, TechStack } from "@/types";

const TECH_CATEGORIES: {
  value: TechCategory;
  label: string;
  icon: LucideIcon;
}[] = [
  { value: "languages", label: "Languages", icon: Code2 },
  { value: "frontend", label: "Frontend", icon: Layout },
  { value: "backend", label: "Backend", icon: Server },
  { value: "mobile", label: "Mobile", icon: Smartphone },
  { value: "database", label: "Database", icon: Database },
  { value: "devops_cloud", label: "DevOps & Cloud", icon: Cloud },
  { value: "tools", label: "Tools", icon: Wrench },
];

const getCategoryIcon = (category: string) => {
  const found = TECH_CATEGORIES.find(
    (c) => c.value.toLowerCase() === category.toLowerCase()
  );
  return found ? found.icon : Wrench;
};

const formatCategoryTitle = (category: string) => {
  const found = TECH_CATEGORIES.find(
    (c) => c.value.toLowerCase() === category.toLowerCase()
  );
  return found
    ? found.label
    : category.charAt(0).toUpperCase() + category.slice(1);
};

export default function TechStackPage() {
  const { data: techStack, isLoading, error } = useTechStack();
  const createMutation = useCreateTechStack();
  const updateMutation = useUpdateTechStack();
  const deleteMutation = useDeleteTechStack();
  const reorderMutation = useReorderTechStacks();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<TechStack | null>(null);
  const [deletingTech, setDeletingTech] = useState<TechStack | null>(null);
  const [draggedTech, setDraggedTech] = useState<{
    category: string;
    index: number;
  } | null>(null);
  const [dragOverTech, setDragOverTech] = useState<{
    category: string;
    index: number;
  } | null>(null);

  const handleMoveTech = async (
    category: string,
    index: number,
    direction: "up" | "down",
    items: TechStack[]
  ) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
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

  const handleDragStart = (
    e: React.DragEvent,
    category: string,
    index: number
  ) => {
    setDraggedTech({ category, index });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify({ category, index }));
  };

  const handleDragOver = (
    e: React.DragEvent,
    category: string,
    index: number
  ) => {
    e.preventDefault();
    if (draggedTech && draggedTech.category === category) {
      e.dataTransfer.dropEffect = "move";
      setDragOverTech({ category, index });
    }
  };

  const handleDrop = async (
    e: React.DragEvent,
    category: string,
    targetIndex: number,
    items: TechStack[]
  ) => {
    e.preventDefault();
    setDragOverTech(null);
    if (
      !draggedTech ||
      draggedTech.category !== category ||
      draggedTech.index === targetIndex
    ) {
      setDraggedTech(null);
      return;
    }

    const fromIndex = draggedTech.index;
    setDraggedTech(null);

    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(targetIndex, 0, movedItem);

    const orders = newItems.map((item, i) => ({
      id: item._id,
      order: i + 1,
    }));

    try {
      await reorderMutation.mutateAsync(orders);
    } catch {}
  };

  const handleDragEnd = () => {
    setDraggedTech(null);
    setDragOverTech(null);
  };

  const [formData, setFormData] = useState<{
    title: string;
    icon: string;
    iconFileId: string;
    categories: TechCategory[];
    proficiencyLevel: number;
    order: number;
  }>({
    title: "",
    icon: "",
    iconFileId: "",
    categories: ["languages"],
    proficiencyLevel: 0,
    order: 0,
  });

  const getNextOrder = () => {
    if (!techStack || techStack.length === 0) return 1;
    return Math.max(...techStack.map((t) => t.order || 0)) + 1;
  };

  const handleCreate = () => {
    setEditingTech(null);
    setFormData({
      title: "",
      icon: "",
      iconFileId: "",
      categories: ["languages"],
      proficiencyLevel: 0,
      order: getNextOrder(),
    });
    setDialogOpen(true);
  };

  const handleEdit = (tech: TechStack) => {
    setEditingTech(tech);
    const cats =
      Array.isArray(tech.categories) && tech.categories.length > 0
        ? tech.categories
        : tech.category
          ? [tech.category]
          : (["languages"] as TechCategory[]);

    setFormData({
      title: tech.title,
      icon: tech.icon || "",
      iconFileId: tech.iconFileId || "",
      categories: cats,
      proficiencyLevel: tech.proficiencyLevel || 0,
      order: tech.order,
    });
    setDialogOpen(true);
  };

  const handleDelete = (tech: TechStack) => {
    setDeletingTech(tech);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("Technology name is required");
      return;
    }

    if (!formData.categories || formData.categories.length === 0) {
      toast.error("Please select at least 1 category");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      icon: formData.icon.trim() || undefined,
      iconFileId: formData.iconFileId.trim() || undefined,
      categories: formData.categories,
      proficiencyLevel:
        formData.proficiencyLevel > 0 ? formData.proficiencyLevel : undefined,
      order: formData.order,
    };

    try {
      if (editingTech) {
        await updateMutation.mutateAsync({
          id: editingTech._id,
          data: payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }
      setDialogOpen(false);
    } catch {}
  };

  const confirmDelete = async () => {
    if (!deletingTech) return;

    try {
      await deleteMutation.mutateAsync(deletingTech._id);
      setDeleteDialogOpen(false);
    } catch {}
  };

  const filteredTechStack = techStack?.filter((tech) => {
    const matchesSearch = tech.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const cats =
      Array.isArray(tech.categories) && tech.categories.length > 0
        ? tech.categories
        : tech.category
          ? [tech.category]
          : ["tools"];

    const matchesCategory =
      selectedCategory === "all" ||
      cats.includes(selectedCategory as TechCategory);
    return matchesSearch && matchesCategory;
  });

  const groupedTech = filteredTechStack?.reduce(
    (acc, tech) => {
      const cats =
        Array.isArray(tech.categories) && tech.categories.length > 0
          ? tech.categories
          : tech.category
            ? [tech.category]
            : ["tools"];

      cats.forEach((category) => {
        if (selectedCategory === "all" || category === selectedCategory) {
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(tech);
        }
      });
      return acc;
    },
    {} as Record<string, TechStack[]>
  );

  if (isLoading) {
    return <PageLoading text="Loading technologies..." />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">
              Error loading technologies: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Sticky Header & Filters Toolbar */}
      <div className="sticky top-0 z-20 -mx-6 -mt-6 mb-6 border-b border-gray-200/80 bg-gray-50/95 px-6 pb-4 pt-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tech Stack &amp; Skills</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your programming languages, frameworks, tools, and
              proficiency levels (7 Categories)
            </p>
          </div>
          <Button className="gap-2" onClick={handleCreate}>
            <Plus className="h-4 w-4" />
            Add Technology
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white pl-10 dark:bg-gray-800"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {TECH_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.value}
                  variant={
                    selectedCategory === cat.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                  className="gap-1.5"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grouped View */}
      <div className="space-y-6">
        {groupedTech && Object.keys(groupedTech).length > 0 ? (
          Object.entries(groupedTech).map(([category, items]) => {
            const CategoryIcon = getCategoryIcon(category);
            return (
              <Card key={category}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CategoryIcon className="h-5 w-5 text-primary" />
                      {formatCategoryTitle(category)}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="hidden text-xs text-muted-foreground sm:inline">
                        💡 Drag &amp; drop kartu untuk mengatur urutan
                      </span>
                      <Badge variant="secondary">{items.length} items</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((tech, idx) => {
                      const isBeingDragged =
                        draggedTech?.category === category &&
                        draggedTech?.index === idx;
                      const isDragOver =
                        dragOverTech?.category === category &&
                        dragOverTech?.index === idx &&
                        !isBeingDragged;

                      return (
                        <div
                          key={tech._id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, category, idx)}
                          onDragOver={(e) => handleDragOver(e, category, idx)}
                          onDrop={(e) => handleDrop(e, category, idx, items)}
                          onDragEnd={handleDragEnd}
                          className={cn(
                            "group flex cursor-grab items-center justify-between rounded-lg border p-3 transition-all active:cursor-grabbing",
                            isBeingDragged
                              ? "ring-primary/30 scale-95 border-dashed border-primary opacity-40 ring-2"
                              : isDragOver
                                ? "bg-primary/5 ring-primary/20 scale-[1.02] border-primary ring-2"
                                : "hover:border-primary/50 hover:bg-gray-50 hover:shadow-sm dark:hover:bg-gray-800"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-gray-400 opacity-40 transition-opacity active:cursor-grabbing group-hover:opacity-100" />
                            <div className="flex flex-col gap-0.5">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                disabled={
                                  idx === 0 || reorderMutation.isPending
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveTech(category, idx, "up", items);
                                }}
                                title="Move Up"
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                disabled={
                                  idx === items.length - 1 ||
                                  reorderMutation.isPending
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveTech(category, idx, "down", items);
                                }}
                                title="Move Down"
                              >
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                            </div>
                            {tech.icon ? (
                              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-gray-100 p-1 dark:bg-gray-800">
                                <Image
                                  src={tech.icon}
                                  alt={tech.title}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200 text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                {tech.title.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium">
                                {tech.title}
                              </p>
                              {tech.proficiencyLevel &&
                              tech.proficiencyLevel > 0 ? (
                                <div
                                  className="mt-0.5 flex items-center gap-0.5"
                                  title={`Level ${tech.proficiencyLevel}/5`}
                                >
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < (tech.proficiencyLevel || 0)
                                          ? "fill-amber-400 text-amber-400"
                                          : "text-gray-300 dark:text-gray-600"
                                      }`}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs text-gray-500">
                                  Order: {tech.order}
                                </p>
                              )}
                            </div>
                          </div>
                          <div
                            className="flex gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(tech)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(tech)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-gray-500">No technologies found</p>
              <Button size="sm" onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Technology
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-[500px] dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>
              {editingTech ? "Edit Technology" : "Add New Technology"}
            </DialogTitle>
            <DialogDescription>
              {editingTech
                ? "Update technology information"
                : "Add a new technology or programming language to your stack"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Name *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="JavaScript, React, Docker, etc."
              />
            </div>

            <ImageUpload
              label="Technology Icon"
              value={formData.icon}
              fileId={formData.iconFileId}
              onUploadSuccess={(url, fileId) => {
                setFormData((prev) => ({
                  ...prev,
                  icon: url,
                  iconFileId: fileId,
                }));
              }}
              category="TECHSTACKS"
              showPreview={true}
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Categories * (Choose 1 or more)</Label>
                <span className="text-xs text-muted-foreground">
                  {formData.categories.length} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TECH_CATEGORIES.map((cat) => {
                  const isSelected = formData.categories.includes(cat.value);
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        const exists = formData.categories.includes(cat.value);
                        if (exists) {
                          if (formData.categories.length > 1) {
                            setFormData({
                              ...formData,
                              categories: formData.categories.filter(
                                (c) => c !== cat.value
                              ),
                            });
                          } else {
                            toast.error(
                              "At least one category must be selected"
                            );
                          }
                        } else {
                          setFormData({
                            ...formData,
                            categories: [...formData.categories, cat.value],
                          });
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                        isSelected
                          ? "border-[#77BEF0] bg-[#77BEF0]/15 text-[#2170a8] dark:border-[#77BEF0] dark:bg-[#77BEF0]/20 dark:text-[#90cdf4]"
                          : "dark:hover:bg-gray-750 border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="proficiencyLevel">
                  Proficiency Level (Optional: 1 - 5 Stars)
                </Label>
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  {formData.proficiencyLevel > 0
                    ? `${formData.proficiencyLevel} / 5 Stars`
                    : "Not Specified"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        proficiencyLevel:
                          formData.proficiencyLevel === lvl ? 0 : lvl,
                      })
                    }
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        lvl <= formData.proficiencyLevel
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
                {formData.proficiencyLevel > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-2 text-xs text-gray-500"
                    onClick={() =>
                      setFormData({ ...formData, proficiencyLevel: 0 })
                    }
                  >
                    Clear
                  </Button>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Recommended for Languages and primary skills to show skill
                mastery.
              </p>
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
                : editingTech
                  ? "Update"
                  : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Delete Technology</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deletingTech?.title}</strong>? This action will move it
              to the recycle bin.
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
