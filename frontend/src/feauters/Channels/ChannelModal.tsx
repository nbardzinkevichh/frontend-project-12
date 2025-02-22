import { Formik, Field, FormikHelpers } from "formik";

import { useSelector } from "react-redux";

import { selectChannels} from "./channelsSlice";

import RemoveChannelModal from "./RemoveChannelModal";

import {useAddChannelMutation, useEditChannelMutation } from "./channelsApi";

import { Modal, Form, Button } from "react-bootstrap";

import { channelFieldValidation } from "./channelFieldValidation";
import {useTranslation} from "react-i18next";
import {showError, showSuccess} from "../../toastify/toasts.ts";

import leoProfanityFilter from '../../utility/leoProfanityFilter.ts';

const filter = leoProfanityFilter();

interface ChannelModalProps {
  mode: 'add' | 'edit' | 'remove';
  setModalMode: (arg: 'add' | 'edit' | 'remove') => void;
  show: boolean;
  handleModalClose: () => void;
  existingChannel?: { id: string, name: string };
}

const ChannelModal: React.FC<ChannelModalProps> = (
  { mode, setModalMode, show, handleModalClose, existingChannel }
) => {
  const { t } = useTranslation('toasts');
  const [addChannel] = useAddChannelMutation();
  const [editChannel] = useEditChannelMutation();
  const channels = useSelector(selectChannels);

  const initialValues = { name: existingChannel?.name ?? '' };

  if (mode === 'remove') {
    return <RemoveChannelModal show={show} setModalMode={setModalMode} handleModalClose={handleModalClose} existingChannel={existingChannel!} />;
  }

  const handleSubmit =
    async (value: { name: string }, { setSubmitting, resetForm }:
  FormikHelpers<typeof initialValues>): Promise<void> => {
    setSubmitting(false);
    const filteredChannelName = filter.clean(value.name);

    try {
      if (mode === 'add') {
        await addChannel({ name: filteredChannelName });
        console.log(showSuccess);
        showSuccess(t('channels.success.create'));
      }

      if (mode === 'edit') {
        await editChannel({ id: existingChannel!.id, name: filteredChannelName });
        showSuccess(t('channels.success.rename'));
      }
      resetForm();
      handleModalClose();
      setModalMode('add');


    } catch (e) {
      console.error(e);
      showError(t('networkError'));
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues, name: '' }}
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
          <Modal show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>{mode === 'add' ? 'Добавить канал' : 'Удалить канал'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <label htmlFor="name" className="visually-hidden">Имя канала</label>
                <Field
                  as={Form.Control}
                  name="name"
                  id="name"
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
                <Button variant="secondary" onClick={handleModalClose}>
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
