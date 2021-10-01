import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import TagInput, { TagInputProps } from '../app/components/TagInput';
import { Tag } from 'react-tag-input'

export default {
  title: 'Example/TagInput',
  component: TagInput
} as Meta;

const Template: Story<TagInputProps> = (args) =>
  <div>
    <TagInput {...args} />
  </div>

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Insira as tags deste post',
  tags: [ { id: '1', text: 'Javascript'} ]
}

export const VariousTags = Template.bind({})
VariousTags.args = {
  placeholder: 'Insira as tags deste post',
  tags: [ 
    { id: '1', text: 'Javascript'} ,
    { id: '2', text: 'Ruby on Rails'} ,
    { id: '4', text: 'JPythopn'} ,
    { id: '5', text: 'C++'} ,
    { id: '6', text: 'Javascript'} ,
    { id: '7', text: 'Javascript'} 
  ]
}

export function WorkingLiveExample () {

  const [tags, setTags] = useState<Tag[]>([])

  return <TagInput 
    placeholder="Insira as tags deste post"
    tags={tags}
    onAdd={tag => setTags([...tags, tag])}
    onDelete={index => setTags(tags.filter((tag, i) => i !== index))}
  />
}