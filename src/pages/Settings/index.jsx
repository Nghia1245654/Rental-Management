import { DataTable } from "@/components/DataTable";
import HeaderContent from "@/components/HeaderContent";
import SettingsPanel from "@/components/SettingsPanel";
import { getSettings, updateSettings as updateSettingsAPI } from "@/services/api/settings";
import React from "react";
import { useEffect, useState } from "react";

export function Settings() {
 
  const [dataSettings, setDataSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        console.log("Fetching settings..."); // Debug log
        const response = await getSettings();
        console.log("API Response:", response.data); // Debug log
        setDataSettings(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
        console.log("Loading finished"); // Debug log
      }
    };
    
    fetchSettings();
  }, []);

  const [dataForm, setDataForm] = useState({
    electricityPrice: "",
    waterPrice: "",
    internetFee: "",
    cleaningFee: ""
  });
  
  useEffect(() => {
    if (dataSettings && Object.keys(dataSettings).length > 0) {
      console.log("Updating dataForm with:", dataSettings);
      setDataForm({
        electricityPrice: dataSettings.electricityPrice || "",
        waterPrice: dataSettings.waterPrice || "",
        internetFee: dataSettings.internetFee || "",
        cleaningFee: dataSettings.cleaningFee || "",
      });
    }
  }, [dataSettings]);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        electricityPrice: Number(dataForm.electricityPrice),
        waterPrice: Number(dataForm.waterPrice),
        internetFee: Number(dataForm.internetFee),
        cleaningFee: Number(dataForm.cleaningFee),
      };
      
      console.log("Submitting payload:", payload); // Debug log
      const res = await updateSettingsAPI(payload); // ✅ Gọi API thật
      console.log("API Update Response:", res.data); // Debug log
      
      // toast.success("Settings updated successfully!");
      setDataForm(res.data);
    } catch (error) {
      console.error("Error updating settings:", error);
      // toast.error("Error updating settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <HeaderContent
        title="Settings"
        description="Manage your system preferences and pricing"
        buttonText="Create Bill"
        searchPlaceholder="Search by bill number..."
        searchValue={""}
        onSearchChange={""}
        onCreate={""}
        showSearch={false}
        showButton={false}
      />
      <SettingsPanel 
        dataForm={dataForm} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        loading={loading} 
      />
      
    
    </div>
  );
};

export default Settings;
