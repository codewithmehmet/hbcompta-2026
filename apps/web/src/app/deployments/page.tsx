"use client";

import React, { useState } from "react";
import {
  Calendar,
  ChevronDown,
  MoreHorizontal,
  GitBranch,
  Search,
  Bell,
  User,
  Home,
  Package,
  Activity,
  Globe,
  BarChart3,
  Shield,
  Database,
  Flag,
  Headphones,
  Cog,
} from "lucide-react";

const Deployments = () => {
  const [selectedEnvironment] = useState("All Environments");
  const [selectedStatus] = useState("Status 5/6");
  const [dateRange] = useState("Select Date Range");

  const deployments = [
    {
      id: "6AtnGjCxD",
      environment: "Production",
      status: "Ready",
      statusColor: "bg-emerald-500",
      duration: "24s",
      time: "306d ago",
      user: "saas",
      branch: "main",
      commit: "01e6190",
      message: "test vercel",
      date: "9/29/24",
      author: "mcinainpro",
    },
    {
      id: "Fj33HUM89",
      environment: "Production",
      status: "Error",
      statusColor: "bg-red-500",
      duration: "14s",
      time: "306d ago",
      user: "saas",
      branch: "main",
      commit: "5eb5c50",
      message: "test with all packages 2",
      date: "9/29/24",
      author: "mcinainpro",
    },
    {
      id: "EZDFUwYQ8",
      environment: "Production",
      status: "Error",
      statusColor: "bg-red-500",
      duration: "14s",
      time: "306d ago",
      user: "saas",
      branch: "main",
      commit: "bd284d1",
      message: "test",
      date: "9/29/24",
      author: "mcinainpro",
    },
    {
      id: "ARmdcsQTg",
      environment: "Production",
      status: "Error",
      statusColor: "bg-red-500",
      duration: "13s",
      time: "306d ago",
      user: "saas",
      branch: "main",
      commit: "3a8594e",
      message: "hadi ya",
      date: "9/29/24",
      author: "mcinainpro",
    },
    {
      id: "FkQ4NGFcm",
      environment: "Production",
      status: "Error",
      statusColor: "bg-red-500",
      duration: "17s",
      time: "306d ago",
      user: "saas",
      branch: "main",
      commit: "18ca03e",
      message: "remove nest/cli",
      date: "9/28/24",
      author: "mcinainpro",
    },
    {
      id: "BqBeS9kCc",
      environment: "Production",
      status: "Error",
      statusColor: "bg-red-500",
      duration: "16s",
      time: "306d ago",
      user: "saas",
      branch: "main",
      commit: "bf1eb44",
      message: "update",
      date: "9/28/24",
      author: "mcinainpro",
    },
    {
      id: "BmJ8ZyFEi",
      environment: "Production",
      status: "Ready",
      statusColor: "bg-emerald-500",
      duration: "28s",
      time: "306d ago",
      user: "saas",
      branch: "main",
      commit: "60088ff",
      message: "update package.json",
      date: "9/28/24",
      author: "mcinainpro",
    },
    {
      id: "5r57AYcTK",
      environment: "Production",
      status: "Ready",
      statusColor: "bg-emerald-500",
      duration: "55s",
      time: "306d ago",
      user: "saas",
      branch: "main",
      commit: "1031b84",
      message: "rollback",
      date: "9/28/24",
      author: "mcinainpro",
    },
    {
      id: "AT7PyZhfP",
      environment: "Production",
      status: "Error",
      statusColor: "bg-red-500",
      duration: "11s",
      time: "306d ago",
      user: "saas",
      branch: "main",
      commit: "ee71d81",
      message: "move nest/cli to depe...",
      date: "9/28/24",
      author: "mcinainpro",
    },
  ];

  const navigationItems = [
    { icon: Home, label: "Overview", active: false },
    { icon: Package, label: "Integrations", active: false },
    { icon: Activity, label: "Deployments", active: true },
    { icon: BarChart3, label: "Activity", active: false },
    { icon: Globe, label: "Domains", active: false },
    { icon: BarChart3, label: "Usage", active: false },
    { icon: Shield, label: "Observability", active: false },
    { icon: Database, label: "Storage", active: false },
    { icon: Flag, label: "Flags", active: false },
    { icon: Globe, label: "AI Gateway", active: false },
    { icon: Headphones, label: "Support", active: false },
    { icon: Cog, label: "Settings", active: false },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="font-medium text-gray-900">
                  mcinainpro projects
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Hobby
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  F
                </span>
              </div>
              <button className="text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">Feedback</span>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="px-8">
          <div className="flex space-x-8">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                  item.active
                    ? "border-black text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Deployments
            </h1>
            <p className="text-gray-600">
              All deployments from{" "}
              <span className="font-mono text-sm">mcinainpros-projects</span>
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50">
                <Calendar className="w-4 h-4" />
                <span>{dateRange}</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50">
                  <span>{selectedEnvironment}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span>{selectedStatus}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Deployments Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {deployments.map(deployment => (
                <div
                  key={deployment.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 ${deployment.statusColor} rounded-full`}
                        ></div>
                        <span className="text-sm text-gray-600">
                          {deployment.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {deployment.duration} ({deployment.time})
                        </span>
                      </div>

                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {deployment.user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-900">
                        {deployment.user}
                      </span>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <GitBranch className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {deployment.branch}
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="font-mono">{deployment.commit}</span>
                          <span>{deployment.message}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {deployment.date} by {deployment.author}
                        </div>
                      </div>

                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Deployments;
