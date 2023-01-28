import { Container, Content, NewTransactionButton } from "./styles";
import logoImg from "../../assets/logo.svg";

export function Header() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Logomarca do projeto" />
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </Content>
    </Container>
  );
}
