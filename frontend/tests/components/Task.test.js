import React from 'react';
import { mount } from 'enzyme';

import Task from '../../src/components/Task';


describe('Components/Task', () => {
	const task = {
		id: 1,
		title: 'Title',
		human_estimate: '27.10.2017',
		is_done: false,
		is_failed: false
	}
	const updateTask = jest.fn();
	const deleteTask = jest.fn();
	let wrapper;
	beforeEach(() => {	
		wrapper = mount(
			<Task
				task={task}
				updateTask={updateTask}
				deleteTask={deleteTask} />
		);
	});

	it('Render component', () => {
		expect(wrapper.find('.title').length).toEqual(1);
	});

	it('Render component with project', () => {
		const wrapper2 = mount(
			<Task
				task={{...task, project: {color: 1 }}}
				updateTask={updateTask}
				deleteTask={deleteTask} />
		);
		expect(wrapper2.find('.title').length).toEqual(1);
	});

	it('Emit handleToggleDoneChange event (complete task)', () => {
		wrapper.find('.toggle').prop('onChange')({
			target: { value: true }
		});
		expect(updateTask).toHaveBeenCalled();
	});

	it('Emit handleDeleteClick event (delete task)', () => {
		wrapper.find('.btn-delete').simulate('click');
		expect(deleteTask).toHaveBeenCalled();
	});
});