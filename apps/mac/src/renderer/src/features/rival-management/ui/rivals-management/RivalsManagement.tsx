import { useState, type ChangeEvent } from "react";
import * as S from "./RivalsManagement.style";
import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui/dialog";
import { SearchInput } from "@/shared/ui/search-input";
import { SlideSelector } from "@/shared/ui/slide-selector";
import type { useRival } from "../../model/useRival";
import { DeleteRivalsConfirmDialog } from "../delete-rival-confirm/DeleteRivalsConfirm";
import { RivalLinkingStatusButton } from "./rivals-management-status/StatusOfRivalsManagement";
import { getErrorMessage } from "@/shared/lib";

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

  const isMaxRivalError =
    rival.createError === "라이벌이 너무 많습니다." ||
    rival.createError === "최대 라이벌 수에 도달했습니다.";

  const users = rival.filteredUsers ?? [];
  const currentRivals = rival.rivalsData?.myRivals ?? [];
  const signRivals = rival.filteredSignRivals ?? [];

  const hasCurrentRivals = currentRivals.length > 0;
  const hasSignRivals = signRivals.length > 0;
  const [activeTab, setActiveTab] = useState<"rivals-management" | "rivalList">(
    "rivals-management"
  );

  const handleTabChange = (tab: "rivals-management" | "rivalList") => {
    setActiveTab(tab);
  };

  const handleCreateSubmit = async () => {
    const ok = await rival.handleRivalCreate();

    if (ok) {
      handleClose();
      return;
    }
  };

  return (
    <Dialog width={43} height={40} isOpen={isOpen} onClose={handleClose} ariaLabel="라이벌 관리">
      <S.DialogLayout>
        <SlideSelector
          ariaLabel="라이벌 관리 보기"
          value={activeTab}
          options={[
            { key: "rivals-management", label: "라이벌 추가" },
            { key: "rivalList", label: "신청 목록" },
          ]}
          onChange={handleTabChange}
        />

        {activeTab === "rivals-management" ? (
          <>
            <S.TopSection>
              <S.SearchInputBox>
                <SearchInput
                  placeholder={"이름 또는 아이디 검색"}
                  aria-label="라이벌 검색"
                  inputSize={"md"}
                  variant={"light"}
                  fullWidth={true}
                  value={rival.searchText}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    rival.setSearchText(e.target.value)
                  }
                />
              </S.SearchInputBox>

              {rival.queries.myRivals.isPending ? (
                <S.EmptyStateBox role="status" aria-live="polite">
                  <S.EmptyTitle>현재 라이벌 정보를 확인하는 중이에요.</S.EmptyTitle>
                </S.EmptyStateBox>
              ) : rival.queries.myRivals.isError ? (
                <S.EmptyStateBox role="alert">
                  <S.EmptyTitle>현재 라이벌 정보를 확인하지 못했어요.</S.EmptyTitle>
                  <S.EmptyDescription>
                    추가 가능한 인원을 확인하려면 다시 시도해 주세요.
                  </S.EmptyDescription>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => void rival.queries.myRivals.refetch()}
                  >
                    다시 시도
                  </Button>
                </S.EmptyStateBox>
              ) : rival.queries.available.isPending ? (
                <S.EmptyStateBox role="status" aria-live="polite">
                  <S.EmptyTitle>추가할 수 있는 라이벌을 불러오는 중이에요.</S.EmptyTitle>
                </S.EmptyStateBox>
              ) : rival.queries.available.isError ? (
                <S.EmptyStateBox role="alert">
                  <S.EmptyTitle>라이벌 목록을 불러오지 못했어요.</S.EmptyTitle>
                  <S.EmptyDescription>
                    {getErrorMessage(rival.queries.available.error, "잠시 후 다시 시도해 주세요.")}
                  </S.EmptyDescription>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => void rival.queries.available.refetch()}
                  >
                    다시 시도
                  </Button>
                </S.EmptyStateBox>
              ) : rival.rivalsData?.myRivals.length === 4 ? (
                <S.EmptyStateBox>
                  <S.EmptyTitle>라이벌이 가득 찼습니다!</S.EmptyTitle>
                  <S.EmptyDescription>
                    새로운 라이벌을 추가하려면 정리가 필요합니다.
                  </S.EmptyDescription>
                </S.EmptyStateBox>
              ) : (
                <S.UserChoiceContainer $uiStatus={"create"}>
                  {users.length === 0 ? (
                    <S.EmptyStateBox>
                      <S.EmptyTitle>검색 결과가 없습니다.</S.EmptyTitle>
                      <S.EmptyDescription>다른 이름이나 아이디로 검색해 보세요.</S.EmptyDescription>
                    </S.EmptyStateBox>
                  ) : (
                    users.map(user => {
                      const isSelected = rival.rivalSelectedId.includes(user.id);

                      return (
                        <S.SelectableUserButton
                          key={user.id}
                          type="button"
                          $isSelected={isSelected}
                          aria-pressed={isSelected}
                          onClick={() => rival.handleUserSelect(user.id)}
                        >
                          <S.ProfileContent $height="3rem">
                            <S.ProfileBox>
                              {user.profileImage ? (
                                <S.ProfileImg src={user.profileImage} alt="" />
                              ) : (
                                <S.DefaultProfileImg aria-hidden />
                              )}
                              <S.ProfileTagBox>
                                <S.ProfileName>{user.name}</S.ProfileName>
                                <S.ProfileMention>@{user.username}</S.ProfileMention>
                              </S.ProfileTagBox>
                            </S.ProfileBox>
                          </S.ProfileContent>

                          {isSelected ? (
                            <S.CheckedIcon aria-hidden />
                          ) : (
                            <S.UncheckedBox aria-hidden />
                          )}
                        </S.SelectableUserButton>
                      );
                    })
                  )}
                </S.UserChoiceContainer>
              )}
            </S.TopSection>

            <S.BottomRow>
              <S.ButtonBox>
                {rival.createError ? (
                  <S.ErrorText>
                    {isMaxRivalError
                      ? `최대 라이벌 수는 4명입니다. 신청 목록을 확인해주세요!`
                      : rival.createError}
                  </S.ErrorText>
                ) : null}
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => void handleCreateSubmit()}
                  isLoading={rival.isSubmitting}
                  disabled={
                    rival.isSubmitting ||
                    rival.rivalSelectedId.length === 0 ||
                    rival.queries.myRivals.isPending ||
                    rival.queries.myRivals.isError ||
                    rival.queries.available.isError
                  }
                >
                  {rival.isSubmitting ? "신청 중" : "신청"}
                </Button>
              </S.ButtonBox>
            </S.BottomRow>
          </>
        ) : (
          <S.ApplyContainer>
            <S.DetermineContent>
              <S.DetermineTitle>현재 라이벌</S.DetermineTitle>

              <S.UserChoiceContainer>
                {rival.queries.myRivals.isPending ? (
                  <S.EmptyStateBox role="status" aria-live="polite">
                    <S.EmptyTitle>현재 라이벌을 불러오는 중이에요.</S.EmptyTitle>
                  </S.EmptyStateBox>
                ) : rival.queries.myRivals.isError && !rival.rivalsData ? (
                  <S.EmptyStateBox role="alert">
                    <S.EmptyTitle>현재 라이벌을 불러오지 못했어요.</S.EmptyTitle>
                    <S.EmptyDescription>
                      {getErrorMessage(rival.queries.myRivals.error, "잠시 후 다시 시도해 주세요.")}
                    </S.EmptyDescription>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => void rival.queries.myRivals.refetch()}
                    >
                      다시 시도
                    </Button>
                  </S.EmptyStateBox>
                ) : hasCurrentRivals ? (
                  currentRivals.map(user => (
                    <S.UserChoiceBox key={user.rivalId ?? user.id} $isRival={true}>
                      <S.ProfileContent $height="3rem">
                        <S.ProfileBox>
                          {user.profileImage ? (
                            <S.ProfileImg src={user.profileImage} alt="" />
                          ) : (
                            <S.DefaultProfileImg aria-hidden />
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
              {rival.signListError && <S.ErrorText>{rival.signListError}</S.ErrorText>}
              <S.DetermineList>
                <S.UserChoiceContainer>
                  {rival.queries.requests.isPending ? (
                    <S.EmptyStateBox role="status" aria-live="polite">
                      <S.EmptyTitle>라이벌 신청 목록을 불러오는 중이에요.</S.EmptyTitle>
                    </S.EmptyStateBox>
                  ) : rival.queries.requests.isError && !rival.rivalSignAll ? (
                    <S.EmptyStateBox role="alert">
                      <S.EmptyTitle>라이벌 신청 목록을 불러오지 못했어요.</S.EmptyTitle>
                      <S.EmptyDescription>
                        {getErrorMessage(
                          rival.queries.requests.error,
                          "잠시 후 다시 시도해 주세요."
                        )}
                      </S.EmptyDescription>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => void rival.queries.requests.refetch()}
                      >
                        다시 시도
                      </Button>
                    </S.EmptyStateBox>
                  ) : hasSignRivals ? (
                    signRivals.map(user => (
                      <S.UserChoiceBox key={user.rivalId} $isRival={true}>
                        <S.ProfileContent $height="3rem">
                          <S.ProfileBox>
                            {user.profileImage ? (
                              <S.ProfileImg src={user.profileImage} alt="" />
                            ) : (
                              <S.DefaultProfileImg aria-hidden />
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
                              onClick={() => void rival.handleRivalSignCancel(user.rivalId)}
                              isLoading={
                                rival.isCancelingSign && rival.cancelingRivalId === user.rivalId
                              }
                              disabled={rival.isCancelingSign}
                            >
                              {rival.isCancelingSign && rival.cancelingRivalId === user.rivalId
                                ? "취소 중"
                                : "취소"}
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
                username={rival.pendingDelete.name}
              />
            )}
          </S.ApplyContainer>
        )}
      </S.DialogLayout>
    </Dialog>
  );
};
