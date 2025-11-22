import { LayoutDashboard, Home, Users, FileText, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import React from "react";
const projects = [
  { name: "Dashboard", navLink: "/dashboard", icon: LayoutDashboard },
  { name: "Rooms", navLink: "/RoomsManagement", icon: Home },
  { name: "Tenants", navLink: "/tenants", icon: Users },
  { name: "Bills", navLink: "/bills", icon: FileText },
  { name: "Settings", navLink: "/settings", icon: Settings },
];

export default function AppSidebar() {
  return (
    <SidebarProvider className="fixed lg:static inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transform transition-transform duration-200 ease-in-out lg:translate-x-0 translate-x-0">
      <Sidebar className="h-full flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">RentMgr</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Rental Management
            </p>
          </div>
        </div>

        <SidebarContent className="flex-1 overflow-y-auto p-4 space-y-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className=" gap-3">
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <NavLink
                      to={project.navLink}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-2 w-full rounded-lg transition-colors text-sm font-medium ${
                          isActive
                            ? "bg-black text-white hover:bg-black"
                            : "hover:bg-secondary"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <project.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-black'}`} />
                          <span className={isActive ? 'text-white' : 'text-black'}>{project.name}</span>
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <div className="p-4 border-t border-border text-xs text-muted-foreground">
          <p className="font-semibold">Property Manager</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </Sidebar>
    </SidebarProvider>
  );
}
