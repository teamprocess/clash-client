import styled, { css } from "styled-components";
import Bronze from "./clash-bronze.svg";
import Silver from "./clash-silver.svg";
import Gold from "./clash-gold.svg";
import Diamond from "./clash-diamond.svg";
import Master from "./clash-master.svg";
import Aura from "./clash-aura.svg";
import Unranked from "./clash-unranked.svg";

const tierIcon = css`
  width: 2em;
  height: 2em;
  flex-shrink: 0;
`;

export const TierIcons = {
  UNRANKED: styled(Unranked)`
    ${tierIcon}
  `,
  BRONZE: styled(Bronze)`
    ${tierIcon}
  `,
  SILVER: styled(Silver)`
    ${tierIcon}
  `,
  GOLD: styled(Gold)`
    ${tierIcon}
  `,
  DIAMOND: styled(Diamond)`
    ${tierIcon}
  `,
  MASTER: styled(Master)`
    ${tierIcon}
  `,
  AURA: styled(Aura)`
    ${tierIcon}
  `,
};
