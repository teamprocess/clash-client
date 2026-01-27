import { useState } from "react";
import { Modal } from "@/shared/ui/modal/Modal";
import { GROUP_CATEGORY_LABELS } from "@/entities/group";
import type { GroupFormModalProps } from "@/features/record/model/useGroup";
import { useGroupList } from "@/features/record/model/useGroupList";
import { getPageNumbers } from "@/shared/lib";
import * as S from "./GroupFormModal.style";

export const GroupFormModal = ({
  isOpen,
  onClose,
  onCreateSubmit,
  onJoinSubmit,
  createRegister,
  createErrors,
  isCreating,
  isJoining,
  selectedType,
  onTypeSelect,
  selectedGroupId,
  setSelectedGroupId,
}: GroupFormModalProps) => {
  const [activeTab, setActiveTab] = useState<"join" | "create">("join");
  const {
    groups,
    pagination,
    isLoading,
    currentPage,
    selectedCategory,
    categoryOptions,
    handlePageChange,
    handleCategoryChange,
  } = useGroupList();

  return (
    <Modal width={64} height={42} isOpen={isOpen} onClose={onClose} gap={3}>
      <S.ModalContent>
        <S.Tabs>
          <S.Tab $isActive={activeTab === "join"} onClick={() => setActiveTab("join")}>
            그룹 참여
          </S.Tab>
          <S.Tab $isActive={activeTab === "create"} onClick={() => setActiveTab("create")}>
            그룹 생성
          </S.Tab>
        </S.Tabs>
        <S.Hr />

        {activeTab === "join" ? (
          <S.JoinContainer>
            <S.CategoryFilters>
              {categoryOptions.map(category => (
                <S.CategoryButton
                  key={category}
                  $isActive={selectedCategory === category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category === "ALL" ? "전체" : GROUP_CATEGORY_LABELS[category]}
                </S.CategoryButton>
              ))}
            </S.CategoryFilters>

            <S.GroupsWrapper>
              <S.Groups>
                {isLoading ? (
                  <div>로딩 중...</div>
                ) : groups.length === 0 ? (
                  <div>그룹이 없습니다.</div>
                ) : (
                  groups.map(group => (
                    <S.GroupContainer
                      key={group.id}
                      $isSelected={selectedGroupId === group.id}
                      onClick={() => setSelectedGroupId(group.id)}
                    >
                      <S.GroupHeader>
                        <S.GroupHeaderTextBox>
                          <S.GroupBadge>{GROUP_CATEGORY_LABELS[group.category]}</S.GroupBadge>
                          <S.GroupName>{group.name}</S.GroupName>
                        </S.GroupHeaderTextBox>
                        <S.GroupDescription>{group.description}</S.GroupDescription>
                      </S.GroupHeader>
                      <S.GroupFooter>
                        <S.GroupMembers>
                          <span>{group.currentMemberCount}</span> / {group.maxMembers}
                        </S.GroupMembers>
                        <S.GroupJoinButton
                          onClick={async e => {
                            e.stopPropagation();
                            if (group.passwordRequired) {
                              const password = prompt("비밀번호를 입력하세요:");
                              if (password) {
                                await onJoinSubmit(group.id, password);
                              }
                            } else {
                              await onJoinSubmit(group.id);
                            }
                          }}
                          disabled={isJoining || group.isMember}
                        >
                          {group.isMember ? "가입됨" : isJoining ? "가입 중..." : "가입"}
                        </S.GroupJoinButton>
                      </S.GroupFooter>
                    </S.GroupContainer>
                  ))
                )}
              </S.Groups>
            </S.GroupsWrapper>

            {pagination && (
              <S.Pagination>
                <S.PageButton
                  disabled={!pagination.hasPrevious}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  ◀
                </S.PageButton>
                {getPageNumbers(currentPage, pagination.totalPages).map(page => (
                  <S.PageButton
                    key={page}
                    $isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </S.PageButton>
                ))}
                <S.PageButton
                  disabled={!pagination.hasNext}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  ▶
                </S.PageButton>
              </S.Pagination>
            )}
          </S.JoinContainer>
        ) : (
          <S.FormContainer as="form" onSubmit={onCreateSubmit}>
            <S.InputContainer>
              <S.InputWrapper>
                <S.InputBox>
                  <S.Label htmlFor="group-name-input">그룹 이름</S.Label>
                  <S.Input
                    id="group-name-input"
                    type="text"
                    placeholder="그룹 이름을 입력하세요."
                    {...createRegister("name")}
                  />
                  {createErrors.name && <S.ErrorText>{createErrors.name.message}</S.ErrorText>}
                </S.InputBox>
                <S.InputBox>
                  <S.Label htmlFor="group-password-input">비밀번호 (선택사항)</S.Label>
                  <S.Input
                    id="group-password-input"
                    type="password"
                    placeholder="그룹 비밀번호를 입력하세요."
                    {...createRegister("password")}
                  />
                  {createErrors.password && (
                    <S.ErrorText>{createErrors.password.message}</S.ErrorText>
                  )}
                </S.InputBox>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.InputBox>
                  <S.Label htmlFor="group-type">카테고리</S.Label>
                  <S.SlideButtonBox>
                    <S.SlideButton
                      type="button"
                      $isActive={selectedType === "CLUB"}
                      onClick={() => onTypeSelect("CLUB")}
                    >
                      {GROUP_CATEGORY_LABELS.CLUB}
                    </S.SlideButton>
                    <S.SlideButton
                      type="button"
                      $isActive={selectedType === "CLASS"}
                      onClick={() => onTypeSelect("CLASS")}
                    >
                      {GROUP_CATEGORY_LABELS.CLASS}
                    </S.SlideButton>
                    <S.SlideButton
                      type="button"
                      $isActive={selectedType === "TEAM"}
                      onClick={() => onTypeSelect("TEAM")}
                    >
                      {GROUP_CATEGORY_LABELS.TEAM}
                    </S.SlideButton>
                    <S.SlideButton
                      type="button"
                      $isActive={selectedType === "NARSHA"}
                      onClick={() => onTypeSelect("NARSHA")}
                    >
                      {GROUP_CATEGORY_LABELS.NARSHA}
                    </S.SlideButton>
                    <S.SlideButton
                      type="button"
                      $isActive={selectedType === "ETC"}
                      onClick={() => onTypeSelect("ETC")}
                    >
                      {GROUP_CATEGORY_LABELS.ETC}
                    </S.SlideButton>
                  </S.SlideButtonBox>
                  {createErrors.type && <S.ErrorText>{createErrors.type.message}</S.ErrorText>}
                </S.InputBox>
                <S.InputBox>
                  <S.Label htmlFor="group-max-members">최대 인원</S.Label>
                  <S.Input
                    id="group-max-members"
                    type="number"
                    placeholder="최대 인원을 입력하세요."
                    {...createRegister("maxMembers", { valueAsNumber: true })}
                  />
                  {createErrors.maxMembers && (
                    <S.ErrorText>{createErrors.maxMembers.message}</S.ErrorText>
                  )}
                </S.InputBox>
              </S.InputWrapper>
              <S.InputBox>
                <S.Label htmlFor="group-description">그룹 설명</S.Label>
                <S.TextArea
                  id="group-description"
                  rows={5}
                  placeholder="어떤 그룹인지 설명해주세요"
                  {...createRegister("description")}
                />
                {createErrors.description && (
                  <S.ErrorText>{createErrors.description.message}</S.ErrorText>
                )}
              </S.InputBox>
            </S.InputContainer>
            <S.ButtonBox>
              <S.Button type="button" $type="CANCEL" onClick={onClose}>
                취소
              </S.Button>
              <S.Button type="submit" $type="SUBMIT" disabled={isCreating}>
                {isCreating ? "생성 중..." : "저장"}
              </S.Button>
            </S.ButtonBox>
          </S.FormContainer>
        )}
      </S.ModalContent>
    </Modal>
  );
};
