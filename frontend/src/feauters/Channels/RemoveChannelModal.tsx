import {Button, Modal} from "react-bootstrap";
import { useRemoveChannelMutation } from './channelsApi';
import {useTranslation} from "react-i18next";
import {showSuccess} from "../../toastify/toasts.ts";

interface RemoveChannelModalProps {
  show: boolean;
  setModalMode: (arg: 'add' | 'edit' | 'remove') => void;
  handleModalClose: () => void;
  existingChannel: { id: string; name: string };
}

const RemoveChannelModal =
  ({ show, setModalMode, handleModalClose, existingChannel}: RemoveChannelModalProps) => {
  const [removeChannel] = useRemoveChannelMutation();
  const { t } = useTranslation('toasts');

  const handleSubmit = async () => {
    await removeChannel(existingChannel.id);
    setModalMode('add');
    handleModalClose();
    showSuccess(t('channels.success.remove'))
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