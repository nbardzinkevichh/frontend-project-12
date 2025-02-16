import { Formik, Field, FormikHelpers } from "formik";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { Channel, setChannel, setActiveChannel, selectChannels, editChannelName} from "./channelsSlice";

import { useAddChannelMutation, useEditChannelMutation } from "./channelsApi";

import { Modal, Form, Button } from "react-bootstrap";

import { channelFieldValidation } from "./channelFieldValidation";



// При удалении канала должны удаляться и его сообщения, а пользователи, находящиеся 
// в удаляемом канале, должны быть перемещены в дефолтный канал ДОБАВИТЬ extra reducer

// я думаю стоит объединить модальные окна и добавить режим delete


interface ChannelModalProps {
  mode: 'add' | 'edit';
  setModalMode: (arg: 'add' | 'edit') => void ;
  show: boolean;
  handleModalClose: (arg: 'add') => void;
  existingChannel?: { id: string, name: string };
}


// const createChannel = async (name: string, addChannel: (name: string) => Channel): Promise<Channel> => {
//   const response = await addChannel(name);
//   const newChannel: Channel = response.data;
//   console.log(newChannel);
//   return newChannel;
// };
// const editChannel =


const ChannelModal: React.FC<ChannelModalProps> = ({ mode, setModalMode, show, handleModalClose, existingChannel }): JSX.Element => {
  const dispatch = useAppDispatch();
  const [addChannel] = useAddChannelMutation();
  const [editChannel, { data, error}] = useEditChannelMutation();
  const channels = useSelector((state: RootState) => selectChannels(state));

  const initialValues = { name: existingChannel?.name ?? '' };

  const handleSubmit = async (value: { name: string}, { setSubmitting, setErrors, resetForm }: FormikHelpers<typeof initialValues>): Promise<void> => {
    setSubmitting(false);
    try {
      if (mode === 'add') {
        await addChannel(value).then((response) => {
          const newChannel: Channel = response.data!;
          dispatch(setChannel(newChannel));
          dispatch(setActiveChannel(newChannel))
          
  
        })
      } else {
        const response = await editChannel({ id: existingChannel!.id, name: value.name });
        const newChannel: Channel = response.data!;
        console.log(newChannel);
        dispatch(editChannelName(newChannel));
        dispatch(setActiveChannel(newChannel))
        
      }
      
 
      resetForm();
      handleModalClose('add');
      setModalMode('add');
      
    } catch (e) {
      console.log(e)
      // setErrors();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      onSubmit={handleSubmit}
      validationSchema={channelFieldValidation(channels)}
    >
      {({ 
        touched, 
        errors,
        handleSubmit,
      }) => (
        <>
            <Modal show={show} onHide={() => handleModalClose('add')}>
            <Modal.Header closeButton>
              <Modal.Title>{mode === 'add' ? 'Добавить канал' : 'Переименовать канал'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}> 
            <Modal.Body>
           
              <Field
                as={Form.Control}
                name="name"
                required  
                type="text"
                placeholder=""
                className={`mb-3 ${
                  touched.name && errors.name ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.name}</div>
         
            
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleModalClose('add')}>
                Отменить
              </Button>
        
              <Button variant="primary" type="submit">
                Отправить
              </Button>
            </Modal.Footer>
            </Form>
            </Modal>
        </>
      )}

    </Formik>
  );
};

export default ChannelModal;
