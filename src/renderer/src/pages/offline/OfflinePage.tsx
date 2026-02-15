import * as S from "./OfflinePage.style";
import { Button } from "@/shared/ui";

export const OfflinePage = () => {
  return (
    <S.OfflineContainer>
      <S.OfflineBox>
        <S.Title>인터넷 연결이 필요합니다.</S.Title>
        <S.Description>네트워크 연결 상태를 확인한 뒤 다시 시도해주세요.</S.Description>
        <Button variant="primary" onClick={() => window.location.reload()}>
          다시 시도
        </Button>
      </S.OfflineBox>
    </S.OfflineContainer>
  );
};
