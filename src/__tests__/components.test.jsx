import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { List, SelectField, SubmitButton, TextField } from '../index.js';

describe('public components', () => {
  it('calls a submit button callback', () => {
    const onPress = vi.fn();
    render(<SubmitButton label="Save changes" onPress={onPress} />);
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('does not call a disabled submit button callback', () => {
    const onPress = vi.fn();
    render(<SubmitButton label="Saving" disabled onPress={onPress} />);
    fireEvent.click(screen.getByRole('button', { name: 'Saving' }));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('reports a text field error', () => {
    render(<TextField label="Email" error="Enter a valid email address." value="bad" onChangeText={() => {}} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email address.');
  });

  it('reports checklist item selection', () => {
    const onToggleItem = vi.fn();
    render(<List variant="checklist" items={[{ id: 'one', label: 'Write a story' }]} onToggleItem={onToggleItem} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggleItem).toHaveBeenCalledWith({ id: 'one', label: 'Write a story' });
  });

  it('selects a dropdown option', () => {
    const onChange = vi.fn();
    render(<SelectField label="Priority" onChange={onChange} options={[{ label: 'High', value: 'high' }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Select an option' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'High' }));
    expect(onChange).toHaveBeenCalledWith('high');
  });
});
