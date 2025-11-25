import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
export default function DialogAddRoom({
  open,
  onOpenChange,
  handleCreateRoom,
  handleUpdateRoom,
  isEdit = false,
  editingRoom = null,
  formRoom = {},
  handleChange,
  loading = false,
}) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEdit ? 'Sửa Phòng' : 'Tạo Phòng Mới'}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          {/* Tên Phòng */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tên Phòng *</label>
            <Input
              placeholder="VD: Phòng 101"
              name="name"
              value={formRoom.name || ''}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Giá + Trạng thái */}
          <div className="grid grid-cols-2 gap-4">
            {/* Giá */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Giá Thuê/Tháng *</label>
              <Input
                type="number"
                placeholder="2500000"
                name="price"
                value={formRoom.price || ''}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>

            {/* Trạng thái */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Trạng Thái *</label>
              <Select
                value={formRoom.status || 'available'}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Còn Trống</SelectItem>
                  <SelectItem value="occupied">Đã Thuê</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mô tả */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Mô Tả</label>
            <Textarea
              placeholder="Mô tả về phòng: diện tích, tiện nghi..."
              className="h-24 resize-none"
              name="description"
              value={formRoom.description || ''}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            disabled={loading}
            onClick={() => isEdit ? handleUpdateRoom(formRoom) : handleCreateRoom(formRoom)}
            type="submit"
            className="w-full h-11"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                {" "}

                <Spinner className="w-5 h-5 text-white" /> 
                <p className="text-white">
                  {isEdit ? "Cập Nhật Phòng" : "Tạo Phòng Mới"}
                </p>
              </div>
            ) : isEdit ? (
              "Cập Nhật Phòng"
            ) : (
              "Tạo Phòng Mới"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
