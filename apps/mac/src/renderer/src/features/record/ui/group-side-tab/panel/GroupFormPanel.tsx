import { Button, SlideSelector } from "@/shared/ui";
import { GROUP_CATEGORY_LABELS } from "@/entities/group";
import type { GroupFormPanelProps } from "../../../model/useGroup";
import { useGroupFormPanel } from "../../../model/useGroupFormPanel";
import { GroupFormFields } from "../../group/form-fields/GroupFormFields";
import { GroupJoinPassword } from "../../group/modal/GroupJoinPassword";
import * as S from "./GroupFormPanel.style";

export const GroupFormPanel = ({
  isOpen,
  onCreateSubmit,
  onJoinSubmit,
  createRegister,
  createErrors,
  isCreating,
  isJoining,
  selectedType,
  onTypeSelect,
  joinPassword,
  setJoinPassword,
}: GroupFormPanelProps) => {
  const {
    activeTab,
    groups,
    pagination,
    isLoading,
    currentPage,
    selectedCategory,
    categoryOptions,
    emptyTitle,
    pageNumbers,
    joiningGroupId,
    passwordTargetGroupName,
    isJoinPasswordDialogOpen,
    joinPasswordError,
    handlePageChange,
    handleCategoryChange,
    handleTabChange,
    handleJoinGroup,
    handleCloseJoinPasswordDialog,
    handleJoinPasswordChange,
    handleJoinWithPassword,
  } = useGroupFormPanel({
    isJoining,
    joinPassword,
    setJoinPassword,
    onJoinSubmit,
  });

  return (
    <>
      {isOpen && (
        <S.PanelContent>
          <SlideSelector
            value={activeTab}
            options={[
              { key: "join", label: "그룹 참여" },
              { key: "create", label: "그룹 생성" },
            ]}
            onChange={handleTabChange}
          />

          {activeTab === "join" ? (
            <S.JoinContainer>
              <S.CategoryFilters>
                {categoryOptions.map(category => (
                  <S.CategoryButton
                    key={category}
                    type="button"
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
                    <S.EmptyTextBox>
                      <S.EmptyTitle>{emptyTitle}</S.EmptyTitle>
                      <S.EmptyDescription>
                        다른 카테고리를 선택하거나 그룹을 생성해보세요.
                      </S.EmptyDescription>
                    </S.EmptyTextBox>
                  </S.EmptyState>
                ) : (
                  <S.Groups>
                    {groups.map(group => {
                      const isCurrentJoining = isJoining && joiningGroupId === group.id;

                      return (
                        <S.GroupContainer key={group.id} $isMember={group.isMember}>
                          <S.GroupHeader>
                            <S.GroupHeaderRow>
                              <S.GroupHeaderTextBox>
                                <S.GroupBadge>{GROUP_CATEGORY_LABELS[group.category]}</S.GroupBadge>
                                <S.GroupName>{group.name}</S.GroupName>
                              </S.GroupHeaderTextBox>
                              <S.GroupMembers>
                                <span>{group.currentMemberCount}</span> / {group.maxMembers}
                              </S.GroupMembers>
                            </S.GroupHeaderRow>
                          </S.GroupHeader>
                          <S.GroupFooter>
                            <S.GroupDescriptionRow>
                              {group.passwordRequired ? <S.LockIcon aria-hidden /> : null}
                              <S.GroupDescription>{group.description}</S.GroupDescription>
                            </S.GroupDescriptionRow>
                            <S.GroupJoinButton
                              type="button"
                              onClick={() => void handleJoinGroup(group)}
                              disabled={isJoining || group.isMember}
                              $isMember={group.isMember}
                            >
                              {group.isMember ? "가입됨" : isCurrentJoining ? "가입 중..." : "가입"}
                            </S.GroupJoinButton>
                          </S.GroupFooter>
                        </S.GroupContainer>
                      );
                    })}
                  </S.Groups>
                )}
              </S.GroupsWrapper>

              {pagination && groups.length > 0 && (
                <S.Pagination>
                  <S.PageButton
                    type="button"
                    disabled={!pagination.hasPrevious}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    ◀
                  </S.PageButton>
                  {pageNumbers.map(page => (
                    <S.PageButton
                      key={page}
                      type="button"
                      $isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </S.PageButton>
                  ))}
                  <S.PageButton
                    type="button"
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
              <S.FormFieldsArea>
                <GroupFormFields
                  idPrefix="create-group"
                  register={createRegister}
                  errors={createErrors}
                  selectedType={selectedType}
                  onTypeSelect={onTypeSelect}
                  variant="createPanel"
                  typeLabel="카테고리"
                  maxMembersLabel="최대 인원"
                  namePlaceholder="그룹명을 입력하세요"
                  maxMembersPlaceholder="0명"
                  descriptionPlaceholder="그룹 설명을 입력하세요"
                  passwordPlaceholder="비밀번호를 입력하세요."
                  showDescriptionLabel={false}
                />
              </S.FormFieldsArea>
              <S.CreateActionRow>
                <Button type="submit" variant="primary" size="sm" disabled={isCreating}>
                  {isCreating ? "생성 중..." : "생성"}
                </Button>
              </S.CreateActionRow>
            </S.FormContainer>
          )}
        </S.PanelContent>
      )}
      <GroupJoinPassword
        isOpen={isJoinPasswordDialogOpen}
        groupName={passwordTargetGroupName}
        isJoining={isJoining}
        password={joinPassword}
        errorMessage={joinPasswordError}
        onClose={handleCloseJoinPasswordDialog}
        onPasswordChange={handleJoinPasswordChange}
        onSubmit={handleJoinWithPassword}
      />
    </>
  );
};
