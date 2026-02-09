import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const Wrapper = styled.section`
  -webkit-app-region: no-drag;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-height: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

export const Title = styled.p`
  ${font.title1.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

export const FilterChip = styled.button<{ $active: boolean }>`
  border: none;
  cursor: pointer;
  padding: 0.375rem 0.875rem;
  border-radius: 0.875rem;
  ${font.label.medium};
  color: ${({ $active, theme }) => ($active ? palette.neutral[95] : theme.label.assistive)};
  background: ${({ $active, theme }) => ($active ? theme.primary.normal : theme.fill.neutral)};
`;

export const GridScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 12.25rem);
  gap: 1.75rem;
  justify-content: start;
`;

export const CardButton = styled.button<{ $active: boolean }>`
  -webkit-app-region: no-drag;
  width: 12.25rem;
  height: 8.125rem;
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  border-radius: 1.25rem;
  &:focus,
  &:focus-visible,
  &:active,
  &:hover {
    outline: none;
    box-shadow: none;
  }
  onClickCapture={() => console.log("CAPTURE CLICK", item.id)}
`;

export const CardInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.fill.neutral};
  padding: 0.625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: none;
`;

export const ThumbBackground = styled.div`
  width: 100%;
  height: 4.5rem;
  border-radius: 0.75rem;
  background-color: var(--item-accent, #2f547b);
  background-image: var(--item-bg-image, none);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ThumbBadgeCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0.65rem;
  box-sizing: border-box;
`;

export const BadgeLeftRing = styled.div`
  width: 5.625rem;
  height: 5.625rem;
  border-radius: 5rem;
  box-sizing: border-box;
  border: 0.5rem solid var(--item-accent, #2f547b);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.fill.alternative};
  flex: 0 0 auto;
  overflow: hidden;
`;

export const BadgeAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BadgeRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 0;
`;

export const BadgePillInline = styled.span`
  width: fit-content;
  padding: 0.22rem 0.6rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.primary.normal};
  color: ${palette.neutral[95]};
  ${font.caption.medium};
`;

export const BadgeTitle = styled.p`
  ${font.headline2.medium};
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const ThumbName = styled.div`
  width: 100%;
  height: 4.5rem;
  background: ${({ theme }) => theme.fill.neutral};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  box-sizing: border-box;
`;

export const NameSmallRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const NameSmallAvatar = styled.img`
  width: 1.05rem;
  height: 1.05rem;
  object-fit: cover;
  opacity: 0.35;
`;

export const NameSmallBar = styled.div`
  width: 6.375rem;
  height: 0.75rem;
  border-radius: 0.375rem;
  background: ${({ theme }) => theme.line.neutral};
  opacity: 0.9;
`;

export const NameMainRow = styled.div`
  width: 100%;
  height: 1.875rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.line.neutral};
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.6rem;
  box-sizing: border-box;
`;

export const NameMainAvatar = styled.img`
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 1.25rem;
  object-fit: cover;
  box-sizing: border-box;
  border: 0.25rem solid var(--item-accent, #2f547b);
`;

export const NameMainBar = styled.div`
  flex: 1;
  height: 1.125rem;
  border-radius: 0.5rem;
  background-color: var(--item-accent, #2f547b);
  background-image: var(--item-bg-image, none);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const ItemTitle = styled.p`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const BadgePill = styled.span`
  padding: 0.22rem 0.6rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.primary.normal};
  color: ${palette.neutral[95]};
  ${font.caption.medium};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  -webkit-app-region: no-drag;
`;

export const ModalContainer = styled.div`
  width: 46.5rem;
  height: 31rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.fill.neutral};
  position: relative;
  padding: 2rem;
  box-sizing: border-box;
  -webkit-app-region: no-drag;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ModalBody = styled.div`
  width: 100%;
  height: calc(100% - 4.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ModalTitle = styled.p`
  ${font.title1.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const ModalDesc = styled.p`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

export const ModalFooter = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  display: flex;
  gap: 0.75rem;
`;

export const ModalCancel = styled.button`
  width: 4rem;
  height: 2rem;
  border: none;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.line.normal};
  color: ${palette.neutral[97]};
  ${font.label.medium};
  cursor: pointer;
`;

export const ModalSave = styled.button`
  width: 4rem;
  height: 2rem;
  border: none;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.primary.normal};
  color: ${palette.neutral[97]};
  ${font.label.medium};
  cursor: pointer;
`;
