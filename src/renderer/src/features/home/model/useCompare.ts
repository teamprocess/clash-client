import { useEffect, useState } from "react";
import { CompareResponse } from "@/entities/home/model/useCompare.types";
import { compareApi } from "@/entities/home/api/compareApi";

export const getGrowthInfo = (yesterday: number, today: number) => {
  const diff = today - yesterday;

  if (diff > 0) return { status: "up", deg: 180, value: Math.round(diff * 10) / 10 };
  if (diff < 0) return { status: "down", deg: 0, value: Math.abs(Math.round(diff * 10) / 10) };
  return { status: "same", deg: null, value: "-" };
};

export const useCompare = () => {
  // const [compareDropdown, setCompareDropdown] = useState("Github");

  const [compareData, setCompareData] = useState<CompareResponse | null>(null);

  useEffect(() => {
    const fetchCompare = async () => {
      try {
        const response = await compareApi.getCompare();
        if (!response.data) return;
        setCompareData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompare();
  }, []);

  return {
    // compareDropdown,
    // setCompareDropdown,
    compareData,
  };
};
