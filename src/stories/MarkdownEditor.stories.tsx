import { Story, Meta } from '@storybook/react';
import MarkdownEditor, { MarkdownEditorProps } from '../app/components/MarkdownEditor';

export default {
  title: 'Example/MarkdownEditor',
  component: MarkdownEditor,
  argTypes: {
    onLogout: {
      action: 'logout'
    }
  }
} as Meta;

const Template: Story<MarkdownEditorProps> = (args) =>
  <div>
    <MarkdownEditor {...args} />
  </div>

export const Default = Template.bind({})
Default.args = {}