import Modal from 'react-modal'
import { Button } from '../Button'

export function ConfirmModal({ isModalOpened, setIsModalOpened, message, onConfirm }) {
    function handleCloseModal() {
        setIsModalOpened(false)
    }

    function handleConfirm() {
        onConfirm()
        handleCloseModal()
    }
    return (
        <Modal
            ariaHideApp={false}
            isOpen={isModalOpened}
            onRequestClose={handleCloseModal}
            className="px-8 py-10 bg-white rounded"
            overlayClassName="bg-black/60 inset-0 fixed flex justify-center items-center">
            <p className="text-center mb-8 text-regular font-medium"> {message}</p>
            <div className="flex justify-evenly">
                <Button primary title="Não" onClick={handleCloseModal} />
                <Button secondary title="Sim" onClick={handleConfirm} />
            </div>
        </Modal>
    )
}
