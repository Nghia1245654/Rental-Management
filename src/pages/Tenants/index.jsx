import { DataTable } from "@/components/DataTable";
import HeaderContent from "@/components/HeaderContent";
import React from "react";

const Tenants = () => {
    const [tenantSearch, setTenantSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const handleTenantSearchChange = (e) => {
        setTenantSearch(e.target.value);
    }
    const handleCreateTenant = () => {
        // Logic to handle tenant creation
        console.log("Create Tenant button clicked");
    }
  return (
    <div>
      <HeaderContent 
        title="Tenants Management"
        description="Manage your tenants"
        buttonText="Add Tenant"
        searchPlaceholder="Search by name or phone..."
        searchValue={tenantSearch}
        onSearchChange={handleTenantSearchChange}
        onCreate={handleCreateTenant}
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
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tenants;
