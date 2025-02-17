import { Formik, Field, FormikHelpers } from "formik";

import { useSelector } from "react-redux";

import { selectChannels} from "./channelsSlice";

import { useAddChannelMutation, useEditChannelMutation } from "./channelsApi";

import { Modal, Form, Button } from "react-bootstrap";

import { channelFieldValidation } from "./channelFieldValidation";

interface ChannelModalProps {
  mode: 'add' | 'edit';
  setModalMode: (arg: 'add' | 'edit') => void ;
  show: boolean;
  handleModalClose: (arg: 'add') => void;
  existingChannel?: { id: string, name: string };
}

const ChannelModal: React.FC<ChannelModalProps> = ({ mode, setModalMode, show, handleModalClose, existingChannel }): JSX.Element => {
  const [addChannel] = useAddChannelMutation();
  const [editChannel] = useEditChannelMutation();
  const channels = useSelector(selectChannels);

  const initialValues = { name: existingChannel?.name ?? '' };

  // ADD TOASTIFY TO HANDLE ERRORS/SUCCESS
  const handleSubmit = async (value: { name: string}, { setSubmitting, setErrors, resetForm }: FormikHelpers<typeof initialValues>): Promise<void> => {
    setSubmitting(false);
    try {
      if (mode === 'add') {
        await addChannel(value);
      } else {
        await editChannel({id: existingChannel!.id, name: value.name});
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
