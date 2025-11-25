import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Edit, Trash2 } from "lucide-react";

export default function DataTable({
  type,              // "bills", "rooms", or "tenants"
  data = [],
  loading,
  handleDelete,
  deleteLoading,
  handleOpenEdit,
  deletingId,
}) {
  const isBills = type === "bills";
  const isRooms = type === "rooms";
  const isTenants = type === "tenants";

  // Function để render bill breakdown
  const renderBillBreakdown = (item) => {
    const electricityUsage = (item.newElectricityIndex || 0) - (item.oldElectricityIndex || 0);
    const electricityCost = electricityUsage * (item.electricityPrice || 0);
    const waterUsage = (item.newWaterIndex || 0) - (item.oldWaterIndex || 0);
    const waterCost = waterUsage * (item.waterPrice || 0);
    
    return (
      <div>
        <div>Electricity: ₫{electricityCost.toLocaleString()}</div>
        <div>Water: ₫{waterCost.toLocaleString()}</div>
        <div>Internet: ₫{(item.internetFee || 0).toLocaleString()}</div>
        <div>Rent: ₫{(item.rent || 0).toLocaleString()}</div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {isBills && (
            <>
              <TableHead>Tenant</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Breakdown</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </>
          )}

          {isRooms && (
            <>
              <TableHead>Room Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </>
          )}

          {isTenants && (
            <>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>ID Card</TableHead>
              <TableHead>Room</TableHead>
            </>
          )}

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item) => (
            <TableRow key={item._id || item.id}>
              {isBills && (
                <>
                  <TableCell className="font-medium">{item.tenantId?.name || "Unknown"}</TableCell>
                  <TableCell>{item.roomId?.name || "Unknown"}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>
                    {renderBillBreakdown(item)}
                  </TableCell>
                  <TableCell className="font-medium">₫{(item.total || 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                </>
              )}

              {/* ROOM ROW */}
              {isRooms && (
                <>
                  <TableCell className="font-medium">{item.name || "No name"}</TableCell>
                  <TableCell className="font-medium">₫{(item.price || 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "occupied"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {item.status === "occupied" ? "Đã Thuê" : "Còn Trống"}
                    </span>
                  </TableCell>
                </>
              )}

              {isTenants && (
                <>
                  <TableCell className="font-medium">{item.name || "No name"}</TableCell>
                  <TableCell className="font-medium">{(item.phone || "Null").toLocaleString()}</TableCell>
                  <TableCell className="font-medium">{(item.idCard || "Null").toLocaleString()}</TableCell>
                  <TableCell>
                    {item.roomId?.name ? (
                      <span className="text-green-600 font-medium">
                        {item.roomId.name}
                      </span>
                    ) : (
                      <span className="text-muted-foreground ">
                        Unassigned
                      </span>
                    )}
                  </TableCell>
                </>
              )}

              {/* COMMON ACTIONS */}
              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id || item.id)}
                    disabled={deleteLoading && deletingId === item._id}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent"
                  >
                    {deleteLoading && deletingId === item._id ? (
                      <Spinner className="w-4 h-4 text-red-600 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 text-red-600" />
                    )}
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}
