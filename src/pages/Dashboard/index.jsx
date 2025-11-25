import React from 'react'
import Dashboard from '@/components/Dashbroad'
import HeaderContent from "@/components/HeaderContent";
import { getDataBills } from "@/services/api/bills";
import { getDataTenants } from "@/services/api/tenants";
import { getDataRooms } from "@/services/api/rooms";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
const DashboardManagement = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalRooms: 0,
    totalTenants: 0,
    totalBills: 0,
    totalRevenue: 0,
    unpaidBills: 0
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [billsResponse, tenantsResponse, roomsResponse] = await Promise.all([
        getDataBills(),
        getDataTenants(),
        getDataRooms(),
      ]);

      const bills = billsResponse.data.data || [];
      const tenants = tenantsResponse.data.data || [];
      const rooms = roomsResponse.data.data || [];

      // tính tổng doanh thu chưa thanh toán
      const totalRevenue = bills.reduce((sum, bill) => sum + (bill.total || 0), 0);
      const unpaidBills = bills.filter(bill => bill.status !== 'paid').length;

      setDashboardData({
        totalRooms: rooms.length,
        totalTenants: tenants.length,
        totalBills: bills.length,
        totalRevenue,
        unpaidBills
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      const errorMessage = error.response?.data?.message || "Unknown error";
      toast.error(`Error fetching dashboard data: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <div>
          <HeaderContent
         title="Dashboard"
        description="Overview of your rental property management"
        showSearch={false}
        showButton={false}
        />
      <Dashboard
        loading={loading}
        dashboardData={dashboardData}
      />
    </div>
  )
}

export default DashboardManagement
