import type { MouseEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { useGlobalAnnouncement } from "../model/useGlobalAnnouncement";
import { normalizeAnnouncementMarkdown } from "../lib/announcementMarkdown";
import { Button, Dialog } from "@/shared/ui";
import * as S from "./GlobalAnnouncementDialog.style";

export const GlobalAnnouncementDialog = () => {
  const { announcement, isOpen, hideForThreeDays, setHideForThreeDays, handleClose } =
    useGlobalAnnouncement();

  const handleOpenLink = async (event: MouseEvent<HTMLAnchorElement>, href?: string) => {
    const url = href?.trim();
    if (!url) {
      return;
    }

    event.preventDefault();

    if (typeof window === "undefined" || !window.api?.openExternalUrl) {
      return;
    }

    try {
      await window.api.openExternalUrl(url);
    } catch (error) {
      console.error("공지 링크를 여는 중 오류가 발생했습니다.", error);
    }
  };

  if (!announcement) {
    return null;
  }

  const content = normalizeAnnouncementMarkdown(announcement.content);
  const startedAtDate = announcement.startedAt ? new Date(announcement.startedAt) : null;
  const period =
    startedAtDate && !Number.isNaN(startedAtDate.getTime())
      ? `${startedAtDate.getFullYear()}년 ${startedAtDate.getMonth() + 1}월 ${startedAtDate.getDate()}일 ${startedAtDate.getHours()}시 ${String(startedAtDate.getMinutes()).padStart(2, "0")}분`
      : announcement.startedAt;

  return (
    <Dialog
      title={announcement.title}
      width={54}
      height={38}
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={true}
    >
      <S.Body>
        <S.Header>
          <S.Meta>
            <S.Period>{period}</S.Period>
          </S.Meta>
        </S.Header>

        <S.ContentBox>
          <S.Content>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                a: ({ href, children, ...props }) => (
                  <S.ContentLink
                    {...props}
                    href={href}
                    onClick={event => void handleOpenLink(event, href)}
                  >
                    {children}
                  </S.ContentLink>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </S.Content>
        </S.ContentBox>

        <S.Footer>
          <S.HideOption>
            <S.HideCheckbox
              type="checkbox"
              checked={hideForThreeDays}
              onChange={event => setHideForThreeDays(event.target.checked)}
            />
            <S.HideText>3일 동안 보지 않기</S.HideText>
          </S.HideOption>

          <Button variant="primary" size="sm" onClick={handleClose}>
            확인
          </Button>
        </S.Footer>
      </S.Body>
    </Dialog>
  );
};
