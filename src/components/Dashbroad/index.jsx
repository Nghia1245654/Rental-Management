import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
const Dashboard = ({ loading, dashboardData }) => {
  return (
    <div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-6">
              <div className="text-sm font-medium">Tổng Số Phòng</div>
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
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
                  className="lucide lucide-house w-4 h-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </div>
            </div>
            <div className="px-6">
              <div className="text-2xl font-bold">
                {loading ? (
                  "..."
                ) : (
                  <CountUp end={dashboardData.totalRooms} duration={2} />
                )}
              </div>
            </div>
          </div>
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-6">
              <div className="text-sm font-medium">Tổng Người Thuê</div>
              <div className="p-2 rounded-lg bg-green-100 text-green-600">
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
                  className="lucide lucide-users w-4 h-4"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <div className="px-6">
              <div className="text-2xl font-bold">
                {loading ? (
                  "..."
                ) : (
                  <CountUp end={dashboardData.totalTenants} duration={2} />
                )}
              </div>
            </div>
          </div>
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-6">
              <div className="text-sm font-medium">Tổng Doanh Thu</div>
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
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
                  className="lucide lucide-dollar-sign w-4 h-4"
                >
                  <line x1="12" x2="12" y1="2" y2="22"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div className="px-6">
              <div className="text-2xl font-bold">
                {loading ? (
                  "..."
                ) : (
                  <>
                    ₫<CountUp end={dashboardData.totalRevenue} duration={2} />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 px-6">
              <div className="text-sm font-medium">Hóa Đơn Chưa Thanh Toán</div>
              <div className="p-2 rounded-lg bg-red-100 text-red-600">
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
                  className="lucide lucide-circle-alert w-4 h-4"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" x2="12" y1="8" y2="12"></line>
                  <line x1="12" x2="12.01" y1="16" y2="16"></line>
                </svg>
              </div>
            </div>
            <div className="px-6">
              <div className="text-2xl font-bold">
                {loading ? (
                  "..."
                ) : (
                  <CountUp end={dashboardData.unpaidBills} duration={2} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
