import { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { ConfirmModal } from './Modals/ConfirmModal'

export function TransactionsTable({ transactions, handleDeleteTransaction }) {
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(-1)

    function handleClick(index) {
        setCurrentIndex(index)
        setIsModalOpened(true)
    }
    return (
        <>
            <ConfirmModal
                isModalOpened={isModalOpened}
                setIsModalOpened={setIsModalOpened}
                message="Tem certeza que deseja deletar essa transação?"
                onConfirm={() => handleDeleteTransaction(currentIndex)}
            />

            <div className="">
                <table className="w-full border-separate border-spacing-y-1.5">
                    <thead className="text-left">
                        <tr className="text-primary">
                            <th className="px-4 font-semibold">Quem pagou</th>
                            <th className="px-4 font-semibold">Valor Total</th>
                            <th className="px-4 font-semibold">Valor pra Cada</th>
                            <th className="px-4 font-semibold">Descrição</th>
                            <th className="px-4 font-semibold">Data</th>
                        </tr>
                    </thead>

                    <tbody className="overflow-y-auto max-h-96">
                        {transactions.map((elem, index) => (
                            <tr key={index} className="group bg-light-gray">
                                <td className="rounded-l px-4 py-2">{elem.user}</td>
                                <td className="px-4 py-2">
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(elem.value)}
                                </td>
                                <td className="px-4 py-2">
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(elem.valuePerUser)}
                                </td>
                                <td className="px-4 py-2">{elem.description}</td>
                                <td className="rounded-r px-4 py-2">
                                    {new Intl.DateTimeFormat('pt-BR').format(elem.createdAt)}
                                </td>
                                <td className="pl-2 bg-background invisible group-hover:visible hover:opacity-100 cursor-pointer text-red-500">
                                    <IoCloseSharp size={20} onClick={() => handleClick(index)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
