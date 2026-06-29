import type { Meta } from '@storybook/react';
import { default as InputFormik } from './InputFormik';
import { Form, Formik } from 'formik';

const Story: Meta<typeof InputFormik> = {
  component: InputFormik,
  title: 'InputFormik',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Formik initialValues={{ name: '' }} onSubmit={() => undefined}>
        <Form>
          <Story />
        </Form>
      </Formik>
    ),
  ],
  argTypes: {
    label: {
      description: 'Label for the input field',
    },
    name: {
      description: 'The name attribute for the input field',
    },
    className: {
      description: 'Custom CSS class name for styling the input',
    },
    prefix: {
      description: 'Prefix content for the input field (e.g., currency symbol)',
    },
    suffix: {
      description:
        'Suffix content for the input field (e.g., unit of measurement)',
    },
    children: {
      description: 'Additional content to include within the input field',
    },
  },
};
export default Story;

export const Primary = {
  args: {
    label: 'name',
    name: 'name',
    className: 'custom-classname',
    prefix: '',
    suffix: '',
    children: null,
  },
};
