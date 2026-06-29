import type { Meta } from '@storybook/react';
import { DatePickerFormik } from './DatePickerFormik';
import { Form, Formik } from 'formik';

const Story: Meta<typeof DatePickerFormik> = {
  component: DatePickerFormik,
  title: 'DatePickerFormik',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Formik
        initialValues={{ datepicker: new Date() }}
        onSubmit={() => undefined}
      >
        <Form>
          <Story />
        </Form>
      </Formik>
    ),
  ],
  argTypes: {
    name: {
      description: 'The name of the date picker field',
    },
    label: {
      description: 'The label for the date picker field',
    },
    disabled: {
      description: 'Indicates whether the date picker is disabled',
    },
  },
};

export default Story;

export const Primary = {
  args: {
    name: 'datepicker',
    label: 'Date picker',
    placeholder: 'Select date',
    disabled: false,
  },
};
