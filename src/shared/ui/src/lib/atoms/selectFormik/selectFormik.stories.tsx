import type { Meta } from '@storybook/react';
import { default as SelectFormik } from './SelectFormik';
import { Form, Formik } from 'formik';

const Story: Meta<typeof SelectFormik> = {
  component: SelectFormik,
  title: 'SelectFormik',
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label for the SelectFormik.',
    },
    name: {
      description: 'The name attribute for the SelectFormik input field.',
    },
    className: {
      description:
        'Additional CSS classes for styling the SelectFormik component.',
    },
    options: {
      description: 'The list of available options for the SelectFormik.',
    },
    onChange: {
      description:
        'A callback function called when the selected value changes.',
    },
    loading: {
      description:
        'A flag to indicate if the SelectFormik is in a loading state.',
    },
  },
  decorators: [
    (Story) => (
      <Formik initialValues={{ name: '' }} onSubmit={() => undefined}>
        <Form>
          <Story />
        </Form>
      </Formik>
    ),
  ],
};

export default Story;

export const Primary = {
  args: {
    label: 'Name',
    name: 'name',
    className: 'custom-classname',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ],
    onChange: (e) => {
      console.log('Selected Value:', e.target.value);
    },
    loading: false,
  },
};
