import { Button, Modal } from "react-bootstrap"
import { setActiveChannel, deleteChannel, selectChannels } from "./channelsSlice";
import { useRemoveChannelMutation } from "./channelsApi";
import { RootState, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";

interface RemoveChannelModalProps {
  show: boolean;
  channelIdToDelete: string;
  handleModalClose: (arg: 'delete') => void;
}

export const RemoveChannelModal: React.FC<RemoveChannelModalProps> = ({show, channelIdToDelete, handleModalClose}) => {
  const dispatch = useAppDispatch();
  const channels = useSelector((state: RootState) => selectChannels(state));

  const [removeChannel] = useRemoveChannelMutation();
  
  
  const confirmChannelDeletion = async () => {
    try {
      const response = await removeChannel(channelIdToDelete);
      dispatch(deleteChannel(response.data!));
      dispatch(setActiveChannel(channels[0]));
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