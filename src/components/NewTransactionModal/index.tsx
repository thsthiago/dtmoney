import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from "./styles"
import { FormEvent, useState } from 'react';
import { api } from '../../services/api';

interface InewTransactionModal {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal = ({ ...rest }: InewTransactionModal) => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  const handleCreateNewTransaction = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const data = {
        title,
        value: Number(value),
        category,
        type
      }

      api.post('/transactions', data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      {...rest}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={rest.onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit' && true}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw' && true}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}
