import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const GROUP_TYPE = {
  CLUB: "동아리",
  CLASS: "반",
  TEAM: "팀",
  NARSHA: "나르샤",
  ETC: "기타",
} as const;

export type GroupTypeKey = keyof typeof GROUP_TYPE;
export type GroupTypeValue = (typeof GROUP_TYPE)[GroupTypeKey];

const groupEditSchema = z.object({
  name: z.string().min(1, "그룹 이름을 입력하세요."),
  password: z.string().optional(),
  type: z.enum(Object.values(GROUP_TYPE) as [string, ...string[]]),
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
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 그룹 생성 폼
  const createForm = useForm<GroupEditFormData>({
    resolver: zodResolver(groupEditSchema),
    defaultValues: {
      name: "",
      password: "",
      type: GROUP_TYPE.CLUB,
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
      type: GROUP_TYPE.CLUB,
      maxMembers: 40,
      description: "",
    },
  });

  const createSelectedType = useWatch({
    control: createForm.control,
    name: "type",
  }) as GroupTypeValue | undefined;

  const editSelectedType = useWatch({
    control: editForm.control,
    name: "type",
  }) as GroupTypeValue | undefined;

  const handleMoreClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
    createForm.reset({
      name: "",
      password: "",
      type: GROUP_TYPE.CLUB,
      maxMembers: 40,
      description: "",
    });
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    createForm.reset();
  };

  const handleEditGroupRequest = () => {
    setIsMenuOpen(false);
    setIsEditModalOpen(true);
    // 현재 그룹 정보로 수정 폼 초기화
    editForm.reset({
      name: "프로세스 팀",
      password: "test1234**",
      type: GROUP_TYPE.TEAM,
      maxMembers: 8,
      description: "프로세스 팀",
    });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    editForm.reset();
  };

  const handleDeleteGroupRequest = () => {
    setIsMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // 그룹 삭제 api
    console.log("그룹 삭제");
    setIsDeleteModalOpen(false);
  };

  const handleCreateTypeSelect = (type: GroupTypeValue) => {
    createForm.setValue("type", type);
  };

  const handleEditTypeSelect = (type: GroupTypeValue) => {
    editForm.setValue("type", type);
  };

  const handleCreateSubmit = async (data: GroupEditFormData) => {
    try {
      // 그룹 생성 api
      console.log("그룹 생성 데이터:", data);
      setIsFormModalOpen(false);
      createForm.reset();
    } catch (error: unknown) {
      console.error("그룹 생성 실패:", error);
    }
  };

  const handleJoinSubmit = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    try {
      // 그룹 가입 api
      console.log("그룹 참여");
      setIsFormModalOpen(false);
    } catch (error: unknown) {
      console.error("그룹 참여 실패:", error);
    }
  };

  const handleEditSubmit = async (data: GroupEditFormData) => {
    try {
      // 그룹 수정 api
      console.log("그룹 수정 데이터:", data);
      setIsEditModalOpen(false);
      editForm.reset();
    } catch (error: unknown) {
      console.error("그룹 수정 실패:", error);
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
    isJoining: false,
    selectedType: createSelectedType,
    onTypeSelect: handleCreateTypeSelect,
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
  };

  const deleteModal = {
    isOpen: isDeleteModalOpen,
    onClose: handleCancelDelete,
    onConfirm: handleConfirmDelete,
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
  };
};

export type UseGroupReturn = ReturnType<typeof useGroup>;
export type GroupFormModalProps = UseGroupReturn["formModal"];
export type GroupEditModalProps = UseGroupReturn["editModal"];
export type GroupDeleteModalProps = UseGroupReturn["deleteModal"];
