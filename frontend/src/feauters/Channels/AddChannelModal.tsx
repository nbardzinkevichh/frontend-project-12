import { Formik, Field, FormikHelpers } from "formik";
import { Modal, Form, Button, Dropdown } from "react-bootstrap";
import { channelNameSchema, isChannelNameExists } from "./channelFieldValidation";
import { useAddChannelMutation } from "./channelsApi";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { Channel, setChannel, setActiveChannel, selectChannels} from "./channelsSlice";

import { channelFieldValidation } from "./channelFieldValidation";



/// НАПИСАТЬ ПРОВЕРКУ НА УНИКАЛЬНОСТЬ НАЗВАНИЯ, пройтись по массиву названий и добавить кастомную проверку в yup
// Реализуйте выпадающее меню с кнопками управления каналом
// Реализуйте удаление канала (с подтверждением). Удаляться могут только вновь созданные каналы. 
// При удалении канала должны удаляться и его сообщения, а пользователи, находящиеся в удаляемом канале, должны быть перемещены в дефолтный канал
// Реализуйте переименование канала (внутри модального окна). Имена каналов не должны повторяться
// Отправка формы в модальных окнах должна работать не только по клику по кнопке, но и при нажатии Enter
// Имена каналов в списке должны быть с префиксом # (решетка и пробел). Например: # test channel
export default function AddChannelModal({show, handleClose} : {show: boolean, handleClose: () => void}): JSX.Element {
  const dispatch = useAppDispatch();
  const [addChannel, { data }] = useAddChannelMutation();
  const channels = useSelector((state: RootState) => selectChannels(state));

  const initialValues = { name: '' };

  const handleSubmit = async (value: {name: string}, { setSubmitting, setErrors }: FormikHelpers<typeof initialValues>) => {
    try {
      setSubmitting(false);
      await addChannel(value).then((response) => {
        const newChannel: Channel = response.data!;
        dispatch(setChannel(newChannel));
        dispatch(setActiveChannel(newChannel))

      })
      handleClose();
      
    } catch (e) {
      console.log(e)
      setErrors(e);
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
        handleSubmit 
      }) => (
        <>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Добавить канал</Modal.Title>
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
              <Button variant="secondary" onClick={handleClose}>
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