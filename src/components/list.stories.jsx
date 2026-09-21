import { useState } from 'react';
import { List } from './list';

const initialItems = [{ id: 'research', label: 'Research the audience' }, { id: 'sketch', label: 'Sketch the interaction' }, { id: 'test', label: 'Test with a peer' }];
const meta = { title: 'Content/List', component: List, tags: ['autodocs'], args: { items: initialItems }, argTypes: { variant: { control: 'radio', options: ['numbered', 'bulleted', 'checklist', 'draggable'] }, colorStyle: { control: 'object' } } };

export default meta;
export const Bulleted = { args: { variant: 'bulleted' } };
export const Numbered = { args: { variant: 'numbered' } };
export const CustomPalette = { args: { colorStyle: { text: '#42145F', primary: '#8136A8', border: '#DCC3E8', checked: '#17724D' } } };
export const ControlledChecklist = { render: function ChecklistStory(args) { const [checkedIds, setCheckedIds] = useState(['research']); return <List {...args} variant="checklist" checkedIds={checkedIds} onToggleItem={(item) => setCheckedIds((ids) => ids.includes(item.id) ? ids.filter((id) => id !== item.id) : [...ids, item.id])} />; } };
export const Reorderable = { render: function ReorderStory(args) { const [items, setItems] = useState(initialItems); return <List {...args} items={items} variant="draggable" onMoveItem={(_, from, to) => setItems((current) => { const next = [...current]; next.splice(to, 0, next.splice(from, 1)[0]); return next; })} />; }, parameters: { docs: { description: { story: 'Drag the ⠿ grip beside an item and release it over another row. The arrows remain available as an accessible alternative.' } } } };
