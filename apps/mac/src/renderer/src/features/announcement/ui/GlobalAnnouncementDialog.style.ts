import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: ${({ theme }) => theme.label.assistive};
`;

export const Period = styled.span`
  ${font.label.medium}
`;

export const ContentBox = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 1rem;
  padding: 1rem 1.125rem 1.75rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.alternative};
  overflow-y: auto;
`;

export const Content = styled.div`
  ${font.body.medium}
  width: 100%;
  min-width: 0;
  color: ${({ theme }) => theme.label.normal};
  overflow-wrap: anywhere;
  line-height: 1.6;

  & > * {
    margin: 0;
  }

  & > * + * {
    margin-top: 0.875rem;
  }

  p,
  li {
    word-break: keep-all;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    color: ${({ theme }) => theme.label.normal};
  }

  h1 {
    ${font.headline1.bold}
  }

  h2 {
    ${font.headline2.medium}
  }

  h3,
  h4,
  h5,
  h6 {
    ${font.body.bold}
  }

  ul,
  ol {
    margin: 0;
    padding-left: 1.25rem;
  }

  li + li {
    margin-top: 0.35rem;
  }

  blockquote {
    margin: 0;
    padding-left: 0.875rem;
    border-left: 0.1875rem solid ${({ theme }) => theme.line.normal};
    color: ${({ theme }) => theme.label.assistive};
  }

  hr {
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.line.alternative};
  }

  code {
    padding: 0.15rem 0.35rem;
    border-radius: 0.4rem;
    background: ${({ theme }) => theme.fill.alternative};
    font-family:
      ui-monospace, "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.9em;
  }

  pre {
    margin: 0;
    padding: 0.9rem 1rem;
    border-radius: 0.75rem;
    background: ${({ theme }) => theme.fill.alternative};
    overflow-x: auto;
  }

  pre code {
    padding: 0;
    background: transparent;
  }

  table {
    display: block;
    width: 100%;
    overflow-x: auto;
    border-collapse: collapse;
  }

  thead,
  tbody,
  tr {
    width: 100%;
  }

  th,
  td {
    padding: 0.55rem 0.7rem;
    border: 1px solid ${({ theme }) => theme.line.alternative};
    text-align: left;
    vertical-align: top;
  }

  th {
    ${font.label.medium}
    background: ${({ theme }) => theme.fill.alternative};
  }
`;

export const ContentLink = styled.a`
  color: ${({ theme }) => theme.primary.normal};
  text-decoration: underline;
  cursor: pointer;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 0.25rem;
`;

export const HideOption = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  min-width: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.label.assistive};
  user-select: none;
`;

export const HideCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: ${({ theme }) => theme.primary.normal};
  cursor: pointer;
`;

export const HideText = styled.span`
  ${font.label.medium}
`;
