// src/components/NoteForm/NoteForm.tsx

import { useQueryClient } from '@tanstack/react-query';
import {createNote} from '../../lib/api';
import * as Yup from "yup";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import css from './NoteForm.module.css'
import type { OrderFormValues } from '../../types/note'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string()
    .max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required")
});

export default function NoteForm({ onClose }: { onClose: () => void }) {
  const fieldID = useId();

  const queryClient = useQueryClient();

  const initialValues: OrderFormValues = {
    title: "",
    content: "",
    tag: "Todo"
  };

  const handleSubmit = async (
    values: OrderFormValues,
    { setSubmitting }: FormikHelpers<OrderFormValues>
  ) => {
    try {
      await createNote(values);
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} >
        <fieldset>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldID}-title`}>Title</label>
            <Field id={`${fieldID}-title`} type="text" name="title" className={css.input} />
            <ErrorMessage
              name="title"
              component="span"
              className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldID}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldID}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldID}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldID}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage
              name="tag"
              component="span"
              className={css.error} />
          </div>
        </fieldset>
          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={false}
            >
              Create note
            </button>
          </div>
        </Form>
    </Formik>
  )
}