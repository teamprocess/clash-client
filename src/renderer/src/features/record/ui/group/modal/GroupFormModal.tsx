import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dialog, ModalActions } from "@/shared/ui";
import { GROUP_CATEGORY_LABELS } from "@/entities/group";
import type { GroupFormModalProps } from "../../../model/useGroup";
import { useGroupList } from "../../../model/useGroupList";
import { getPageNumbers } from "@/shared/lib";
import { GroupFormFields } from "./GroupFormFields";
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
}: GroupFormModalProps) => {
  const [activeTab, setActiveTab] = useState<"join" | "create">("join");
  const tabsRef = useRef<HTMLDivElement>(null);
  const joinTabRef = useRef<HTMLButtonElement>(null);
  const createTabRef = useRef<HTMLButtonElement>(null);
  const [activeRail, setActiveRail] = useState({ left: 0, width: 0 });
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
  const emptyTitle =
    selectedCategory === "ALL"
      ? "현재 참여 가능한 그룹이 없습니다."
      : `${GROUP_CATEGORY_LABELS[selectedCategory]} 카테고리 그룹이 없습니다.`;

  const updateActiveRail = useCallback(() => {
    const tabsElement = tabsRef.current;
    const activeTabElement = activeTab === "join" ? joinTabRef.current : createTabRef.current;

    if (!tabsElement || !activeTabElement) {
      return;
    }

    const tabsRect = tabsElement.getBoundingClientRect();
    const activeRect = activeTabElement.getBoundingClientRect();

    setActiveRail({
      left: activeRect.left - tabsRect.left,
      width: activeRect.width,
    });
  }, [activeTab]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    const frameId = requestAnimationFrame(updateActiveRail);
    return () => cancelAnimationFrame(frameId);
  }, [isOpen, updateActiveRail]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleResize = () => updateActiveRail();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, updateActiveRail]);

  return (
    <Dialog width={64} height={42} isOpen={isOpen} onClose={onClose} gap={3}>
      <S.ModalContent>
        <S.TabHeader>
          <S.Tabs ref={tabsRef}>
            <S.Tab
              ref={joinTabRef}
              $isActive={activeTab === "join"}
              onClick={() => setActiveTab("join")}
            >
              그룹 참여
            </S.Tab>
            <S.Tab
              ref={createTabRef}
              $isActive={activeTab === "create"}
              onClick={() => setActiveTab("create")}
            >
              그룹 생성
            </S.Tab>
          </S.Tabs>
          <S.TabRail>
            <S.TabActiveRail $left={activeRail.left} $width={activeRail.width} />
          </S.TabRail>
        </S.TabHeader>

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
              {isLoading ? (
                <S.EmptyState>
                  <S.EmptyTitle>로딩 중...</S.EmptyTitle>
                </S.EmptyState>
              ) : groups.length === 0 ? (
                <S.EmptyState>
                  <S.EmptyIcon />
                  <S.EmptyTextBox>
                    <S.EmptyTitle>{emptyTitle}</S.EmptyTitle>
                    <S.EmptyDescription>
                      다른 카테고리를 선택하거나 그룹을 생성해보세요.
                    </S.EmptyDescription>
                  </S.EmptyTextBox>
                </S.EmptyState>
              ) : (
                <S.Groups>
                  {groups.map(group => (
                    <S.GroupContainer key={group.id} $isMember={group.isMember}>
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
                          $isMember={group.isMember}
                        >
                          {group.isMember ? "가입됨" : isJoining ? "가입 중..." : "가입"}
                        </S.GroupJoinButton>
                      </S.GroupFooter>
                    </S.GroupContainer>
                  ))}
                  {Array.from({ length: Math.max(0, 6 - groups.length) }).map((_, index) => (
                    <S.GroupPlaceholder key={`group-placeholder-${index}`} aria-hidden />
                  ))}
                </S.Groups>
              )}
            </S.GroupsWrapper>

            {pagination && groups.length > 0 && (
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
            <GroupFormFields
              idPrefix="create-group"
              register={createRegister}
              errors={createErrors}
              selectedType={selectedType}
              onTypeSelect={onTypeSelect}
              typeLabel="카테고리"
              maxMembersLabel="최대 인원"
              descriptionPlaceholder="어떤 그룹인지 설명해주세요"
              passwordPlaceholder="그룹 비밀번호를 입력하세요."
            />
            <ModalActions
              onCancel={onClose}
              confirmLabel={isCreating ? "생성 중..." : "저장"}
              confirmType="submit"
              confirmDisabled={isCreating}
              size="md"
            />
          </S.FormContainer>
        )}
      </S.ModalContent>
    </Dialog>
  );
};
