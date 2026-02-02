import styled from "styled-components";

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.background.normal};
  color: ${({ theme }) => theme.label.normal};
`;

function App() {
  return <AppContainer>hello</AppContainer>;
}

export default App;
