import DataTable from "@/components/DataTable";
import HeaderContent from "@/components/HeaderContent";
import React, { useEffect, useState } from "react";
import DialogAddTenant from "@/components/DialogAddTenant";
import { getDataTenants, createTenant, updateTenant, deleteTenant } from "@/services/api/tenants";
import toast from "react-hot-toast";
import { getDataRooms } from "@/services/api/rooms";


const Tenants = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tenants, setTenants] = useState([]);
    const [deletingTenantId, setDeletingTenantId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [tenantSearch, setTenantSearch] = useState("");
        const [rooms, setRooms] = useState([]);
    // Edit states
    const [isEdit, setIsEdit] = useState(false);
    const [editingTenant, setEditingTenant] = useState(null);
    const [tenantId, setTenantId] = useState(null);
    
    // Form state
    const [formTenant, setFormTenant] = useState({});
    
    const fetchData = async () => {
        try {
            setLoading(true);
            const tenantsResponse = await getDataTenants();
            setTenants(tenantsResponse.data.data || []);
            const roomsResponse = await getDataRooms();
            setRooms(roomsResponse.data.data || []);
        } catch (error) {
            console.error("Error fetching tenants:", error);
            setError(error);
            
            let errorMessage = "Failed to fetch tenants";
            if (error.request) {
                errorMessage = "Network error. Please check your connection.";
            } else if (error.response) {
                errorMessage = error.response.data?.message || errorMessage;
            }
            
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const handleTenantSearchChange = (e) => {
        setTenantSearch(e.target.value);
    };
    
    const handleOpenTenant = () => {
        setIsEdit(false);
        setEditingTenant(null);
        setOpen(true);
    };
    
    const handleCreateTenant = async (data) => {
        try {
            setLoading(true);
            console.log("Creating tenant with data:", data);
            
            const payload = {
                name: data.name,
                phone: data.phone,
                email: data.email,
                idCard: String(data.idCard),
                note: data.note || '',
                roomId: data.roomId === 'UNASSIGNED' ? null : (typeof data.roomId === 'object' ? data.roomId?._id : data.roomId),
                status: data.status || 'active',
                moveInDate: data.moveInDate || "",
                moveOutDate: data.moveOutDate || "",
            };
            
            await createTenant(payload);
            console.log("Tenant created successfully");
            toast.success("Tenant created successfully!");
            fetchData();
        } catch (error) {
            console.error("Error creating tenant:", error);
            let errorMessage = "Failed to create tenant";
            
            if (error.response) {
                // Server responded with error status
                errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
            } else if (error.request) {
                // Network error (CORS, etc.)
                errorMessage = "Network error. Please check your connection.";
            } else {
                // Other error
                errorMessage = error.message || errorMessage;
            }
            
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    
    const handleOpenEditTenant = (tenantData) => {
        setIsEdit(true);
        setEditingTenant(tenantData);
        setTenantId(tenantData._id);
        setFormTenant({
            name: tenantData.name || '',
            phone: tenantData.phone || '',
            email: tenantData.email || '',
            note: tenantData.note || '',
            idCard: tenantData.idCard || '',
            roomId: tenantData.roomId ? (typeof tenantData.roomId === 'object' ? tenantData.roomId._id : tenantData.roomId) : 'UNASSIGNED',
            status: tenantData.status || 'active',
            moveInDate: tenantData.moveInDate ? tenantData.moveInDate.split('T')[0] : '',
            moveOutDate: tenantData.moveOutDate ? tenantData.moveOutDate.split('T')[0] : ''
        });
        setOpen(true);
    };
    
    const handleUpdateTenant = async (data) => {
        try {
            setLoading(true);
            console.log("Updating tenant with data:", data);
            
            const payload = {
                name: data.name,
                phone: data.phone,
                email: data.email,
                idCard: String(data.idCard),
                note: data.note || '',
                roomId: data.roomId === 'UNASSIGNED' ? null : (typeof data.roomId === 'object' ? data.roomId?._id : data.roomId),
                status: data.status || 'active',
                moveInDate: data.moveInDate || "",
                moveOutDate: data.moveOutDate || "",
            };
            
            await updateTenant(tenantId, payload);
            console.log("Tenant updated successfully");
            toast.success("Tenant updated successfully!");
            fetchData();
        } catch (error) {
            console.error("Error updating tenant:", error);
            let errorMessage = "Failed to update tenant";
            
            if (error.response) {
                // Server responded with error status
                errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
            } else if (error.request) {
                // Network error (CORS, etc.)
                errorMessage = "Network error. Please check your connection.";
            } else {
                // Other error
                errorMessage = error.message || errorMessage;
            }
            
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            setIsEdit(false);
            setTenantId(null);
            setEditingTenant(null);
            setOpen(false);
        }
    };
    
    const handleDeleteTenant = async (id) => {
        setDeletingTenantId(id);
        try {
            setDeleteLoading(true);
            console.log("Deleting tenant with ID:", id);
            await deleteTenant(id);
            console.log("Tenant deleted successfully");
            setTenants(tenants.filter((tenant) => tenant._id !== id));
            toast.success("Tenant deleted successfully!");
        } catch (error) {
            console.error("Error deleting tenant:", error);
            let errorMessage = "Failed to delete tenant";
            
            if (error.response) {
                // Server responded with error status
                errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
            } else if (error.request) {
                // Network error (CORS, etc.)
                errorMessage = "Network error. Please check your connection.";
            } else {
                // Other error
                errorMessage = error.message || errorMessage;
            }
            
            toast.error(errorMessage);
        } finally {
            setDeletingTenantId(null);
            setDeleteLoading(false);
        }
    };
    
    const handleChange = (name, value) => {
        setFormTenant({
            ...formTenant,
            [name]: value,
        });
    };
    
    // Reset form khi dialog đóng
    useEffect(() => {
        if (!open) {
            setFormTenant({});
        }
    }, [open]);
    
    // Filter tenants based on search
    const filteredTenants = tenants.filter(tenant => 
        tenant.name?.toLowerCase().includes(tenantSearch.toLowerCase()) ||
        tenant.phone?.toLowerCase().includes(tenantSearch.toLowerCase())
    );
  return (
    <div>
      <HeaderContent 
        title="Tenants Management"
        description="Manage your tenants"
        buttonText="Create Tenant"
        searchPlaceholder="Search by name, phone, email..."
        searchTitle="Tenants"
        searchValue={tenantSearch}
        onSearchChange={handleTenantSearchChange}
        onCreate={handleOpenTenant}
        showSearch={true}
        showButton={true}
      />
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
        <div
          data-slot="card-header"
          className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
        >
          <div data-slot="card-title" className="leading-none font-semibold">
            All Tenants
          </div>
        </div>
        <div className="px-6">
          <div className="rounded-lg border">
            <DataTable
              type="tenants"
              data={filteredTenants}
              loading={loading}
              handleOpenEdit={handleOpenEditTenant}
              handleDelete={handleDeleteTenant}
              deleteLoading={deleteLoading}
              deletingId={deletingTenantId}
            />
          </div>
        </div>
      </div>
      <DialogAddTenant
        open={open}
        onOpenChange={setOpen}
        handleCreateTenant={handleCreateTenant}
        handleUpdateTenant={handleUpdateTenant}
        isEdit={isEdit}
        editingTenant={editingTenant}
        formTenant={formTenant}
        handleChange={handleChange}
        rooms={rooms}
        loading={loading}
      />
    </div>
  );
};

export default Tenants;
