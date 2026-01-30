import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GROUP_CATEGORIES, type GroupCategory, groupApi } from "@/entities/group";
import axios from "axios";

const groupEditSchema = z.object({
  name: z.string().min(1, "그룹 이름을 입력하세요."),
  password: z.string().optional(),
  type: z.enum(GROUP_CATEGORIES),
  maxMembers: z
    .number({ message: "숫자를 입력하세요." })
    .min(1, "최대 인원은 1명 이상이어야 합니다.")
    .max(100, "최대 인원은 100명 이하이어야 합니다."),
  description: z.string().min(1, "그룹 설명을 입력하세요."),
});

export type GroupEditFormData = z.infer<typeof groupEditSchema>;

export const useGroup = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState<"delete" | "quit">("quit");
  const [editPasswordRequired, setEditPasswordRequired] = useState(false);
  const [isEditPasswordChangeEnabled, setIsEditPasswordChangeEnabled] = useState(false);
  const [hasEditPassword, setHasEditPassword] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [joinPassword, setJoinPassword] = useState<string>("");
  const [currentGroupId, setCurrentGroupId] = useState<number | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  // 그룹 생성 폼
  const createForm = useForm<GroupEditFormData>({
    resolver: zodResolver(groupEditSchema),
    defaultValues: {
      name: "",
      password: "",
      type: "CLUB",
      maxMembers: 40,
      description: "",
    },
  });

  // 그룹 수정 폼
  const editForm = useForm<GroupEditFormData>({
    resolver: zodResolver(groupEditSchema),
    defaultValues: {
      name: "",
      password: "",
      type: "CLUB",
      maxMembers: 40,
      description: "",
    },
  });

  const createSelectedType = useWatch({
    control: createForm.control,
    name: "type",
  }) as GroupCategory | undefined;

  const editSelectedType = useWatch({
    control: editForm.control,
    name: "type",
  }) as GroupCategory | undefined;

  const handleMoreClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
    createForm.reset({
      name: "",
      password: "",
      type: "CLUB",
      maxMembers: 40,
      description: "",
    });
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    createForm.reset();
  };

  const handleEditGroupRequest = async () => {
    if (!currentGroupId) {
      console.error("수정할 그룹 ID가 없습니다.");
      return;
    }

    setIsMenuOpen(false);

    try {
      const result = await groupApi.getGroupDetail(currentGroupId);

      if (result.success && result.data) {
        const { group } = result.data;
        editForm.reset({
          name: group.name,
          password: group.passwordRequired ? "********" : "",
          type: group.category,
          maxMembers: group.maxMembers,
          description: group.description,
        });
        setEditPasswordRequired(group.passwordRequired);
        setHasEditPassword(group.passwordRequired);
        setIsEditPasswordChangeEnabled(!group.passwordRequired);
        setIsEditModalOpen(true);
      } else {
        console.error("그룹 상세 조회 실패:", result.message);
      }
    } catch (error: unknown) {
      console.error("그룹 상세 조회 실패:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "그룹 상세 조회 중 오류가 발생했습니다.";
        console.error(errorMessage);
      }
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditPasswordRequired(false);
    setIsEditPasswordChangeEnabled(false);
    setHasEditPassword(false);
    editForm.reset();
  };

  const handleDeleteGroupRequest = (action: "delete" | "quit") => {
    setIsMenuOpen(false);
    setDeleteAction(action);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!currentGroupId) {
      console.error("처리할 그룹 ID가 없습니다.");
      return;
    }

    try {
      const isDelete = deleteAction === "delete";
      const result = isDelete
        ? await groupApi.deleteGroup(currentGroupId)
        : await groupApi.quitGroup(currentGroupId);

      if (result.success) {
        setIsDeleteModalOpen(false);
        setCurrentGroupId(null);
      } else {
        console.error(`그룹 ${deleteAction === "delete" ? "삭제" : "탈퇴"} 실패:`, result.message);
      }
    } catch (error: unknown) {
      console.error(`그룹 ${deleteAction === "delete" ? "삭제" : "탈퇴"} 실패:`, error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          `그룹 ${deleteAction === "delete" ? "삭제" : "탈퇴"} 중 오류가 발생했습니다.`;
        console.error(errorMessage);
      }
    }
  };

  const handleCreateTypeSelect = (type: GroupCategory) => {
    createForm.setValue("type", type);
  };

  const handleEditTypeSelect = (type: GroupCategory) => {
    editForm.setValue("type", type);
  };

  const handleEditPasswordChangeClick = () => {
    setIsEditPasswordChangeEnabled(true);
    editForm.setValue("password", "");
  };

  const handleCreateSubmit = async (data: GroupEditFormData) => {
    try {
      const result = await groupApi.createGroup({
        name: data.name,
        description: data.description,
        maxMembers: data.maxMembers,
        category: data.type,
        passwordRequired: !!data.password,
        password: data.password,
      });

      if (result.success) {
        setIsFormModalOpen(false);
        createForm.reset();
      } else {
        console.error("그룹 생성 실패:", result.message);
      }
    } catch (error: unknown) {
      console.error("그룹 생성 실패:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "그룹 생성 중 오류가 발생했습니다.";
        console.error(errorMessage);
      }
    }
  };

  const handleJoinSubmit = async (groupId: number, password?: string) => {
    try {
      setIsJoining(true);
      const result = await groupApi.joinGroup(groupId, password ? { password } : undefined);

      if (result.success) {
        setIsFormModalOpen(false);
        setSelectedGroupId(null);
        setJoinPassword("");
      } else {
        console.error("그룹 참여 실패:", result.message);
      }
    } catch (error: unknown) {
      console.error("그룹 참여 실패:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "그룹 참여 중 오류가 발생했습니다.";
        console.error(errorMessage);
      }
    } finally {
      setIsJoining(false);
    }
  };

  const handleEditSubmit = async (data: GroupEditFormData) => {
    if (!currentGroupId) {
      console.error("수정할 그룹 ID가 없습니다.");
      return;
    }

    try {
      const nextPassword = isEditPasswordChangeEnabled ? (data.password ?? "") : "";
      const passwordRequired = editPasswordRequired || nextPassword.length > 0;
      const result = await groupApi.updateGroup(currentGroupId, {
        name: data.name,
        description: data.description,
        maxMembers: data.maxMembers,
        category: data.type,
        passwordRequired,
        password: nextPassword,
      });

      if (result.success) {
        setIsEditModalOpen(false);
        editForm.reset();
      } else {
        console.error("그룹 수정 실패:", result.message);
      }
    } catch (error: unknown) {
      console.error("그룹 수정 실패:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "그룹 수정 중 오류가 발생했습니다.";
        console.error(errorMessage);
      }
    }
  };

  const formModal = {
    isOpen: isFormModalOpen,
    onClose: handleCloseFormModal,
    onCreateSubmit: createForm.handleSubmit(handleCreateSubmit),
    onJoinSubmit: handleJoinSubmit,
    createRegister: createForm.register,
    createErrors: createForm.formState.errors,
    isCreating: createForm.formState.isSubmitting,
    isJoining: isJoining,
    selectedType: createSelectedType,
    onTypeSelect: handleCreateTypeSelect,
    selectedGroupId,
    setSelectedGroupId,
    joinPassword,
    setJoinPassword,
  };

  const editModal = {
    isOpen: isEditModalOpen,
    onClose: handleCloseEditModal,
    onSubmit: editForm.handleSubmit(handleEditSubmit),
    register: editForm.register,
    errors: editForm.formState.errors,
    isSubmitting: editForm.formState.isSubmitting,
    selectedType: editSelectedType,
    onTypeSelect: handleEditTypeSelect,
    onPasswordChangeClick: handleEditPasswordChangeClick,
    isPasswordChangeEnabled: isEditPasswordChangeEnabled,
    showPasswordChangeButton: hasEditPassword,
  };

  const deleteModal = {
    isOpen: isDeleteModalOpen,
    onClose: handleCancelDelete,
    onConfirm: handleConfirmDelete,
    action: deleteAction,
  };

  return {
    menuRef,
    isMenuOpen,
    handleMoreClick,
    // 그룹 생성/참여 모달
    handleOpenFormModal,
    // 그룹 수정 모달
    handleEditGroupRequest,
    // 그룹 삭제 모달
    handleDeleteGroupRequest,
    formModal,
    editModal,
    deleteModal,
    setCurrentGroupId,
  };
};

export type UseGroupReturn = ReturnType<typeof useGroup>;
export type GroupFormModalProps = UseGroupReturn["formModal"];
export type GroupEditModalProps = UseGroupReturn["editModal"];
export type GroupDeleteModalProps = UseGroupReturn["deleteModal"];
