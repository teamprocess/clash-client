import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Cookie from "@/features/shop/assets/cookie.svg";
import Money from "@/features/shop/assets/money.png";
import { Button } from "@/shared/ui/button";

export const CookieIcon = styled(Cookie)`
  margin-left: -0.25rem;
`;

export const MoneyIcon = styled.img.attrs({
  src: Money,
})`
  width: 6rem;
  height: 6rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  padding-top: 0.5rem;
`;

export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SectionTitle = styled.div`
  color: ${({ theme }) => theme.label.normal};
  ${font.body.medium};
`;

export const ReceiptBox = styled.div`
  background: ${({ theme }) => theme.fill.alternative};
  border-radius: 0.75rem;
  padding: 1rem;
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
  margin: 1rem 0;
  background: ${({ theme }) => theme.line.normal};
`;

export const ConfirmText = styled.div`
  color: ${({ theme }) => theme.label.normal};
  ${font.body.medium};
  text-align: center;
`;

export const PurchaseBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SubText = styled.div`
  color: ${({ theme }) => theme.label.assistive};
  ${font.label.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  text-align: center;
`;

export const ConfirmTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1.5rem;
`;

export const PrimaryButton = styled(Button)`
  margin-top: auto;
  background-color: ${({ theme }) => theme.primary.normal};
  color: ${({ theme }) => theme.label.normal};
  ${font.body.bold};

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
  margin-top: 0.75rem;
  text-align: center;
`;
