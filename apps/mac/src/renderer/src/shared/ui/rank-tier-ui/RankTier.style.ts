import styled from "styled-components";
import { font } from "@clash/design-tokens";
import { RankTierState } from "@/shared/ui";

const getTierColor = (tier: string) => {
  switch (tier) {
    case "BRONZE":
      return "#CD7F32";
    case "SILVER":
      return "#C0C0C0";
    case "GOLD":
      return "#FFD700";
    case "PLATINUM":
      return "#66CCCC";
    case "DIAMOND":
      return "#6FA8DC";
    default:
      return "#999999";
  }
};

export const Container = styled.div<{ $tier: RankTierState }>`
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;

  ${font.caption.bold}
  color: ${({ theme }) => theme.fill.normal};
  background-color: ${({ $tier }) => getTierColor($tier)};
`;
