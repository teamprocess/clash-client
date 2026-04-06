import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useWatch, type UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  GROUP_CATEGORIES,
  groupApi,
  groupQueryKeys,
  type GroupCategory,
  useGroupDetailQuery,
} from "@/entities/group";
import { getErrorMessage, queryClient } from "@/shared/lib";

export const GROUP_NAME_MAX_LENGTH = 10;
export const GROUP_NAME_MAX_ERROR_MESSAGE = "그룹명은 10자 이하로 입력해주세요.";

const groupEditSchema = z.object({
  name: z
    .string()
    .min(1, "그룹명을 입력해주세요.")
    .max(GROUP_NAME_MAX_LENGTH, GROUP_NAME_MAX_ERROR_MESSAGE),
  password: z.string().optional(),
  type: z.enum(GROUP_CATEGORIES),
  maxMembers: z
    .number({ message: "숫자를 입력하세요." })
    .min(1, "최대 인원은 1명 이상이어야 합니다.")
    .max(100, "최대 인원은 100명 이하이어야 합니다."),
  description: z.string().min(1, "그룹 설명을 입력하세요"),
});

export type GroupEditFormData = z.infer<typeof groupEditSchema>;

const DUPLICATE_GROUP_NAME_MESSAGE = "이미 사용 중인 그룹 이름입니다.";

const applyDuplicateGroupNameError = (
  error: unknown,
  setError: UseFormSetError<GroupEditFormData>
) => {
  if (axios.isAxiosError(error) && error.response?.status === 409) {
    setError("name", {
      type: "server",
      message: DUPLICATE_GROUP_NAME_MESSAGE,
    });
    return true;
  }

  return false;
};

