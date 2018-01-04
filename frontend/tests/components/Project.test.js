import React from 'react';
import { mount } from 'enzyme';

import Project from '../../src/components/Project';


describe('Components/Project', () => {
	const project = {
		id: 1,
		name: 'Title',
		slug: 'title',
		color: 1
	}
	const deleteProject = jest.fn();
	let wrapper;
	beforeEach(() => {	
		wrapper = mount(
			<Project
				project={project}
				deleteProject={deleteProject} />
		);
	});

	it('Render component', () => {
		expect(wrapper.find('button').length).toEqual(1);
	});

	it('Emit handleDeleteClick event (delete task)', () => {
		wrapper.find('.btn-delete').simulate('click');
		expect(deleteProject).toHaveBeenCalled();
	});
});