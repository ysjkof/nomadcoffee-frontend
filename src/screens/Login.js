import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;
const Container = styled.div``;

function Login() {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => isLoggedInVar(true)}>Login</button>
      <button onClick={() => darkModeVar(true)}>to Dark</button>
      <button onClick={() => darkModeVar(false)}>to Light</button>
    </Container>
  );
}

export default Login;
