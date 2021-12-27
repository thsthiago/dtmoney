import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { Container } from "./styles"

interface transation {
  id: number
  title: string
  type: string
  caterogy: string
  amount: number
  createdAt: Date
}

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<transation[]>([])

  useEffect(() => {
    api.get('/transactions')
      .then(({ data }) => setTransactions(data.transactions))
      .catch(error => console.log(error))
  }, [])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.amount)}
              </td>
              <td>{transaction.caterogy}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
