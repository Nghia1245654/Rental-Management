import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/index.jsx";
import AppSidebar from "../SideBar/index.jsx";
const Layout = () => {
  return (
   <div className="flex h-screen bg-background">
            <div className="fixed lg:static inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transform transition-transform duration-200 ease-in-out lg:translate-x-0 -translate-x-full">
                <AppSidebar />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header/>
                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="space-y-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Layout;
