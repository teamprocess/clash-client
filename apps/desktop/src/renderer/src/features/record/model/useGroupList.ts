import { useState } from "react";
import {
  type Group,
  GROUP_CATEGORY_FILTERS,
  type GroupCategoryFilter,
  useAllGroupsQuery,
} from "@/entities/group";
import type { Pagination } from "@/shared/api/types";

export const useGroupList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<GroupCategoryFilter>("ALL");

  const {
    data: groupsResponse,
    isLoading,
    refetch,
  } = useAllGroupsQuery(currentPage, selectedCategory);

  const groups: Group[] = groupsResponse?.data?.groups ?? [];
  const pagination: Pagination | null = groupsResponse?.data?.pagination ?? null;

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
    refetch: () => {
      void refetch();
    },
  };
};
