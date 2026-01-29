import { useState } from "react";
import * as S from "./ProfileTaps.style";

type TabKey = "github" | "item" | "time";

const ProfileTabs = () => {
  const [active, setActive] = useState<TabKey>("github");

  return (
    <S.Wrapper>
      <S.TabRow>
        <S.TabButton $active={active === "github"} onClick={() => setActive("github")}>
          깃허브
        </S.TabButton>

        <S.TabButton $active={active === "item"} onClick={() => setActive("item")}>
          아이템
        </S.TabButton>

        <S.TabButton $active={active === "time"} onClick={() => setActive("time")}>
          시간
        </S.TabButton>
      </S.TabRow>

      <S.Underline>
        <S.Indicator $active={active} />
      </S.Underline>
    </S.Wrapper>
  );
};

export default ProfileTabs;
