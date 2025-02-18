import {Button, Modal} from "react-bootstrap";
import { useRemoveChannelMutation } from './channelsApi';

// нам в случае модального окна который удаляет канал нужен другой обработчик handlesubmit

interface RemoveChannelModalProps {
  show: boolean;
  handleModalClose: () => void;
  existingChannel: { id: string; name: string };
}

const RemoveChannelModal =
  ({ show, handleModalClose, existingChannel}: RemoveChannelModalProps) => {
  const [removeChannel] = useRemoveChannelMutation();

  const handleSubmit = async () => {
    await removeChannel(existingChannel.id);
    handleModalClose();
  }

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Уверены?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Отменить
        </Button>

        <Button variant="danger" onClick={handleSubmit}>
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default RemoveChannelModal;