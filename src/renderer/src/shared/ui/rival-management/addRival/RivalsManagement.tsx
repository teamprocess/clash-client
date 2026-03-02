import { Button, DeleteRivalsDialog, Dialog } from "@/shared/ui";
import * as S from "./RivalsManagement.style";
import { SearchInput } from "@/shared/ui";
import { useRival } from "@/shared/lib";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

interface AddRivalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  usingState?: "home" | "competition";
  rival: ReturnType<typeof useRival>;
}

export const AddRivalsDialog = ({ isOpen, onClose, rival }: AddRivalsDialogProps) => {
  const handleClose = () => {
    rival.handleClose();
    onClose();
  };

  const users = rival.filteredUsers ?? [];

  const [activeTab, setActiveTab] = useState<"addRival" | "rivalList">("addRival");
  const tabsRef = useRef<HTMLDivElement>(null);
  const addRivalTabRef = useRef<HTMLButtonElement>(null);
  const rivalListTabRef = useRef<HTMLButtonElement>(null);
  const [activeRail, setActiveRail] = useState({ left: 0, width: 0 });

  const updateActiveRail = useCallback(() => {
    const tabsElement = tabsRef.current;
    const activeTabElement =
      activeTab === "addRival" ? addRivalTabRef.current : rivalListTabRef.current;

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
    <Dialog width={43} height={34} isOpen={isOpen} onClose={handleClose}>
      <S.DialogLayout>
        <S.TabHeader>
          <S.Tabs ref={tabsRef}>
            <S.Tab
              ref={addRivalTabRef}
              $isActive={activeTab === "addRival"}
              onClick={() => setActiveTab("addRival")}
            >
              라이벌 추가
            </S.Tab>
            <S.Tab
              ref={rivalListTabRef}
              $isActive={activeTab === "rivalList"}
              onClick={() => setActiveTab("rivalList")}
            >
              신청 목록
            </S.Tab>
          </S.Tabs>
          <S.TabRail>
            <S.TabActiveRail $left={activeRail.left} $width={activeRail.width} />
          </S.TabRail>
        </S.TabHeader>
        {activeTab === "addRival" ? (
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

              <S.UserChoiceContainer>
                {users.map(user => {
                  const isSelected = rival.rivalSelectedId.includes(user.id);

                  return (
                    <S.UserChoiceBox
                      key={user.id}
                      $isSelected={isSelected}
                      onClick={() => rival.handleUserSelect(user.id)}
                    >
                      <S.ProfileContent $height="3rem">
                        <S.ProfileIcon />
                        <S.ProfileTagBox>
                          <S.ProfileName>{user.name}</S.ProfileName>
                          <S.ProfileMention>@{user.username}</S.ProfileMention>
                        </S.ProfileTagBox>
                      </S.ProfileContent>

                      {isSelected ? <S.CheckedIcon /> : <S.UncheckedBox />}
                    </S.UserChoiceBox>
                  );
                })}
              </S.UserChoiceContainer>
            </S.TopSection>

            <S.BottomRow>
              {rival.error && <S.ErrorText>{rival.error}</S.ErrorText>}
              <S.ButtonBox>
                <S.CloseButton onClick={rival.handleSelectClose}>초기화</S.CloseButton>
                <S.OkayButton onClick={rival.handleRivalCreate}>확인</S.OkayButton>
              </S.ButtonBox>
            </S.BottomRow>
          </>
        ) : (
          <S.ApplyContainer>
            <S.DetermineTitle>현재 라이벌</S.DetermineTitle>

            <S.UserChoiceContainer>
              {rival.rivalsData?.myRivals.map(user => (
                <S.UserChoiceBox key={user.rivalId ?? user.id} $isRival={true}>
                  <S.ProfileContent $height="3rem">
                    <S.ProfileIcon />
                    <S.ProfileTagBox>
                      <S.ProfileName>{user.name}</S.ProfileName>
                      <S.ProfileMention>@{user.username}</S.ProfileMention>
                    </S.ProfileTagBox>
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
              ))}
            </S.UserChoiceContainer>

            {rival.deleteConfirmOpen && rival.pendingDelete?.id != null && (
              <DeleteRivalsDialog
                isOpen={rival.deleteConfirmOpen}
                onClose={rival.closeDeleteConfirm}
                rival={rival}
                rivalId={rival.pendingDelete.id}
                userName={rival.pendingDelete.name}
              />
            )}

            {rival.error && <S.ErrorText>{rival.error}</S.ErrorText>}
          </S.ApplyContainer>
        )}
      </S.DialogLayout>
    </Dialog>
  );
};
