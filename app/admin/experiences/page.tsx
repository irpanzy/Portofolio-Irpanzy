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
  Plus,
  Pencil,
  Trash2,
  Search,
  ArrowUp,
  ArrowDown,
  FileText,
  ExternalLink,
  Check,
  X,
  GripVertical,
} from "lucide-react";
import Image from "next/image";
import PdfThumbnail from "@/components/PdfThumbnail";
import ImageUpload from "@/components/ImageUpload";
import { PageLoading } from "@/components/LoadingSpinner";
import type { Experience, ExperienceAttachment } from "@/types";

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
    } catch {}
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
    attachments: [] as ExperienceAttachment[],
    order: 0,
  });

  const [newAttachment, setNewAttachment] = useState({
    title: "",
    url: "",
    fileId: "",
  });
  const [editingAttachmentIdx, setEditingAttachmentIdx] = useState<
    number | null
  >(null);
  const [editingAttachmentTitle, setEditingAttachmentTitle] = useState("");
  const [draggedAttachmentIdx, setDraggedAttachmentIdx] = useState<
    number | null
  >(null);
  const [dragOverAttachmentIdx, setDragOverAttachmentIdx] = useState<
    number | null
  >(null);

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
      attachments: [],
      order: getNextOrder(),
    });
    setNewAttachment({ title: "", url: "", fileId: "" });
    setEditingAttachmentIdx(null);
    setEditingAttachmentTitle("");
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
      attachments: experience.attachments || [],
      order: experience.order,
    });
    setNewAttachment({ title: "", url: "", fileId: "" });
    setEditingAttachmentIdx(null);
    setEditingAttachmentTitle("");
    setDialogOpen(true);
  };

  const handleAddAttachment = () => {
    if (!newAttachment.url.trim()) return;
    setFormData((prev) => ({
      ...prev,
      attachments: [
        ...prev.attachments,
        {
          title: newAttachment.title.trim() || "Certificate / Document",
          url: newAttachment.url.trim(),
          fileId: newAttachment.fileId || undefined,
        },
      ],
    }));
    setNewAttachment({ title: "", url: "", fileId: "" });
  };

  const handleRemoveAttachment = (index: number) => {
    if (editingAttachmentIdx === index) {
      setEditingAttachmentIdx(null);
      setEditingAttachmentTitle("");
    }
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleStartEditAttachment = (index: number, currentTitle: string) => {
    setEditingAttachmentIdx(index);
    setEditingAttachmentTitle(currentTitle);
  };

  const handleSaveAttachmentTitle = (index: number) => {
    if (!editingAttachmentTitle.trim()) return;
    setFormData((prev) => {
      const updated = [...prev.attachments];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          title: editingAttachmentTitle.trim(),
        };
      }
      return { ...prev, attachments: updated };
    });
    setEditingAttachmentIdx(null);
    setEditingAttachmentTitle("");
  };

  const handleCancelEditAttachment = () => {
    setEditingAttachmentIdx(null);
    setEditingAttachmentTitle("");
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedAttachmentIdx(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${index}`);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverAttachmentIdx !== index) {
      setDragOverAttachmentIdx(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedAttachmentIdx === null || draggedAttachmentIdx === targetIndex) {
      setDraggedAttachmentIdx(null);
      setDragOverAttachmentIdx(null);
      return;
    }

    setFormData((prev) => {
      const updated = [...prev.attachments];
      const [movedItem] = updated.splice(draggedAttachmentIdx, 1);
      updated.splice(targetIndex, 0, movedItem);
      return { ...prev, attachments: updated };
    });

    if (editingAttachmentIdx === draggedAttachmentIdx) {
      setEditingAttachmentIdx(targetIndex);
    }

    setDraggedAttachmentIdx(null);
    setDragOverAttachmentIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedAttachmentIdx(null);
    setDragOverAttachmentIdx(null);
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

    const finalAttachments = [...formData.attachments];
    if (newAttachment.url.trim()) {
      finalAttachments.push({
        title: newAttachment.title.trim() || "Certificate / Document",
        url: newAttachment.url.trim(),
        fileId: newAttachment.fileId || undefined,
      });
    }

    const payload = {
      ...formData,
      attachments: finalAttachments,
    };

    try {
      if (editingExperience) {
        await updateMutation.mutateAsync({
          id: editingExperience._id,
          data: payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }
      setNewAttachment({ title: "", url: "", fileId: "" });
      setDialogOpen(false);
    } catch {}
  };

  const confirmDelete = async () => {
    if (!deletingExperience) return;

    try {
      await deleteMutation.mutateAsync(deletingExperience._id);
      setDeleteDialogOpen(false);
    } catch {}
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
                        <div className="flex flex-col gap-1">
                          <span>{exp.position}</span>
                          {exp.attachments && exp.attachments.length > 0 && (
                            <Badge
                              variant="secondary"
                              className="w-fit gap-1 text-[10px] font-normal"
                            >
                              <FileText className="h-3 w-3 text-rose-500" />
                              {exp.attachments.length} document
                              {exp.attachments.length > 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
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

            {/* Certificates & Documents Attachments */}
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">
                    Certificates & Documents
                  </Label>
                  <p className="text-xs text-gray-500">
                    Upload certificates, project evidence, or awards (Image or
                    PDF). Drag and drop to reorder.
                  </p>
                </div>
                <Badge variant="secondary">
                  {formData.attachments.length} attached
                </Badge>
              </div>

              {/* List of existing attachments */}
              {formData.attachments.length > 0 && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {formData.attachments.map((att, idx) => {
                    const isPdf = att.url?.toLowerCase().includes(".pdf");

                    return (
                      <div
                        key={idx}
                        draggable
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDrop={(e) => handleDrop(e, idx)}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center justify-between gap-2 rounded-md border p-2 transition-all duration-200 ${
                          draggedAttachmentIdx === idx
                            ? "bg-primary/10 scale-[0.98] border-dashed border-primary opacity-40"
                            : "bg-muted/40 hover:border-gray-300 dark:hover:border-gray-700"
                        } ${
                          dragOverAttachmentIdx === idx &&
                          draggedAttachmentIdx !== idx
                            ? "bg-primary/15 ring-primary/30 border-primary shadow-sm ring-2"
                            : ""
                        }`}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                          {/* Drag Handle & Order Index */}
                          <div
                            className="flex cursor-grab items-center gap-1 text-gray-400 hover:text-gray-700 active:cursor-grabbing dark:hover:text-gray-200"
                            title="Drag to reorder"
                          >
                            <GripVertical className="h-4 w-4 shrink-0" />
                            <span className="w-3 text-center font-mono text-[10px] text-gray-400">
                              {idx + 1}
                            </span>
                          </div>

                          {/* Thumbnail */}
                          <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded border bg-gray-50 dark:bg-gray-800">
                            {isPdf ? (
                              <PdfThumbnail
                                url={att.url}
                                title={att.title}
                                showBadge={false}
                              />
                            ) : (
                              <Image
                                src={att.url}
                                alt={att.title}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            )}
                          </div>
                          {editingAttachmentIdx === idx ? (
                            <div className="flex min-w-0 flex-1 items-center gap-1.5 px-1">
                              <Input
                                value={editingAttachmentTitle}
                                onChange={(e) =>
                                  setEditingAttachmentTitle(e.target.value)
                                }
                                placeholder="Document Title"
                                className="h-7 text-xs"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSaveAttachmentTitle(idx);
                                  } else if (e.key === "Escape") {
                                    handleCancelEditAttachment();
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
                                onClick={() => handleSaveAttachmentTitle(idx)}
                                title="Save Title"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                onClick={handleCancelEditAttachment}
                                title="Cancel"
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                              <div className="flex items-center gap-1">
                                <span
                                  className="truncate text-xs font-medium text-gray-900 dark:text-gray-100"
                                  title={att.title}
                                >
                                  {att.title}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5 text-gray-400 hover:text-primary dark:text-gray-500"
                                  onClick={() =>
                                    handleStartEditAttachment(idx, att.title)
                                  }
                                  title="Edit Title"
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                              </div>
                              {isPdf && (
                                <span className="text-[10px] font-medium text-rose-500">
                                  PDF Document
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        {editingAttachmentIdx !== idx && (
                          <div className="flex items-center gap-1">
                            <a
                              href={att.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                              title="Open Document"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveAttachment(idx)}
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add New Attachment */}
              <div className="space-y-2 rounded-md border border-dashed p-3">
                <Label className="text-xs font-medium">
                  Add Certificate / Document
                </Label>
                <Input
                  placeholder="Document Title (e.g. Employee of the Year, Project Launch Photo)"
                  value={newAttachment.title}
                  onChange={(e) =>
                    setNewAttachment((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="text-xs"
                />
                <ImageUpload
                  label="Document File (Image or PDF)"
                  value={newAttachment.url}
                  fileId={newAttachment.fileId}
                  onUploadSuccess={(url, fileId) => {
                    setNewAttachment((prev) => ({
                      ...prev,
                      url,
                      fileId,
                    }));
                  }}
                  category="EXPERIENCES"
                  accept="image/*,.pdf,application/pdf"
                  maxSize={10}
                  showPreview={true}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddAttachment}
                  disabled={!newAttachment.url}
                  className="mt-2 w-full gap-1 text-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Attach Document
                </Button>
              </div>
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
