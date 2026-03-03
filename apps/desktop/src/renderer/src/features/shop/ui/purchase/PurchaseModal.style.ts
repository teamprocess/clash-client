import styled from "styled-components";
import { font } from "@/shared/config/font";
import Close from "@/features/shop/assets/no.svg";
import Cookie from "@/features/shop/assets/cookie.svg";
import Token from "@/features/shop/assets/token.svg";
import Money from "@/features/shop/assets/money.png";

export const CookieIcon = styled(Cookie)`
  margin-left: -0.25rem;
`;

export const TokenIcon = styled(Token)`
  margin-left: -0.25rem;
`;

export const MoneyIcon = styled.img.attrs({
  src: Money,
})`
  width: 6rem;
  height: 6rem;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  width: 28rem;
  min-height: 22rem;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.fill.neutral};
  box-shadow: ${({ theme }) => theme.line.normal};
  padding: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.label.normal};
  ${font.title2.medium};
`;

export const CloseIcon = styled(Close)`
  width: 2rem;
  height: 2rem;

  color: ${({ theme }) => theme.label.assistive};
`;

export const CloseButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.85;
  }
`;

export const SectionTitle = styled.div`
  color: ${({ theme }) => theme.label.normal};
  ${font.body.medium};
  margin-bottom: 0.5rem;
`;

export const ReceiptBox = styled.div`
  background: ${({ theme }) => theme.fill.alternative};
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const ItemName = styled.div`
  color: ${({ theme }) => theme.label.alternative};
  ${font.body.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: ${({ theme }) => theme.label.alternative};
  ${font.body.medium};
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.1rem;
  margin: 1.5rem 0;
  background: ${({ theme }) => theme.line.normal};
`;

export const ConfirmText = styled.div`
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.label.normal};
  ${font.body.medium};
  text-align: center;
`;

export const SubText = styled.div`
  margin-top: 0.35rem;
  color: ${({ theme }) => theme.label.assistive};
  ${font.label.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  text-align: center;
`;

export const PrimaryButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  height: 3.5rem;
  border: none;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.primary.normal};
  color: ${({ theme }) => theme.label.normal};
  ${font.headline2.bold};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SuccessBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

export const SuccessTitle = styled.div`
  color: ${({ theme }) => theme.label.normal};
  ${font.headline2.bold};
  text-align: center;
`;

export const ErrorText = styled.p`
  margin-top: 12px;
  text-align: center;
`;
