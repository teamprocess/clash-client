import styled from "styled-components";
import More from "../assets/more.svg";

export const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 36%;
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: 64%;
  min-height: 0;
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
`;

export const MoreIcon = styled(More)`
  cursor: pointer;
`;
