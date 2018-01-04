import React from 'react';
import { shallow } from 'enzyme';

import Loader from '../../src/components/Loader';


describe('Components/Loader', () => {
	it('Render component', () => {
		const wrapper = shallow(<Loader />);
		expect(wrapper.find('.loader').length).toEqual(1);
	});
});