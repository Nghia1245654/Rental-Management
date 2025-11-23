import { DataTable } from "@/components/DataTable";
import DialogCreateBills from "@/components/DialogCreateBills";
import HeaderContent from "@/components/HeaderContent";
import { getDataBills, deleteBills } from "@/services/api/bills";
import { getDataTenants } from "@/services/api/tenants";
import { getDataRooms } from "@/services/api/rooms";
import React, { useEffect, useState } from "react";
import { getSettings } from "@/services/api/settings";
import toast from "react-hot-toast";
import { createBills } from "@/services/api/bills";
import { updateBills } from "@/services/api/bills";
const Bills = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bills, setBills] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [settings, setSettings] = useState([]);
  const [deleteBillId, setDeleteBillId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch tất cả data song song
      const [billsResponse, tenantsResponse, roomsResponse, settingsResponse] =
        await Promise.all([
          getDataBills(),
          getDataTenants(),
          getDataRooms(),
          getSettings(),
        ]);

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
  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenBill = () => {
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
      toast.success("Bill deleted successfully!");
    } catch (error) {
      console.error("Error deleting bill:", error);
    } finally {
      setDeleteBillId(null);
      setDeleteLoading(false);
    }
  };
  const handleCreateBill = async (data) => {
    try {
      const payload = {
        ...data,
        rent: Number(data.rent),
        newWaterIndex: Number(data.newWaterIndex),
        oldWaterIndex: Number(data.oldWaterIndex),
        newElectricityIndex: Number(data.newElectricityIndex),
        oldElectricityIndex: Number(data.oldElectricityIndex),
      };
      setLoading(true);
      console.log("Creating bill with data:", data);
      await createBills(payload);
      console.log("Bill created successfully");
      //reset form
      
      toast.success("Bill created successfully!");
      
      fetchData();
    } catch (error) {
      console.error("Error creating bill:", error.message);
      toast.error("Failed to create bill.", error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const [isEdit, setIsEdit] = useState(false);
  const [idbill, setIdBill] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [editingBill, setEditingBill] = useState(null);
  const handleOpenEditBill = (billData) => {
    setIsEdit(true);
    setEditingBill(billData);
    setIdBill(billData._id);
    setOpen(true);
  };
  const handleUpdateBill = async (data) => {
    try {
      setLoading(true);
      console.log("Updating bill with data:", data);
      
      // Chuẩn bị payload giống như create
      const payload = {
        ...data,
        rent: Number(data.rent),
        newWaterIndex: Number(data.newWaterIndex),
        oldWaterIndex: Number(data.oldWaterIndex),
        newElectricityIndex: Number(data.newElectricityIndex),
        oldElectricityIndex: Number(data.oldElectricityIndex),
      };
      await updateBills(idbill, payload);
      console.log("Bill updated successfully");
      toast.success("Bill updated successfully!");
      fetchData();
    } catch (error) {
      console.error("Error updating bill:", error.message);
      toast.error("Failed to update bill.");
    } finally {
      setLoading(false);
      setIsEdit(false);
      setIdBill(null);
      setEditingBill(null);
      setOpen(false);
    }
  };

  return (
    <div>
      <HeaderContent
        title="Bills Management"
        description="Track and manage rental bills"
        buttonText="Create Bill"
        searchPlaceholder="Search by bill number..."
        onCreate={handleOpenBill}
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
            <DataTable
              bills={bills}
              loading={loading}
              handleDeleteBill={handleDeleteBill}
              deleteLoading={deleteLoading}
              handleOpenEditBill={handleOpenEditBill}
            />
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
        handleCreateBill={handleCreateBill}
        handleUpdateBill={handleUpdateBill}
        handleOpenEditBill={handleOpenEditBill}
        isEdit={isEdit}
        editingBill={editingBill}
      />
    </div>
  );
};

export default Bills;
