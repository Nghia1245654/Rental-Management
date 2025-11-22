import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from "@/components/ui/select";

export default function DialogCreateBills ({ open, onOpenChange, data = [], tenants = [], rooms = [], settings = {}, onSubmit }) {
  // Debug logs
  console.log("DialogCreateBills - settings:", settings);
  console.log("DialogCreateBills - settings type:", typeof settings);
  console.log("DialogCreateBills - settings has _id:", settings._id);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
  
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto  ">
        <DialogHeader className="">
          <DialogTitle>Tạo Hóa Đơn Mới</DialogTitle>
        </DialogHeader>

        <form className="space-y-6">

          <section className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Thông Tin Cơ Bản
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Người Thuê *</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn người thuê" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant._id} value={tenant._id}>
                        {tenant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phòng *</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room._id} value={room._id}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tháng *</label>
              <Input 
                className="w-full"
                type="month" 
                defaultValue="2025-11" 
                name="month" 
              />
            </div>
          </section>

          {settings && settings._id && (
            <section key={settings._id} className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Chỉ Số Điện Nước
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Chỉ Số Cũ (kWh)</label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    defaultValue="0" 
                    name="oldElectricityIndex"
                  />
                  <p className="text-sm text-muted-foreground">₫{settings.electricityPrice || 4000}/kWh</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Chỉ Số Mới (kWh)</label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    defaultValue="0" 
                    name="newElectricityIndex"
                  />
                  <p className="text-sm text-muted-foreground">₫{settings.electricityPrice || 4000}/kWh</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Chỉ Số Cũ (m³)</label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    defaultValue="0" 
                    name="oldWaterIndex"
                  />
                  <p className="text-sm text-muted-foreground">₫{settings.waterPrice || 15002}/m³</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Chỉ Số Mới (m³)</label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    defaultValue="0" 
                    name="newWaterIndex"
                  />
                  <p className="text-sm text-muted-foreground">₫{settings.waterPrice || 15002}/m³</p>
                </div>
              </div>
            </section>
          )}

          <section className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Thanh Toán
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tiền Thuê Phòng *</label>
                <Input type="number" placeholder="2500000" defaultValue="0" name="rent" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Trạng Thái *</label>
                <Select defaultValue="unpaid">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Đã Thanh Toán</SelectItem>
                    <SelectItem value="unpaid">Chưa Thanh Toán</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="space-y-2 border-t pt-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Ghi Chú
            </h3>
            <Textarea
              placeholder="Ghi chú thêm về hóa đơn..."
              className="h-20 resize-none"
            />
          </section>

        </form>

        <DialogFooter>
          <Button onClick={onSubmit} type="submit" className="w-full h-11">
            Tạo Hóa Đơn Mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
