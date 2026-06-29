import type { Meta } from '@storybook/react';
import { default as InputAmount } from './inputAmount';
import { Form, Formik } from 'formik';

const Story: Meta<typeof InputAmount> = {
  component: InputAmount,
  title: 'InputAmount',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Formik initialValues={{ amount: '' }} onSubmit={() => undefined}>
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
    currency: {
      description: 'Currency symbol or abbreviation (e.g., USD, EUR)',
    },
    className: {
      description: 'Custom CSS class name for styling the input',
    },
  },
};
export default Story;

export const Primary = {
  args: {
    errors: { myinput: 'Sample error' },
    label: 'amount',
    name: 'amount',
    currency: 'UF',
    className: 'custom-classname',
  },
};
