import React from 'react';
import { shallow } from 'enzyme';

import DatePicker from '../../src/components/DatePicker';


describe('Components/DatePicker', () => {
	const dateChange = jest.fn();
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<DatePicker dateChange={dateChange} value="27.30.2017" />);
	});

	it('Render component', () => {
		expect(wrapper.find('input[type="text"]').length).toEqual(1);
	});

	it('Emit dateChange event (set real date)', () => {
		wrapper.find('input[type="text"]').prop('onChange')({
			target: { value: '30.12.2017' }
		});
		expect(dateChange).toHaveBeenCalled();
	});

	it('Emit dateChange event (set empty date)', () => {
		wrapper.find('input[type="text"]').prop('onChange')({
			target: { value: '' }
		});
		expect(dateChange).toHaveBeenCalled();
	});
});