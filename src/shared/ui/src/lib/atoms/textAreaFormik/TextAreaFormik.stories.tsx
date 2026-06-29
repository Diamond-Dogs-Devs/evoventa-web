// TextAreaFormik.stories.tsx
import { Formik, Form } from 'formik';
import TextAreaFormik from './TextAreaFormik';
import React from 'react';

export default {
  title: 'TextAreaFormik',
  component: TextAreaFormik,
};

export const Basic = () => (
  <Formik
    initialValues={{ description: '' }}
    onSubmit={(values) => console.log(values)}
  >
    <Form>
      <TextAreaFormik name="description" label="Description" />
    </Form>
  </Formik>
);
