import * as S from "./GroupPage.style";
import { Record } from "@/features/record";
import { RecordHeader } from "@/features/record/ui/record-header/RecordHeader";

export const GroupPage = () => {
  return (
    <>
      <RecordHeader active={"GROUP"} />
      <S.GroupPageContainer>
        <Record />
      </S.GroupPageContainer>
    </>
  );
};
