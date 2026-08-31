"use client";

import { useState } from "react";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import IconSelector from "@/components/IconSelector";
import { DynamicIcon } from "@/lib/iconUtils";
import { PageLoading } from "@/components/LoadingSpinner";
import type { Service } from "@/types";

export default function ServicesPage() {
  const { data: services, isLoading, error } = useServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingService, setDeletingService] = useState<Service | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    order: 0,
  });

  const getNextOrder = () => {
    if (!services || services.length === 0) return 1;
    return Math.max(...services.map((s) => s.order || 0)) + 1;
  };

  const handleCreate = () => {
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      icon: "",
      order: getNextOrder(),
    });
    setDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      order: service.order,
    });
    setDialogOpen(true);
  };

  const handleDelete = (service: Service) => {
    setDeletingService(service);
    setDeleteDialogOpen(true);
  };

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSave = async () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData.icon.trim()) {
      errors.icon = "Icon is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    try {
      if (editingService) {
        await updateMutation.mutateAsync({
          id: editingService._id,
          data: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to save service:", error);
    }
  };

  const confirmDelete = async () => {
    if (!deletingService) return;

    try {
      await deleteMutation.mutateAsync(deletingService._id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const filteredServices = services?.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <PageLoading text="Loading services..." />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">
              Error loading services: {error.message}
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
            <h1 className="text-2xl font-bold">Services</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage services you offer
            </p>
          </div>
          <Button className="gap-2" onClick={handleCreate}>
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white pl-10 dark:bg-gray-800"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices && filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Card key={service._id} className="relative">
              <CardHeader>
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                    <DynamicIcon
                      iconName={service.icon}
                      className="h-8 w-8"
                      size={32}
                    />
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(service)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(service)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-gray-500">No services found</p>
              <Button size="sm" onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Service
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col bg-white sm:max-w-[500px] dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Create New Service"}
            </DialogTitle>
            <DialogDescription>
              {editingService
                ? "Update service information"
                : "Add a new service you offer"}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 space-y-4 overflow-y-auto py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Web Development"
              />
              {formErrors.title && (
                <p className="text-xs text-red-500">{formErrors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of the service"
                rows={4}
              />
              {formErrors.description && (
                <p className="text-xs text-red-500">{formErrors.description}</p>
              )}
            </div>

            <IconSelector
              label="Service Icon *"
              value={formData.icon}
              onChange={(iconName) =>
                setFormData({ ...formData, icon: iconName })
              }
            />
            {formErrors.icon && (
              <p className="text-xs text-red-500">{formErrors.icon}</p>
            )}
            <p className="text-xs text-gray-500">
              💡 You can use Lucide icon names (Code, Database, etc.) or paste
              image URL
            </p>
          </div>

          <DialogFooter className="border-t pt-4">
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
                : editingService
                  ? "Update"
                  : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deletingService?.title}</strong>? This action will move
              it to the recycle bin.
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
