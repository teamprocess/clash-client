import { useState, useEffect } from "react";
import {
  GROUP_CATEGORY_FILTERS,
  type Group,
  type GroupCategoryFilter,
  groupApi,
} from "@/entities/group";
import type { Pagination } from "@/shared/api/types";
import axios from "axios";

export const useGroupList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<GroupCategoryFilter>("ALL");

  const fetchGroups = async (page: number, category: GroupCategoryFilter) => {
    try {
      setIsLoading(true);
      const result = await groupApi.getAllGroups(page, 6, category);

      if (result.success && result.data) {
        setGroups(result.data.groups);
        setPagination(result.data.pagination);
      } else {
        console.error("그룹 목록 조회 실패:", result.message);
      }
    } catch (error: unknown) {
      console.error("그룹 목록 조회 실패:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "그룹 목록 조회 중 오류가 발생했습니다.";
        console.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: GroupCategoryFilter) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로
  };

  return {
    groups: groups,
    pagination,
    isLoading,
    currentPage,
    selectedCategory,
    categoryOptions: GROUP_CATEGORY_FILTERS,
    handlePageChange,
    handleCategoryChange,
    refetch: () => fetchGroups(currentPage, selectedCategory),
  };
};
