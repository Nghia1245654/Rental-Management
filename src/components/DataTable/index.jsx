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

export function DataTable({ data = [], loading ,handleDeleteBill ,deleteLoading }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[290px]">Tenant</TableHead>
          <TableHead className="w-[195px] text-left">Room</TableHead>
          <TableHead className="w-[142px] text-left">Month</TableHead>
          <TableHead className="w-[319px] text-left">Breakdown</TableHead>
          <TableHead className="w-[233px] text-left">Total</TableHead>
          <TableHead className="w-[149px] text-left">Status</TableHead>
          <TableHead className="text-left">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              <div className="flex justify-center items-center">
                <Spinner className="w-8 h-8 text-primary animate-spin" />
              </div>
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => {
            const electricityUsage = (item.newElectricityIndex || 0) - (item.oldElectricityIndex || 0);
            const electricityCost = electricityUsage * (item.electricityPrice || 0);
            const waterUsage = (item.newWaterIndex || 0) - (item.oldWaterIndex || 0);
            const waterCost = waterUsage * (item.waterPrice || 0);

            return (
              <TableRow key={item._id || item.id}>
                <TableCell className="font-medium">
                  {item.tenantId?.name || "Unknown"}
                </TableCell>
                <TableCell>
                  {item.roomId?.name || "Unknown"}
                </TableCell>
                <TableCell>{item.month}</TableCell>
                <TableCell className="text-left">
                  <div>Electricity: ₫{electricityCost.toLocaleString()}</div>
                  <div>Water: ₫{waterCost.toLocaleString()}</div>
                  <div>Internet: ₫{(item.internetFee || 0).toLocaleString()}</div>
                  <div>Rent: ₫{(item.rent || 0).toLocaleString()}</div>
                </TableCell>
                <TableCell className="text-left">
                  <b>₫{(item.total || 0).toLocaleString()}</b>
                </TableCell>
                <TableCell className="text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex gap-2">
                    <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => {
                        handleDeleteBill(item._id || item.id);
                      }} 
                      className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent"
                    >{deleteLoading ? (
                      <Spinner className="w-4 h-4 text-red-600 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 text-red-600" />
                    )}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
