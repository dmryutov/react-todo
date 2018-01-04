import React from 'react';
import { mount } from 'enzyme';

import ColorPicker from '../../src/components/ColorPicker';


describe('Components/ColorPicker', () => {
	const colorChange = jest.fn();
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ColorPicker colorChange={colorChange} />);
	});

	it('Render component', () => {
		expect(wrapper.find('.colorPicker').length).toEqual(1);
	});

	it('Emit handleClick and handleClose event (open and close picker)', () => {
		wrapper.find('.openPicker').simulate('click');
		expect(wrapper.instance().state.displayColorPicker).toEqual(true);

		wrapper.find('.closePicker').simulate('click');
		expect(wrapper.instance().state.displayColorPicker).toEqual(false);
	});
});