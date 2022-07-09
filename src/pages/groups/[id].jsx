import { useRouter } from 'next/router'
import { Header } from '../../components/Header'
import Head from 'next/head'
import { Button } from '../../components/Button'
import { TransactionsTable } from '../../components/TransactionsTable'
import { useEffect, useState } from 'react'
import { NewTransactionModal } from '../../components/Modals/NewTransactionModal'
import axios from '../../axios'
import Router from 'next/router'
import { AddParticipantsModal } from '../../components/Modals/AddParticipantsModal'

export default function Group() {
    const router = useRouter()
    const { id } = router.query
    const [groupName, setGroupName] = useState('')
    const [groupParticipants, setGroupParticipants] = useState([])
    const [transactions, setTransactions] = useState([])
    const [saldos, setSaldos] = useState([])
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [isAddParticipantsModalOpened, setIsAddParticipantsModalOpened] = useState(false)

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
        if (!router.isReady) return
        async function fecthData() {
            try {
                const response = await axios.get('/groupbyid/' + id)
                console.log(response.data)
                setGroupName(response.data.nome)
                setGroupParticipants(response.data.participants)
                setTransactions(response.data.transactions)
                setSaldos(response.data.saldos)
            } catch (error) {
                console.log(error)
                Router.push('/')
            }
        }
        fecthData()
    }, [router.isReady])

    return (
        <>
            {groupName ? (
                <>
                    <Head>
                        <title>{'Grupo | ' + groupName}</title>
                    </Head>
                    <Header />
                    <NewTransactionModal
                        isModalOpened={isModalOpened}
                        setIsModalOpened={setIsModalOpened}
                        setTransactions={setTransactions}
                        setSaldos={setSaldos}
                    />
                    <AddParticipantsModal
                        isModalOpened={isAddParticipantsModalOpened}
                        setIsModalOpened={setIsAddParticipantsModalOpened}
                        groupId={id}
                    />

                    <div className="w-full h-full flex">
                        <div className="flex-grow px-32">
                            <div className="mt-8 pr-4">
                                <h2 className="text-primary text-xl font-bold uppercase mb-4 text-center">
                                    {groupName}
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
                            <div className="bg-background rounded-xl w-full my-8 py-4 px-6 flex flex-col items-center">
                                {groupParticipants.map((elem, index) => (
                                    <div
                                        key={elem.id}
                                        className="w-full flex justify-between mb-2 last:mb-0">
                                        <p className="font-medium flex-1">{elem.nome}</p>
                                        {saldos[index] > 0 ? (
                                            <p className="">me deve</p>
                                        ) : (
                                            <p className="">devo</p>
                                        )}

                                        <p
                                            className={`flex-1 text-right font-semibold ${
                                                saldos[index] > 0
                                                    ? 'text-green-500'
                                                    : saldos[index] < 0
                                                    ? 'text-red-500'
                                                    : ''
                                            }
                                               `}>
                                            {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(Math.abs(saldos[index]))}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Button
                                title="Adicionar Participantes"
                                style="text-sm"
                                onClick={() => setIsAddParticipantsModalOpened(true)}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    )
}
