import * as Dialog from "@radix-ui/react-dialog";
import { Container, Content, NewTransactionButton } from "./styles";
import logoImg from "../../assets/logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Logomarca do projeto" />
        <Dialog.Root>
          <Dialog.DialogTrigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.DialogTrigger>
          <NewTransactionModal />
        </Dialog.Root>
      </Content>
    </Container>
  );
}
