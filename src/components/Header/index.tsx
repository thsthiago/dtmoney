import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface IHeader {
  handleOpenNewTransactionModal: () => void
}

export const Header = ({ handleOpenNewTransactionModal }: IHeader) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt='dt money' />
        <button type="button" onClick={handleOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}
