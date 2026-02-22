import { useRef } from "react";
import { formatNoticeDate, useTopbarNotice } from "@/features/notice/model/useTopbarNotice";
import { Popover } from "@/shared/ui";
import * as S from "./TopbarNotice.style";

export const TopbarNotice = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const {
    isOpen,
    isLoading,
    hasNotice,
    unreadCount,
    searchKeyword,
    filteredNotices,
    processingNoticeId,
    setSearchKeyword,
    toggle,
    close,
    readNotice,
    confirmNotice,
    denyNotice,
  } = useTopbarNotice();

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
        alignOffset="2rem"
      >
        <S.NoticePanel>
          <S.NoticeHeader>
            <S.NoticeTitle>알림</S.NoticeTitle>
            <S.CloseButton type="button" onClick={close}>
              <S.CloseIcon />
            </S.CloseButton>
          </S.NoticeHeader>
          {isLoading ? (
            <S.NoneNotice>알림을 불러오는 중입니다.</S.NoneNotice>
          ) : hasNotice ? (
            <>
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
                          {notice.requiresAction && !notice.isRead ? (
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
                          ) : (
                            <S.ChoiceButton
                              type="button"
                              onClick={() => void readNotice(notice)}
                              disabled={notice.isRead || processingNoticeId === notice.id}
                              aria-label="알림 읽음 처리"
                            >
                              <S.TrashIcon />
                            </S.ChoiceButton>
                          )}
                        </S.ChoiceActions>
                        {notice.createdAt && (
                          <S.NoticeMeta>{formatNoticeDate(notice.createdAt)}</S.NoticeMeta>
                        )}
                      </S.ChoiceBox>
                    </S.NoticeBox>
                  ))}
                </S.NoticeContainer>
              ) : (
                <S.NoneNotice>검색 결과가 없습니다.</S.NoneNotice>
              )}
            </>
          ) : (
            <S.NoneNotice>
              <S.CryIcon />
              현재 도착한 알림이 없습니다.
            </S.NoneNotice>
          )}
        </S.NoticePanel>
      </Popover>
    </>
  );
};
