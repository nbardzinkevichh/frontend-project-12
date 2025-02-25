import { Formik, Field, FormikHelpers } from "formik";

import { useSelector } from "react-redux";

import {Channel, selectChannels, setActiveChannel} from "../../feauters/Channels/channelsSlice.ts";

import RemoveChannelModal from "./RemoveChannelModal.tsx";

import {useAddChannelMutation, useEditChannelMutation } from "../../feauters/Channels/channelsApi.ts";

import { Modal, Form, Button } from "react-bootstrap";

import { channelFieldValidation } from "./channelFieldValidation.ts";
import {useTranslation} from "react-i18next";
import { showSuccess } from '../../lib/toastify/toasts.ts';

import leoProfanityFilter from '../../utility/leoProfanityFilter.ts';
import {useAppDispatch} from "../../feauters/store.ts";

import useErrorHandler from '../../hooks/useErrorHandler.ts';
import {useEffect} from "react";

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
  const [addChannel, { error }] = useAddChannelMutation();
  const [editChannel, { error: editChannelError }] = useEditChannelMutation();
  const channels = useSelector(selectChannels);
  const dispatch = useAppDispatch();

  const errorHandler = useErrorHandler();

  useEffect(() => {
    if (error || editChannelError) {
      errorHandler(error, t('dataLoadingError'));
    }
  }, [error, editChannelError]);

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
        const response = await addChannel({ name: filteredChannelName });
        if (!response.error) {
          dispatch(setActiveChannel(response.data as Channel));
          showSuccess(t('channels.success.create'));
        }
      }

      if (mode === 'edit') {
        const response = await editChannel(
          { id: existingChannel!.id, name: filteredChannelName }
        );
        if (!response.error) {
          showSuccess(t('channels.success.rename'));
        }
      }
      resetForm();
      handleModalClose();
      setModalMode('add');

    } catch (e) {
      errorHandler(e, null);
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
              <Modal.Title>{mode === 'add' ? 'Добавить канал' : 'Переименовать канал'}</Modal.Title>
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
