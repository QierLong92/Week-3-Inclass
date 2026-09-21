import { useState } from 'react';
import { View } from 'react-native';
import { SelectField, SubmitButton, TextField } from './forms';
import { spacing } from '../tokens';

const meta = { title: 'Forms/Controls', component: TextField, tags: ['autodocs'], argTypes: { colorStyle: { control: 'object' } } };
export default meta;
export const TextInput = { args: { label: 'Project name', placeholder: 'e.g., Study planner', value: '', onChangeText: () => {} } };
export const ValidationError = { args: { label: 'Email', value: 'not-an-email', onChangeText: () => {}, error: 'Enter a valid email address.' } };
export const CustomPalette = { args: { label: 'Project name', value: 'Field Notes', onChangeText: () => {}, colorStyle: { background: '#FFF7DB', text: '#3A2D00', mutedText: '#756111', border: '#D6B744', danger: '#AA153B' } } };
export const Dropdown = { render: function DropdownStory() { const [value, setValue] = useState(); return <SelectField label="Priority" value={value} onChange={setValue} options={[{ label: 'Low', value: 'low' }, { label: 'Medium', value: 'medium' }, { label: 'High', value: 'high' }]} />; } };
export const Buttons = { render: () => <View style={{ gap: spacing.sm }}><SubmitButton label="Save changes" onPress={() => {}} /><SubmitButton label="Cancel" variant="secondary" onPress={() => {}} /><SubmitButton label="Saving…" disabled onPress={() => {}} /></View> };
