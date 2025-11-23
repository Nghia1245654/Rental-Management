import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Edit, Trash2 } from "lucide-react";

export function DataTableRooms({ 
  rooms = [], 
  loading, 
  handleDeleteRoom, 
  deleteLoading, 
  handleOpenEditRoom,
  deletingRoomId 
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px] px-6">Name</TableHead>
          <TableHead className="w-[200px] px-6">Price</TableHead>
          <TableHead className="w-[200px] px-6">Status</TableHead>
          <TableHead className="w-[150px] px-6 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-8">
              <div className="flex justify-center items-center">
                <Spinner className="w-8 h-8 text-primary animate-spin" />
              </div>
            </TableCell>
          </TableRow>
        ) : rooms.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
              No rooms available
            </TableCell>
          </TableRow>
        ) : (
          rooms.map((room) => (
            <TableRow key={room._id || room.id}>
              <TableCell className="font-medium px-6">
                {room.name || "No name"}
              </TableCell>
              <TableCell className="px-6">
                ${(room.price || 0).toLocaleString()}
              </TableCell>
              <TableCell className="px-6">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    room.status === "occupied"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {room.status === "occupied" ? "Đã Thuê" : "Còn Trống"}
                </span>
              </TableCell>
              <TableCell className="px-6">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleOpenEditRoom(room)}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room._id || room.id)}
                    disabled={deleteLoading && deletingRoomId === room._id}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent"
                  >
                    {deleteLoading && deletingRoomId === room._id ? (
                      <Spinner className="w-4 h-4 text-red-600 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 text-red-600" />
                    )}
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}