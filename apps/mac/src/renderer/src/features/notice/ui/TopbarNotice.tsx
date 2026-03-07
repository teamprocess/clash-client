import { useEffect, useRef, useState } from "react";
import { formatNoticeDate, useTopbarNotice } from "@/features/notice/model/useTopbarNotice";
import { Popover } from "@/shared/ui";
import * as S from "./TopbarNotice.style";

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

  return (
    <>
      <S.NoticeTriggerWrapper ref={anchorRef}>
        <S.NoticeButton type="button" onClick={toggle}>
          {unreadCount > 0 ? <S.NoticeOnIcon /> : <S.NoticeIcon />}
        </S.NoticeButton>
      </S.NoticeTriggerWrapper>
      <Popover
        isOpen={isOpen}
        onClose={close}
        anchorRef={anchorRef}
        align="end"
        offset={14}
        alignOffset="1rem"
      >
        <S.NoticePanel>
          <S.NoticeHeader>
            <S.TabHeader>
              <S.Tabs ref={tabsRef}>
                <S.Tab
                  ref={unreadTabRef}
                  type="button"
                  $isActive={activeTab === "UNREAD"}
                  onClick={() => setActiveTab("UNREAD")}
                >
                  미확인
                </S.Tab>
                <S.Tab
                  ref={allTabRef}
                  type="button"
                  $isActive={activeTab === "ALL"}
                  onClick={() => setActiveTab("ALL")}
                >
                  전체
                </S.Tab>
              </S.Tabs>
              <S.TabRail>
                <S.TabActiveRail $left={activeRail.left} $width={activeRail.width} />
              </S.TabRail>
            </S.TabHeader>
            <S.CloseButton type="button" onClick={close}>
              <S.CloseIcon />
            </S.CloseButton>
          </S.NoticeHeader>
          {isLoading ? (
            <S.NoneNotice>알림을 불러오는 중입니다.</S.NoneNotice>
          ) : (
            <>
              {hasNotice && (
                <S.SearchBox>
                  <S.SearchUsers
                    value={searchKeyword}
                    onChange={event => setSearchKeyword(event.target.value)}
                    placeholder="보낸 사람, 알림 내용으로 검색"
                  />
                  <S.SearchIconBox>
                    <S.SearchIcon />
                  </S.SearchIconBox>
                </S.SearchBox>
              )}
              {filteredNotices.length > 0 ? (
                <S.NoticeContainer>
                  {filteredNotices.map(notice => (
                    <S.NoticeBox key={notice.id}>
                      {notice.senderProfileImage ? (
                        <S.NoticeProfileImage
                          src={notice.senderProfileImage}
                          alt={`${notice.senderName ?? "발신자"} 프로필`}
                        />
                      ) : (
                        <S.NoticeProfileIcon />
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
                                aria-label="알림 확인"
                              >
                                <S.ConfirmIcon />
                              </S.ChoiceButton>
                              <S.ChoiceButton
                                type="button"
                                onClick={() => void denyNotice(notice)}
                                disabled={processingNoticeId === notice.id}
                                aria-label="알림 닫기"
                              >
                                <S.DenyIcon />
                              </S.ChoiceButton>
                            </>
                          ) : !notice.isRead ? (
                            <S.ChoiceButton
                              type="button"
                              onClick={() => void readNotice(notice)}
                              disabled={notice.isRead || processingNoticeId === notice.id}
                              aria-label="알림 읽음 처리"
                            >
                              <S.TrashIcon />
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
                <S.NoneNotice>{emptyMessage}</S.NoneNotice>
              )}
            </>
          )}
        </S.NoticePanel>
      </Popover>
    </>
  );
};
