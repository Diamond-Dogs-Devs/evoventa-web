import type { Meta } from '@storybook/react';
import { default as StepCount } from './stepCount';
import { Form, Formik } from 'formik';

const Story: Meta<typeof StepCount> = {
  component: StepCount,
  title: 'StepCount',
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label for the step count input.',
    },
    name: {
      description: 'The name of the input field.',
    },
    className: {
      description: 'Custom class name for styling purposes.',
    },
    prefix: {
      description: 'A prefix to display before the input field.',
    },
    suffix: {
      description: 'A suffix to display after the input field.',
    },
    children: {
      description: 'Additional child elements to include.',
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
    label: 'Number',
    name: 'number',
    className: 'custom-classname',
    prefix: '',
    suffix: 'UF',
    children: null,
  },
};
