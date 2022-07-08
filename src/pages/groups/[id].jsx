import { useRouter } from 'next/router'
import { Header } from '../../components/Header'
import Head from 'next/head'
import { Button } from '../../components/Button'
import { TransactionsTable } from '../../components/TransactionsTable'
import { useEffect, useState } from 'react'
import { NewTransactionModal } from '../../components/Modals/NewTransactionModal'
import Router from 'next/router'

export default function Group() {
    const router = useRouter()
    const { id } = router.query
    const [group, setGroup] = useState([])

    const [isModalOpened, setIsModalOpened] = useState(false)
    const [transactions, setTransactions] = useState([
        { user: 'Mamadeira', value: 100, description: 'Galões de água', createdAt: new Date() },
    ])

    function handleDeleteTransaction(index) {
        const newTransactions = [...transactions]
        newTransactions.splice(index, 1)
        setTransactions(newTransactions)
    }

    useEffect(() => {
        async function fecthData() {
            try {
                const response = await axios.get('/@me')
            } catch (error) {
                console.log('Not authenticated')
                console.log(error)
                Router.push('/login')
            }
        }
        fecthData()
    }, [])

    useEffect(() => {
        async function fecthData() {
            try {
                const response = await axios.get('/groupbyid/' + id)
                setGroup(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fecthData()
    }, [])

    return (
        <>
            {group ? (
                <>
                    <Head>
                        <title>{'Grupo | ' + group.nome}</title>
                    </Head>
                    <Header />
                    <NewTransactionModal
                        isModalOpened={isModalOpened}
                        setIsModalOpened={setIsModalOpened}
                        setTransactions={setTransactions}
                    />

                    <div className="w-full h-full flex">
                        <div className="flex-grow px-32">
                            <div className="mt-8 pr-4">
                                <h2 className="text-primary text-xl font-bold uppercase mb-4 text-center">
                                    {group.nome}
                                </h2>

                                <p className="font-bold mt-4">Transações:</p>
                                <TransactionsTable
                                    transactions={transactions}
                                    handleDeleteTransaction={handleDeleteTransaction}
                                />
                                <Button
                                    title="Nova Transação"
                                    style="text-sm mt-4"
                                    onClick={() => setIsModalOpened(true)}
                                />
                            </div>
                        </div>
                        <div className="h-full pt-8 w-1/3 bg-light-gray flex flex-col px-20 items-center">
                            <p className="text-lg font-bold text-primary">Participantes</p>
                            <div className="bg-background  rounded-xl w-full my-8 py-4 px-6 flex flex-col items-center">
                                {group.participants.map((elem, index) => (
                                    <div key={index} className="w-full flex justify-between mb-2">
                                        <p className="font-medium flex-1">{elem}</p>
                                        <p className="">me deve</p>
                                        <p className="flex-1 text-right">R$ 20, 00</p>
                                    </div>
                                ))}
                            </div>

                            <Button title="Adicionar Participantes" style="text-sm" />
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    )
}
