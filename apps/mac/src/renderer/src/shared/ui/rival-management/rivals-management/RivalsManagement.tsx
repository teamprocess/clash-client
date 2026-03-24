import * as S from "./RivalsManagement.style";
import { Button, DeleteRivalsConfirmDialog, Dialog, SlideSelector } from "@/shared/ui";
import { SearchInput } from "@/shared/ui";
import { useRival } from "@/shared/lib";
import React, { useState } from "react";
import { RivalLinkingStatusButton } from "@/shared/ui/rival-management";

interface AddRivalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  usingState?: "home" | "competition";
  rival: ReturnType<typeof useRival>;
}

export const RivalsManagementDialog = ({ isOpen, onClose, rival }: AddRivalsDialogProps) => {
  const handleClose = () => {
    rival.handleClose();
    onClose();
  };

  const users = rival.filteredUsers ?? [];
  const currentRivals = rival.rivalsData?.myRivals ?? [];
  const signRivals = rival.filteredSignRivals ?? [];

  const hasCurrentRivals = currentRivals.length > 0;
  const hasSignRivals = signRivals.length > 0;
  const [activeTab, setActiveTab] = useState<"rivals-management" | "rivalList">(
    "rivals-management"
  );

  return (
    <Dialog width={43} height={40} isOpen={isOpen} onClose={handleClose}>
      <S.DialogLayout>
        <SlideSelector
          value={activeTab}
          options={[
            { key: "rivals-management", label: "라이벌 추가" },
            { key: "rivalList", label: "신청 목록" },
          ]}
          onChange={setActiveTab}
        />

        {activeTab === "rivals-management" ? (
          <>
            <S.TopSection>
              <S.SearchInputBox>
                <SearchInput
                  placeholder={"이름 또는 아이디 검색"}
                  inputSize={"md"}
                  variant={"light"}
                  fullWidth={true}
                  value={rival.searchText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    rival.setSearchText(e.target.value)
                  }
                />
              </S.SearchInputBox>

              <S.UserChoiceContainer $uiStatus={"create"}>
                {users.map(user => {
                  const isSelected = rival.rivalSelectedId.includes(user.id);

                  return (
                    <S.UserChoiceBox
                      key={user.id}
                      $isSelected={isSelected}
                      onClick={() => rival.handleUserSelect(user.id)}
                    >
                      <S.ProfileContent $height="3rem">
                        <S.ProfileBox>
                          {user.profileImage ? (
                            <S.ProfileImg src={user.profileImage} />
                          ) : (
                            <S.DefaultProfileImg />
                          )}
                          <S.ProfileTagBox>
                            <S.ProfileName>{user.name}</S.ProfileName>
                            <S.ProfileMention>@{user.username}</S.ProfileMention>
                          </S.ProfileTagBox>
                        </S.ProfileBox>
                      </S.ProfileContent>

                      {isSelected ? <S.CheckedIcon /> : <S.UncheckedBox />}
                    </S.UserChoiceBox>
                  );
                })}
              </S.UserChoiceContainer>
            </S.TopSection>

            <S.BottomRow>
              <S.ButtonBox>
                {rival.error && (
                  <S.ErrorText>
                    {rival.error === "라이벌이 너무 많습니다."
                      ? `라이벌은 최대 4명까지 설정할 수 있습니다.\n신청 목록을 확인해주세요!`
                      : rival.error}
                  </S.ErrorText>
                )}
                <Button size="sm" variant="secondary" onClick={rival.handleSelectClose}>
                  초기화
                </Button>
                <Button size="sm" variant="primary" onClick={rival.handleRivalCreate}>
                  확인
                </Button>
              </S.ButtonBox>
            </S.BottomRow>
          </>
        ) : (
          <S.ApplyContainer>
            <S.DetermineContent>
              <S.DetermineTitle>현재 라이벌</S.DetermineTitle>

              <S.UserChoiceContainer>
                {hasCurrentRivals ? (
                  currentRivals.map(user => (
                    <S.UserChoiceBox key={user.rivalId ?? user.id} $isRival={true}>
                      <S.ProfileContent $height="3rem">
                        <S.ProfileBox>
                          {user.profileImage ? (
                            <S.ProfileImg src={user.profileImage} />
                          ) : (
                            <S.DefaultProfileImg />
                          )}
                          <S.ProfileTagBox>
                            <S.ProfileName>{user.name}</S.ProfileName>
                            <S.ProfileMention>@{user.username}</S.ProfileMention>
                          </S.ProfileTagBox>
                        </S.ProfileBox>
                      </S.ProfileContent>

                      <Button
                        size="sm"
                        variant="primary"
                        onClick={e => {
                          e.stopPropagation();
                          rival.openDeleteConfirm(user.rivalId ?? user.id, user.name);
                        }}
                      >
                        끊기
                      </Button>
                    </S.UserChoiceBox>
                  ))
                ) : (
                  <S.EmptyStateBox>
                    <S.EmptyTitle>현재 등록된 라이벌이 없습니다.</S.EmptyTitle>
                    <S.EmptyDescription>
                      라이벌을 추가하면 여기서 확인할 수 있어요.
                    </S.EmptyDescription>
                  </S.EmptyStateBox>
                )}
              </S.UserChoiceContainer>
            </S.DetermineContent>

            <S.DetermineContent>
              <S.DetermineTitle>라이벌 신청 목록</S.DetermineTitle>
              {rival.error && (
                <S.ErrorText>
                  {rival.error === "라이벌이 너무 많습니다."
                    ? `라이벌 신청을 보낸 내역이 있다면 취소를 한 후, 다른 사용자를 추가해보세요!`
                    : rival.error}
                </S.ErrorText>
              )}
              <S.DetermineList>
                <S.UserChoiceContainer>
                  {hasSignRivals ? (
                    signRivals.map(user => (
                      <S.UserChoiceBox key={user.rivalId} $isRival={true}>
                        <S.ProfileContent $height="3rem">
                          <S.ProfileBox>
                            {user.profileImage ? (
                              <S.ProfileImg src={user.profileImage} />
                            ) : (
                              <S.DefaultProfileImg />
                            )}
                            <S.ProfileTagBox>
                              <S.ProfileName>{user.name}</S.ProfileName>
                              <S.ProfileMention>@{user.githubId}</S.ProfileMention>
                            </S.ProfileTagBox>
                            <RivalLinkingStatusButton status={user.rivalLinkingStatus} />
                          </S.ProfileBox>

                          {user.rivalLinkingStatus === "PENDING" ? (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => rival.handleRivalSignCancel(user.rivalId)}
                            >
                              취소
                            </Button>
                          ) : null}
                        </S.ProfileContent>
                      </S.UserChoiceBox>
                    ))
                  ) : (
                    <S.EmptyStateBox>
                      <S.EmptyTitle>라이벌 신청 내역이 없습니다.</S.EmptyTitle>
                      <S.EmptyDescription>
                        보낸 신청 또는 받은 신청이 생기면 여기서 확인할 수 있어요.
                      </S.EmptyDescription>
                    </S.EmptyStateBox>
                  )}
                </S.UserChoiceContainer>
              </S.DetermineList>
            </S.DetermineContent>

            {rival.deleteConfirmOpen && rival.pendingDelete?.id != null && (
              <DeleteRivalsConfirmDialog
                isOpen={rival.deleteConfirmOpen}
                onClose={rival.closeDeleteConfirm}
                rival={rival}
                rivalId={rival.pendingDelete.id}
                userName={rival.pendingDelete.name}
              />
            )}
          </S.ApplyContainer>
        )}
      </S.DialogLayout>
    </Dialog>
  );
};
