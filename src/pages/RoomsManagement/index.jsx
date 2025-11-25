import DataTable from "@/components/DataTable";
import HeaderContent from "@/components/HeaderContent";
import React, { useEffect, useState } from "react";
import DialogAddRoom from "@/components/DialogAddRoom";
import { getDataRooms, createRoom, updateRoom, deleteRoom } from "@/services/api/rooms";
import toast from "react-hot-toast";

const RoomsManagement = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [deletingRoomId, setDeletingRoomId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [roomSearch, setRoomSearch] = useState("");
    
    // Edit states
    const [isEdit, setIsEdit] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [roomId, setRoomId] = useState(null);
    
    // Form state
    const [formRoom, setFormRoom] = useState({});
    
    const fetchData = async () => {
        try {
            setLoading(true);
            const roomsResponse = await getDataRooms();
            setRooms(roomsResponse.data.data || []);
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setError(error);
            toast.error("Failed to fetch rooms");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const handleRoomSearchChange = (e) => {
        setRoomSearch(e.target.value);
    };
    
    const handleOpenRoom = () => {
        setIsEdit(false);
        setEditingRoom(null);
        setOpen(true);
    };
    
    const handleCreateRoom = async (data) => {
        try {
            setLoading(true);
            console.log("Creating room with data:", data);
            
            const payload = {
                ...data,
                price: Number(data.price),
            };
            
            await createRoom(payload);
            console.log("Room created successfully");
            toast.success("Room created successfully!");
            fetchData();
        } catch (error) {
            console.error("Error creating room:", error.message);
            const errorMessage = error.response?.data?.message || "Failed to create room.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    
    const handleOpenEditRoom = (roomData) => {
        setIsEdit(true);
        setEditingRoom(roomData);
        setRoomId(roomData._id);
        setFormRoom({
            name: roomData.name || '',
            price: roomData.price || '',
            status: roomData.status || 'available',
            description: roomData.description || ''
        });
        setOpen(true);
    };
    
    const handleUpdateRoom = async (data) => {
        try {
            setLoading(true);
            console.log("Updating room with data:", data);
            
            const payload = {
                ...data,
                price: Number(data.price),
            };
            
            await updateRoom(roomId, payload);
            console.log("Room updated successfully");
            toast.success("Room updated successfully!");
            fetchData();
        } catch (error) {
            console.error("Error updating room:", error.message);
            const errorMessage = error.response?.data?.message || "Failed to update room.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            setIsEdit(false);
            setRoomId(null);
            setEditingRoom(null);
            setOpen(false);
        }
    };
    
    const handleDeleteRoom = async (id) => {
        setDeletingRoomId(id);
        try {
            setDeleteLoading(true);
            console.log("Deleting room with ID:", id);
            await deleteRoom(id);
            console.log("Room deleted successfully");
            setRooms(rooms.filter((room) => room._id !== id));
            toast.success("Room deleted successfully!");
        } catch (error) {
            console.error("Error deleting room:", error.message);
            const errorMessage = error.response?.data?.message || "Failed to delete room.";
            toast.error(errorMessage);
        } finally {
            setDeletingRoomId(null);
            setDeleteLoading(false);
        }
    };
    
    const handleChange = (name, value) => {
        setFormRoom({
            ...formRoom,
            [name]: value,
        });
    };
    
    // Reset form khi dialog đóng
    useEffect(() => {
        if (!open) {
            setFormRoom({});
        }
    }, [open]);
    
    // Filter rooms based on search
    const filteredRooms = rooms.filter(room => 
        room.name?.toLowerCase().includes(roomSearch.toLowerCase()) ||
        room.description?.toLowerCase().includes(roomSearch.toLowerCase())
    );
  return (
    <div>
      <HeaderContent 
        title="Rooms Management"
        description="Manage your rental rooms"
        buttonText="Create Room"
        searchPlaceholder="Search by room name..."
        searchTitle= "Rooms"
        searchValue={roomSearch}
        onSearchChange={handleRoomSearchChange}
        onCreate={handleOpenRoom}
        showSearch={true}
        showButton={true}
      />
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
        <div
          data-slot="card-header"
          className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
        >
          <div data-slot="card-title" className="leading-none font-semibold">
            All Rooms 
          </div>
        </div>
        <div className="px-6">
          <div className="rounded-lg border">
            <DataTable
              type="rooms"
              data={filteredRooms}
              loading={loading}
              handleOpenEdit={handleOpenEditRoom}
              handleDelete={handleDeleteRoom}
              deleteLoading={deleteLoading}
              deletingId={deletingRoomId}
            />
          </div>
        </div>
      </div>
      <DialogAddRoom
        open={open}
        onOpenChange={setOpen}
        handleCreateRoom={handleCreateRoom}
        handleUpdateRoom={handleUpdateRoom}
        isEdit={isEdit}
        editingRoom={editingRoom}
        formRoom={formRoom}
        handleChange={handleChange}
        loading={loading}
      />
    </div>
  );
};

export default RoomsManagement;
