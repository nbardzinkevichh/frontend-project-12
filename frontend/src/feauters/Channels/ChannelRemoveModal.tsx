import { Button, Modal } from "react-bootstrap"

import { useRemoveChannelMutation } from "./channelsApi";

interface RemoveChannelModalProps {
  show: boolean;
  channelIdToDelete: string;
  handleModalClose: (arg: 'delete') => void;
}

export const RemoveChannelModal: React.FC<RemoveChannelModalProps> = ({show, channelIdToDelete, handleModalClose}) => {
  const [removeChannel] = useRemoveChannelMutation();

  const confirmChannelDeletion = async () => {
    try {
      await removeChannel(channelIdToDelete);

      handleModalClose('delete');
    } catch(e) {
      console.log(e);
    } 
  }

  return (
    <>
      <Modal show={show} onHide={() => handleModalClose('delete')}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Уверены?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleModalClose('delete')}>
          Отменить
        </Button>

        <Button variant="danger" onClick={confirmChannelDeletion}>
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}