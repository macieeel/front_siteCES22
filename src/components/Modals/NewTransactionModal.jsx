import { useState } from 'react'
import Modal from 'react-modal'
import { Button } from '../Button'

export function NewTransactionModal({ isModalOpened, setIsModalOpened, setTransactions }) {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)
    const isSubmitButtonDisabled = value == 0 || !description

    function handleCloseModal() {
        setDescription('')
        setValue(0)
        setIsModalOpened(false)
    }

    async function handleCreateTransaction(event) {
        await axios
            .post('/createtransaction', {
                description: description,
                value: value,
            })
            .then(response => {
                setTransactions(previousTransactions => [...previousTransactions, response.data])
            })
            .catch(error => {
                console.log(error)
                alert(error)
            })
        handleCloseModal()
    }
    return (
        <Modal
            ariaHideApp={false}
            isOpen={isModalOpened}
            onRequestClose={handleCloseModal}
            className="w-full max-w-xl p-8 bg-white rounded"
            overlayClassName="bg-black/60 inset-0 fixed flex justify-center items-center">
            <h2 className="text-primary text-center font-bold text-xl mb-8 ">
                Cadastrar Transação
            </h2>
            <form className="">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description">
                        Descrição
                    </label>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary transition-all"
                        type="text"
                        id="description"
                        placeholder="Descreva sua transção"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
                        Valor
                    </label>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary transition-all"
                        type="number"
                        id="value"
                        value={value == 0 ? '' : value}
                        placeholder="Qual foi o valor?"
                        onChange={event => setValue(event.target.value)}
                    />
                </div>
                <div className="w-full flex justify-center">
                    <Button
                        primary
                        title="Cadastrar"
                        onClick={handleCreateTransaction}
                        style="disabled:opacity-50"
                        disabled={isSubmitButtonDisabled}
                    />
                </div>
            </form>
        </Modal>
    )
}
