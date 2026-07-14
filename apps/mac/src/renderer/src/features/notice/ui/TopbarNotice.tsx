import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { formatNoticeDate, useTopbarNotice } from "@/features/notice/model/useTopbarNotice";
import { Button, Popover, SkeletonRows } from "@/shared/ui";
import * as S from "./TopbarNotice.style";
import { getErrorMessage } from "@/shared/lib";

export const TopbarNotice = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const unreadTabRef = useRef<HTMLButtonElement>(null);
  const allTabRef = useRef<HTMLButtonElement>(null);
  const [activeRail, setActiveRail] = useState({ left: 0, width: 0 });
  const {
    isOpen,
    isLoading,
    hasNotice,
    unreadCount,
    activeTab,
    searchKeyword,
    filteredNotices,
    emptyMessage,
    processingNoticeId,
    isError,
    hasQueryData,
    error,
    refetch,
    actionError,
    setActiveTab,
    setSearchKeyword,
    toggle,
    close,
    readNotice,
    confirmNotice,
    denyNotice,
  } = useTopbarNotice();

  useEffect(() => {
    const activeTabElement = activeTab === "UNREAD" ? unreadTabRef.current : allTabRef.current;
    const tabsElement = tabsRef.current;

    if (!activeTabElement || !tabsElement) {
      return;
    }

    const tabsRect = tabsElement.getBoundingClientRect();
    const activeRect = activeTabElement.getBoundingClientRect();

    setActiveRail({
      left: activeRect.left - tabsRect.left,
      width: activeRect.width,
    });
  }, [activeTab, isOpen]);

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const nextTab =
      event.key === "Home"
        ? "UNREAD"
        : event.key === "End"
          ? "ALL"
          : activeTab === "UNREAD"
            ? "ALL"
            : "UNREAD";

    setActiveTab(nextTab);
    (nextTab === "UNREAD" ? unreadTabRef.current : allTabRef.current)?.focus();
  };

  return (
    <>
      <S.NoticeTriggerWrapper ref={anchorRef}>
        <S.NoticeButton
          type="button"
          aria-label={unreadCount > 0 ? `알림 열기, 읽지 않은 알림 ${unreadCount}개` : "알림 열기"}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="topbar-notice-panel"
          onClick={toggle}
        >
          {unreadCount > 0 ? (
            <S.NoticeOnIcon aria-hidden="true" focusable="false" />
          ) : (
            <S.NoticeIcon aria-hidden="true" focusable="false" />
          )}
        </S.NoticeButton>
      </S.NoticeTriggerWrapper>
      <Popover
        isOpen={isOpen}
        onClose={close}
        anchorRef={anchorRef}
        align="end"
        offset={14}
        alignOffset="1rem"
        role="dialog"
        ariaLabel="알림"
      >
        <S.NoticePanel id="topbar-notice-panel">
          <S.NoticeHeader>
            <S.TabHeader>
              <S.Tabs ref={tabsRef} role="tablist" aria-label="알림 분류">
                <S.Tab
                  ref={unreadTabRef}
                  type="button"
                  id="topbar-notice-tab-unread"
                  role="tab"
                  aria-selected={activeTab === "UNREAD"}
                  aria-controls="topbar-notice-tab-panel"
                  tabIndex={activeTab === "UNREAD" ? 0 : -1}
                  $isActive={activeTab === "UNREAD"}
                  onClick={() => setActiveTab("UNREAD")}
                  onKeyDown={handleTabKeyDown}
                >
                  미확인
                </S.Tab>
                <S.Tab
                  ref={allTabRef}
                  type="button"
                  id="topbar-notice-tab-all"
                  role="tab"
                  aria-selected={activeTab === "ALL"}
                  aria-controls="topbar-notice-tab-panel"
                  tabIndex={activeTab === "ALL" ? 0 : -1}
                  $isActive={activeTab === "ALL"}
                  onClick={() => setActiveTab("ALL")}
                  onKeyDown={handleTabKeyDown}
                >
                  전체
                </S.Tab>
              </S.Tabs>
              <S.TabRail aria-hidden="true">
                <S.TabActiveRail $left={activeRail.left} $width={activeRail.width} />
              </S.TabRail>
            </S.TabHeader>
            <S.CloseButton type="button" aria-label="알림 닫기" onClick={close}>
              <S.CloseIcon aria-hidden="true" focusable="false" />
            </S.CloseButton>
          </S.NoticeHeader>
          <S.TabPanel
            id="topbar-notice-tab-panel"
            role="tabpanel"
            aria-labelledby={
              activeTab === "UNREAD" ? "topbar-notice-tab-unread" : "topbar-notice-tab-all"
            }
          >
            {actionError && <S.ActionError role="alert">{actionError}</S.ActionError>}
            {isError && hasQueryData && (
              <S.BackgroundErrorNotice role="alert">
                <span>새 알림을 불러오지 못해 이전 결과를 표시해요.</span>
                <Button type="button" variant="secondary" size="sm" onClick={() => void refetch()}>
                  다시 시도
                </Button>
              </S.BackgroundErrorNotice>
            )}
            {isLoading ? (
              <SkeletonRows ariaLabel="알림을 불러오는 중" rows={4} showTrailing compact />
            ) : isError && !hasQueryData ? (
              <S.NoticeState role="alert">
                <span>{getErrorMessage(error, "알림을 불러오지 못했어요.")}</span>
                <Button type="button" variant="primary" size="sm" onClick={() => void refetch()}>
                  다시 시도
                </Button>
              </S.NoticeState>
            ) : (
              <>
                {hasNotice && (
                  <S.SearchBox>
                    <S.SearchUsers
                      type="search"
                      aria-label="알림 검색"
                      value={searchKeyword}
                      onChange={event => setSearchKeyword(event.target.value)}
                      placeholder="보낸 사람, 알림 내용으로 검색"
                    />
                    <S.SearchIconBox>
                      <S.SearchIcon aria-hidden="true" focusable="false" />
                    </S.SearchIconBox>
                  </S.SearchBox>
                )}
                {filteredNotices.length > 0 ? (
                  <S.NoticeContainer role="list">
                    {filteredNotices.map(notice => (
                      <S.NoticeBox key={notice.id} role="listitem">
                        {notice.senderProfileImage ? (
                          <S.NoticeProfileImage
                            src={notice.senderProfileImage}
                            alt={`${notice.senderName ?? "발신자"} 프로필`}
                          />
                        ) : (
                          <S.NoticeProfileIcon aria-hidden="true" focusable="false" />
                        )}
                        <S.NoticeTextWrapper>
                          <S.NameRow>
                            <S.IdentityRow>
                              <S.NoticeName>
                                {notice.senderName ??
                                  notice.senderUsername ??
                                  `사용자 ${notice.senderId}`}
                              </S.NoticeName>
                              <S.Mention>@{notice.senderUsername ?? notice.senderId}</S.Mention>
                            </S.IdentityRow>
                          </S.NameRow>
                          <S.Explain>{notice.message}</S.Explain>
                        </S.NoticeTextWrapper>
                        <S.ChoiceBox>
                          <S.ChoiceActions>
                            {notice.requiresAction ? (
                              <>
                                <S.ChoiceButton
                                  type="button"
                                  onClick={() => void confirmNotice(notice)}
                                  disabled={processingNoticeId === notice.id}
                                  aria-label={`${notice.senderName ?? notice.senderUsername ?? "발신자"} 알림 수락`}
                                >
                                  <S.ConfirmIcon aria-hidden="true" focusable="false" />
                                </S.ChoiceButton>
                                <S.ChoiceButton
                                  type="button"
                                  onClick={() => void denyNotice(notice)}
                                  disabled={processingNoticeId === notice.id}
                                  aria-label={`${notice.senderName ?? notice.senderUsername ?? "발신자"} 알림 거절`}
                                >
                                  <S.DenyIcon aria-hidden="true" focusable="false" />
                                </S.ChoiceButton>
                              </>
                            ) : !notice.isRead ? (
                              <S.ChoiceButton
                                type="button"
                                onClick={() => void readNotice(notice)}
                                disabled={notice.isRead || processingNoticeId === notice.id}
                                aria-label={`${notice.senderName ?? notice.senderUsername ?? "발신자"} 알림 읽음 처리`}
                              >
                                <S.TrashIcon aria-hidden="true" focusable="false" />
                              </S.ChoiceButton>
                            ) : null}
                          </S.ChoiceActions>
                          {notice.createdAt && (
                            <S.NoticeMeta>{formatNoticeDate(notice.createdAt)}</S.NoticeMeta>
                          )}
                        </S.ChoiceBox>
                      </S.NoticeBox>
                    ))}
                  </S.NoticeContainer>
                ) : (
                  <S.NoneNotice role="status">{emptyMessage}</S.NoneNotice>
                )}
              </>
            )}
          </S.TabPanel>
        </S.NoticePanel>
      </Popover>
    </>
  );
};
