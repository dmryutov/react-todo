import React from 'react';
import { mount } from 'enzyme';

import AddTask from '../../src/components/AddTask';


describe('Components/AddTask', () => {
	const addTask = jest.fn();
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<AddTask addTask={addTask} />);
	});
	afterEach(() => {
		wrapper.unmount();
	});

	it('Render component', () => {
		expect(wrapper.find('button').length).toEqual(1);
	});

	it('Emit addTask event', () => {
		wrapper.find('button').simulate('click');
		expect(addTask).not.toHaveBeenCalled();

		wrapper.find('#task-title').instance().value = 'Project name';
		wrapper.find('button').simulate('click');
		expect(addTask).toHaveBeenCalled();
	});

	it('Emit input onKeyUp event (press enter on text input)', () => {
		wrapper.find('#task-title').instance().value = 'Project name';
		wrapper.find('#task-title').simulate('keyUp', {keyCode: 42});
		wrapper.find('#task-title').simulate('keyUp', {keyCode: 13});
		expect(addTask).toHaveBeenCalled();
	});
});