export const useGroup = (currentGroupId: number | null) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState<"delete" | "quit">("quit");
  const [editPasswordRequired, setEditPasswordRequired] = useState(false);
  const [isEditPasswordChangeEnabled, setIsEditPasswordChangeEnabled] = useState(false);
  const [hasEditPassword, setHasEditPassword] = useState(false);
  const [isFormPanelOpen, setIsFormPanelOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [joinPassword, setJoinPassword] = useState<string>("");
  const [isJoining, setIsJoining] = useState(false);
  const [groupDetailTargetId, setGroupDetailTargetId] = useState<number | null>(null);
  const [editTargetGroupId, setEditTargetGroupId] = useState<number | null>(null);
  const [deleteTargetGroupId, setDeleteTargetGroupId] = useState<number | null>(null);
  const { data: groupDetailResponse, error: groupDetailError } =
    useGroupDetailQuery(groupDetailTargetId);

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

  const handleOpenFormPanel = () => {
    setIsFormPanelOpen(true);
    createForm.reset({
      name: "",
      password: "",
      type: "CLUB",
      maxMembers: 40,
      description: "",
    });
  };

  const handleCloseFormPanel = () => {
    setIsFormPanelOpen(false);
    createForm.reset();
  };

  const handleEditGroupRequest = (groupId: number | null = currentGroupId) => {
    if (!groupId) {
      console.error("수정할 그룹 ID가 없습니다.");
      return;
    }

    setEditTargetGroupId(groupId);
    setGroupDetailTargetId(groupId);
  };

  // 그룹 수정 진입 시 최신 상세 데이터로 폼 채우기
  useEffect(() => {
    if (!groupDetailTargetId || !groupDetailResponse) {
      return;
    }

    if (groupDetailResponse.success && groupDetailResponse.data) {
      const { group } = groupDetailResponse.data;
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
      console.error("그룹 상세 조회 실패:", groupDetailResponse.message);
    }

    setGroupDetailTargetId(null);
  }, [editForm, groupDetailTargetId, groupDetailResponse]);

  useEffect(() => {
    if (!groupDetailTargetId || !groupDetailError) {
      return;
    }

    const errorMessage = getErrorMessage(
      groupDetailError,
      "그룹 상세 조회 중 오류가 발생했습니다."
    );
    console.error("그룹 상세 조회 실패:", errorMessage, groupDetailError);

    setGroupDetailTargetId(null);
  }, [groupDetailTargetId, groupDetailError]);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditPasswordRequired(false);
    setIsEditPasswordChangeEnabled(false);
    setHasEditPassword(false);
    setEditTargetGroupId(null);
    editForm.reset();
  };

  const handleDeleteGroupRequest = (
    action: "delete" | "quit",
    groupId: number | null = currentGroupId
  ) => {
    if (!groupId) {
      console.error("처리할 그룹 ID가 없습니다.");
      return;
    }

    setDeleteTargetGroupId(groupId);
    setDeleteAction(action);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteTargetGroupId(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetGroupId) {
      console.error("처리할 그룹 ID가 없습니다.");
      return;
    }

    try {
      const isDelete = deleteAction === "delete";
      const result = isDelete
        ? await groupApi.deleteGroup(deleteTargetGroupId)
        : await groupApi.quitGroup(deleteTargetGroupId);

      if (result.success) {
        setIsDeleteModalOpen(false);
        setDeleteTargetGroupId(null);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroups }),
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.allGroups }),
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupActivity }),
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupDetail }),
        ]);
      } else {
        console.error(`그룹 ${deleteAction === "delete" ? "삭제" : "탈퇴"} 실패:`, result.message);
      }
    } catch (error: unknown) {
      const actionLabel = deleteAction === "delete" ? "삭제" : "탈퇴";
      const errorMessage = getErrorMessage(error, `그룹 ${actionLabel} 중 오류가 발생했습니다.`);
      console.error(`그룹 ${actionLabel} 실패:`, errorMessage, error);
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
    createForm.clearErrors("name");

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
        setIsFormPanelOpen(false);
        createForm.reset();
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroups }),
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.allGroups }),
        ]);
      } else {
        console.error("그룹 생성 실패:", result.message);
      }
    } catch (error: unknown) {
      if (applyDuplicateGroupNameError(error, createForm.setError)) {
        return;
      }

      const errorMessage = getErrorMessage(error, "그룹 생성 중 오류가 발생했습니다.");
      console.error("그룹 생성 실패:", errorMessage, error);
    }
  };

  const handleJoinSubmit = async (groupId: number, password?: string) => {
    try {
      setIsJoining(true);
      const result = await groupApi.joinGroup(groupId, password ? { password } : undefined);

      if (result.success) {
        setIsFormPanelOpen(false);
        setJoinPassword("");
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroups }),
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.allGroups }),
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupActivity }),
        ]);
        return true;
      } else {
        console.error("그룹 참여 실패:", result.message);
        return false;
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "그룹 참여 중 오류가 발생했습니다.");
      console.error("그룹 참여 실패:", errorMessage, error);
      return false;
    } finally {
      setIsJoining(false);
    }
  };

  const handleEditSubmit = async (data: GroupEditFormData) => {
    if (!editTargetGroupId) {
      console.error("수정할 그룹 ID가 없습니다.");
      return;
    }

    editForm.clearErrors("name");

    try {
      const nextPassword = isEditPasswordChangeEnabled ? (data.password ?? "") : "";
      const passwordRequired = editPasswordRequired || nextPassword.length > 0;
      const result = await groupApi.updateGroup(editTargetGroupId, {
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
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroups }),
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.allGroups }),
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupActivity }),
          queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupDetail }),
        ]);
      } else {
        console.error("그룹 수정 실패:", result.message);
      }
    } catch (error: unknown) {
      if (applyDuplicateGroupNameError(error, editForm.setError)) {
        return;
      }

      const errorMessage = getErrorMessage(error, "그룹 수정 중 오류가 발생했습니다.");
      console.error("그룹 수정 실패:", errorMessage, error);
    }
  };

  const formPanel = {
    isOpen: isFormPanelOpen,
    onClose: handleCloseFormPanel,
    onCreateSubmit: createForm.handleSubmit(handleCreateSubmit),
    onJoinSubmit: handleJoinSubmit,
    createRegister: createForm.register,
    createErrors: createForm.formState.errors,
    isCreating: createForm.formState.isSubmitting,
    isJoining: isJoining,
    selectedType: createSelectedType,
    onTypeSelect: handleCreateTypeSelect,
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
    // 그룹 생성/참여 패널
    handleOpenFormPanel,
    // 그룹 수정 모달
    handleEditGroupRequest,
    // 그룹 삭제 모달
    handleDeleteGroupRequest,
    formPanel,
    editModal,
    deleteModal,
  };
};

export type UseGroupReturn = ReturnType<typeof useGroup>;
export type GroupFormPanelProps = UseGroupReturn["formPanel"];
export type GroupEditModalProps = UseGroupReturn["editModal"];
export type GroupDeleteModalProps = UseGroupReturn["deleteModal"];
