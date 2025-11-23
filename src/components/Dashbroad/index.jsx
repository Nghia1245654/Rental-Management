import Header from "@/components/Header";
import HeaderContent from "@/components/HeaderContent";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div class="space-y-8">
        <HeaderContent
          title="Dashboard"
          description="Overview of your rental property management"
          showButton={false}
          showSearch={false}
        />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            data-slot="card"
            class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
          >
            <div
              data-slot="card-header"
              class="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <div data-slot="card-title" class="text-sm font-medium">
                Tổng Số Phòng
              </div>
              <div class="p-2 rounded-lg bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-house w-4 h-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </div>
            </div>
            <div data-slot="card-content" class="px-6">
              <div class="text-2xl font-bold">
                <span>6</span>
              </div>
            </div>
          </div>
          <div
            data-slot="card"
            class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
          >
            <div
              data-slot="card-header"
              class="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <div data-slot="card-title" class="text-sm font-medium">
                Tổng Người Thuê
              </div>
              <div class="p-2 rounded-lg bg-green-100 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-users w-4 h-4"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <div data-slot="card-content" class="px-6">
              <div class="text-2xl font-bold">
                <span>5</span>
              </div>
            </div>
          </div>
          <div
            data-slot="card"
            class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
          >
            <div
              data-slot="card-header"
              class="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <div data-slot="card-title" class="text-sm font-medium">
                Tổng Hóa Đơn
              </div>
              <div class="p-2 rounded-lg bg-purple-100 text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-file-text w-4 h-4"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
              </div>
            </div>
            <div data-slot="card-content" class="px-6">
              <div class="text-2xl font-bold">
                ₫<span>263,135,233</span>
              </div>
            </div>
          </div>
          <div
            data-slot="card"
            class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
          >
            <div
              data-slot="card-header"
              class="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <div data-slot="card-title" class="text-sm font-medium">
                Hóa Đơn Chưa Thanh Toán
              </div>
              <div class="p-2 rounded-lg bg-red-100  text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-circle-alert w-4 h-4"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" x2="12" y1="8" y2="12"></line>
                  <line x1="12" x2="12.01" y1="16" y2="16"></line>
                </svg>
              </div>
            </div>
            <div data-slot="card-content" class="px-6">
              <div class="text-2xl font-bold">
                <span>3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
