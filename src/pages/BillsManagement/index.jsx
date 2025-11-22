import { DataTable } from "@/components/DataTable";
import DialogCreateBills from "@/components/DialogCreateBills";
import HeaderContent from "@/components/HeaderContent";
import { getDataBills, deleteBills } from "@/services/api/bills";
import { getDataTenants } from "@/services/api/tenants";
import { getDataRooms } from "@/services/api/rooms";
import React, { useEffect, useState } from "react";
import { getSettings } from "@/services/api/settings";

const Bills = () => {
  const [open , setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bills, setBills] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [settings, setSettings] = useState([]);
  const [deleteBillId, setDeleteBillId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch tất cả data song song
        const [billsResponse, tenantsResponse, roomsResponse, settingsResponse] = await Promise.all([
          getDataBills(),
          getDataTenants(),
          getDataRooms(),
          getSettings(),
        ]);
        
        console.log("Bills Response:", billsResponse); // Debug log
        console.log("Tenants Response:", tenantsResponse); // Debug log
        console.log("Rooms Response:", roomsResponse); // Debug log
        console.log("Settings Response:", settingsResponse); // Debug log
        
        setBills(billsResponse.data.data || []);
        setTenants(tenantsResponse.data.data || []);
        setRooms(roomsResponse.data.data || []);
        setSettings(settingsResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error); // Debug log
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
 
  const handleCreateBill = () => {
    setOpen(true);
  };
  const handleDeleteBill = async (Id) => {
    setDeleteBillId(Id);
    try {
      setDeleteLoading(true);
      console.log("Deleting bill with ID:", Id); // Debug log
      await deleteBills(Id);
      console.log("Bill deleted successfully"); // Debug log
      setBills(bills.filter((bill) => bill._id !== Id));
    } catch (error) {
      console.error("Error deleting bill:", error);
    } finally {
      setDeleteBillId(null);
      setDeleteLoading(false);
    }
  };
  return (
    <div>
      <HeaderContent
        title="Bills Management"
        description="Track and manage rental bills"
        buttonText="Create Bill"
        searchPlaceholder="Search by bill number..."
        onCreate={handleCreateBill}
        showSearch={false}
        showButton={true}
      />
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
        <div
          data-slot="card-header"
          className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 font-semibold"
        >
            All Bills
        </div>
        <div className="px-6">
          <div className="rounded-lg border">
            <DataTable data={bills} loading={loading} handleDeleteBill={handleDeleteBill} deleteLoading={deleteLoading} />
          </div>
        </div>
      </div>
      <DialogCreateBills 
        open={open} 
        onOpenChange={setOpen} 
        data={bills} 
        tenants={tenants}
        rooms={rooms}
        settings={settings}
      />
    </div>
  );
};

export default Bills;
