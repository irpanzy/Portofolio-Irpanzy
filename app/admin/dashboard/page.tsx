"use client";

import {
  useProjects,
  useExperiences,
  useEducations,
  useServices,
  useTechStack,
} from "@/hooks/useApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  FolderKanban,
  Wrench,
  Code2,
  TrendingUp,
  Activity,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { data: projects } = useProjects();
  const { data: experiences } = useExperiences();
  const { data: educations } = useEducations();
  const { data: services } = useServices();
  const { data: techStack } = useTechStack();

  const stats = [
    {
      icon: FolderKanban,
      title: "Projects",
      value: projects?.length || 0,
      href: "/admin/projects",
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900",
    },
    {
      icon: Briefcase,
      title: "Experiences",
      value: experiences?.length || 0,
      href: "/admin/experiences",
      color: "text-green-600 bg-green-100 dark:bg-green-900",
    },
    {
      icon: GraduationCap,
      title: "Education",
      value: educations?.length || 0,
      href: "/admin/education",
      color: "text-teal-600 bg-teal-100 dark:bg-teal-900",
    },
    {
      icon: Wrench,
      title: "Services",
      value: services?.length || 0,
      href: "/admin/services",
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900",
    },
    {
      icon: Code2,
      title: "Technologies",
      value: techStack?.length || 0,
      href: "/admin/techstack",
      color: "text-orange-600 bg-orange-100 dark:bg-orange-900",
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Welcome Back!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your portfolio today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <Card className="transition-all hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Total {stat.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Portfolio is live and running
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  {projects?.length || 0} projects published
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  {services?.length || 0} services available
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <CardTitle>Quick Stats</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Visible Projects
                </span>
                <span className="font-semibold">
                  {projects?.filter((p) => p.isVisible).length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Current Experiences
                </span>
                <span className="font-semibold">
                  {experiences?.filter((e) => e.current).length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Tech Stack
                </span>
                <span className="font-semibold">{techStack?.length || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
