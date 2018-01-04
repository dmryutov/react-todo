import React from 'react';
import { mount } from 'enzyme';

import AddProject from '../../src/components/AddProject';


describe('Components/AddProject', () => {
	const addProject = jest.fn();
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<AddProject addProject={addProject} />);
	});

	it('Render component', () => {
		expect(wrapper.find('button').length).toEqual(1);
	});

	it('Emit addProject event', () => {
		wrapper.find('button').simulate('click');
		expect(addProject).not.toHaveBeenCalled();

		wrapper.find('input[type="text"]').instance().value = 'Project name';
		wrapper.find('button').simulate('click');
		expect(addProject).toHaveBeenCalled();
	});

	it('Emit input onKeyUp event (press enter on text input)', () => {
		wrapper.find('input[type="text"]').instance().value = 'Project name';
		wrapper.find('input[type="text"]').simulate('keyUp', {keyCode: 42});
		wrapper.find('input[type="text"]').simulate('keyUp', {keyCode: 13});
		expect(addProject).toHaveBeenCalled();
	});
});