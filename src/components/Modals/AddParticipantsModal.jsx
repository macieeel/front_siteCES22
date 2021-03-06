import { useState } from 'react'
import Modal from 'react-modal'
import { Button } from '../Button'
import { IoCloseSharp } from 'react-icons/io5'
import axios from '../../axios'
import Router from 'next/router'

export function AddParticipantsModal({ isModalOpened, setIsModalOpened, groupId }) {
    const [participant, setParticipant] = useState('')
    const [participantsArray, setParticipantsArray] = useState([])
    const isSubmitButtonDisabled = participantsArray.length == 0

    function handleCloseModal() {
        setParticipant('')
        setParticipantsArray([])
        setIsModalOpened(false)
    }

    function handleAddParticipant() {
        setParticipantsArray([...participantsArray, participant])
        setParticipant('')
    }

    function handleDeleteParticipant(index) {
        setParticipantsArray(previousArray =>
            previousArray.filter((item, elemIndex) => elemIndex != index)
        )
    }

    async function handleAddParticipants() {
        try {
            const response = await axios.post('/addparticipants/add/' + groupId, {
                emails_array: participantsArray,
            })
            console.log(response.data)
            Router.reload(window.location.pathname)
        } catch (error) {
            console.log(error)
            alert(error)
        }
        handleCloseModal()
    }
    return (
        <Modal
            ariaHideApp={false}
            isOpen={isModalOpened}
            onRequestClose={handleCloseModal}
            className="w-full max-w-2xl p-8 bg-white rounded"
            overlayClassName="bg-black/60 inset-0 fixed flex justify-center items-center">
            <h2 className="text-primary text-center font-bold text-xl mb-8 ">
                Adicionar Parcipantes
            </h2>

            <form className="">
                <div className="flex">
                    <div className="pr-4 w-1/2 flex-none">
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="participants">
                                Participantes
                            </label>
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary transition-all"
                                type="email"
                                id="participants"
                                value={participant}
                                placeholder="Digite o email dos participantes"
                                onChange={event => setParticipant(event.target.value)}
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <Button
                                secondary
                                title="Adicionar Partipante"
                                onClick={handleAddParticipant}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col pl-4 justify-between h-fill w-full">
                        <div className="">
                            <p className="text-gray-700 text-sm font-bold mb-2">
                                Participantes Adicionados
                            </p>
                            {participantsArray.length > 0 ? (
                                participantsArray.map((elem, index) => (
                                    <span
                                        key={elem}
                                        className="mb-2 mr-2 flex inline-flex border border-gray-500 rounded-lg px-3 py-1">
                                        <p className="text-xs font-semibold mr-1">{elem}</p>
                                        <div className="cursor-pointer">
                                            <IoCloseSharp
                                                size={16}
                                                onClick={() => handleDeleteParticipant(index)}
                                            />
                                        </div>
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm">
                                    Adicione participantes para criar esse grupo
                                </p>
                            )}
                        </div>
                        <div className="w-full flex justify-center self-end">
                            <Button
                                primary
                                title="Atualizar Grupo"
                                onClick={handleAddParticipants}
                                style="disabled:opacity-50"
                                disabled={isSubmitButtonDisabled}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
