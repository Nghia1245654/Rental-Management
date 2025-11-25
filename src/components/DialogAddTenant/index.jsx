import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
export default function DialogAddTenant({
  open,
  onOpenChange,
  handleCreateTenant,
  handleUpdateTenant,
  isEdit = false,
  editingTenant = null,
  formTenant = {},
  handleChange,
  rooms = [],
  loading = false,
}) {
  

  console.log("formTenant:", formTenant);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEdit ? "Sửa Người Thuê" : "Tạo Người Thuê Mới"}
          </DialogTitle>
        </DialogHeader>

        {/* Thông tin cơ bản */}
        <section className="space-y-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Thông Tin Cơ Bản
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Họ và Tên *</Label>
              <Input
                placeholder="Nguyễn Văn A"
                name="name"
                value={formTenant.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Số Điện Thoại *</Label>
              <Input
                placeholder="0987654321"
                name="phone"
                value={formTenant.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@email.com"
                name="email"
                value={formTenant.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>CMND/CCCD *</Label>
              <Input
                className="w-full"
                placeholder="079123456789"
                name="idCard"
                value={formTenant.idCard || ""}
                onChange={(e) => handleChange("idCard", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Phòng & Trạng thái */}
        <section className="space-y-4 border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Phòng & Trạng Thái
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Select phòng */}
            <div className="grid gap-2">
              <Label>Phòng</Label>
              <Select
                className="w-full"
                name="roomId"
                value={
                  formTenant.roomId?._id || formTenant.roomId || "UNASSIGNED"
                }
                onValueChange={(value) => handleChange("roomId", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chưa gán phòng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UNASSIGNED">Chưa gán phòng</SelectItem>
                  {rooms.map((room) => (
                    <SelectItem key={room._id} value={room._id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Select trạng thái */}
            <div className="grid gap-2">
              <Label>Trạng Thái</Label>
              <Select
                name="status"
                value={formTenant.status || "active"}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Đang Thuê" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang Thuê</SelectItem>
                  <SelectItem value="moved_out">Đã Trả Phòng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Ngày tháng */}
        <section className="space-y-4 border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Ngày Tháng
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Ngày Vào Ở</Label>
              <Input
                type="date"
                name="moveInDate"
                value={formTenant.moveInDate || ""}
                onChange={(e) => handleChange("moveInDate", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Ngày Trả Phòng</Label>
              <Input
                type="date"
                name="moveOutDate"
                value={formTenant.moveOutDate || ""}
                onChange={(e) => handleChange("moveOutDate", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Ghi chú */}
        <section className="space-y-4 border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Ghi Chú
          </h3>
          <Textarea
            className="w-full"
            placeholder="Ghi chú thêm về người thuê..."
            name="note"
            value={formTenant.note || ""}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </section>

        <DialogFooter>
          <Button
            disabled={loading}
            onClick={() =>
              isEdit
                ? handleUpdateTenant(formTenant)
                : handleCreateTenant(formTenant)
            }
            type="submit"
            className="w-full h-11"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                {" "}

                <Spinner className="w-5 h-5 text-white" /> 
                <p className="text-white">
                  {isEdit ? "Cập Nhật Người Thuê" : "Thêm Người Thuê Mới"}
                </p>
              </div>
            ) : isEdit ? (
              "Cập Nhật Người Thuê"
            ) : (
              "Tạo Người Thuê Mới"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
