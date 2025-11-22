import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap, Droplets, Wifi, Sparkles } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function SettingsPanel({ dataForm = {}, handleChange, handleSubmit, loading, dataSettings }) {
  
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="flex flex-col items-center space-y-4">
            <Spinner className="w-8 h-8 text-primary animate-spin" />
          </div>
        </div>
      ) : (
        <Card
          data-slot="card"
          className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-[1180px]"
        >
          <div
            data-slot="card-header"
            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
          >
            <div data-slot="card-title" className="leading-none font-semibold">
              Pricing Configuration
            </div>
            <div data-slot="card-description" className="text-muted-foreground text-sm">
              Set the pricing for utilities and services
            </div>
          </div>

          <div data-slot="card-content" className="px-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Electricity */}
              <div data-slot="form-item" className="grid gap-2">
                <Label
                  data-slot="form-label"
                  htmlFor="_r_2g_-form-item"
                  className="text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-[error=true]:text-destructive flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-yellow-500" /> Electricity Price (₫/kWh)
                </Label>

                <Input
                  id="_r_2g_-form-item"
                  name="electricityPrice"
                  placeholder="3000"
                  type="number"
                  value={dataForm.electricityPrice ?? ""}
                  onChange={handleChange}
                  aria-describedby="_r_2g_-form-item-description"
                  data-slot="form-control"
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive"
                />

                <p
                  id="_r_2g_-form-item-description"
                  data-slot="form-description"
                  className="text-muted-foreground text-sm"
                >
                  Price per kilowatt-hour (kWh)
                </p>
              </div>

              {/* Water */}
              <div data-slot="form-item" className="grid gap-2">
                <Label
                  data-slot="form-label"
                  htmlFor="_r_2h_-form-item"
                  className="text-sm leading-none font-medium select-none flex items-center gap-2"
                >
                  <Droplets className="w-4 h-4 text-blue-500" /> Water Price (₫/m³)
                </Label>

                <Input
                  id="_r_2h_-form-item"
                  name="waterPrice"
                  placeholder="15000"
                  type="number"
                  value={dataForm.waterPrice ?? ""}
                  onChange={handleChange}
                  aria-describedby="_r_2h_-form-item-description"
                  data-slot="form-control"
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                />

                <p
                  id="_r_2h_-form-item-description"
                  data-slot="form-description"
                  className="text-muted-foreground text-sm"
                >
                  Price per cubic meter (m³)
                </p>
              </div>

              {/* Internet */}
              <div data-slot="form-item" className="grid gap-2">
                <Label htmlFor="_r_2i_-form-item" data-slot="form-label" className="flex items-center gap-2 text-sm font-medium">
                  <Wifi className="w-4 h-4 text-purple-500" /> Internet Fee (₫/month)
                </Label>

                <Input
                  id="_r_2i_-form-item"
                  name="internetFee"
                  placeholder="100000"
                  type="number"
                  value={dataForm.internetFee ?? ""}
                  onChange={handleChange}
                  aria-describedby="_r_2i_-form-item-description"
                  data-slot="form-control"
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                />

                <p id="_r_2i_-form-item-description" data-slot="form-description" className="text-muted-foreground text-sm">
                  Monthly internet subscription fee
                </p>
              </div>

              {/* Cleaning */}
              <div data-slot="form-item" className="grid gap-2">
                <Label htmlFor="_r_2j_-form-item" data-slot="form-label" className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-green-500" /> Cleaning Fee (₫/month) - Optional
                </Label>

                <Input
                  id="_r_2j_-form-item"
                  name="cleaningFee"
                  placeholder="50000"
                  type="number"
                  value={dataForm.cleaningFee ?? ""}
                  onChange={handleChange}
                  aria-describedby="_r_2j_-form-item-description"
                  data-slot="form-control"
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                />

                <p id="_r_2j_-form-item-description" data-slot="form-description" className="text-muted-foreground text-sm">
                  Monthly cleaning service fee (optional)
                </p>
              </div>

              <Button
                type="submit"
                className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full"
              >
                Save Settings
              </Button>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
}