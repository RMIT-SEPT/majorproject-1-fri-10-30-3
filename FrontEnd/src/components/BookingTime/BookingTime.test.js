import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'

import BookingTime from './BookingTime'

Enzyme.configure({ adapter: new Adapter() })

describe('BookingTime', () => {
  
  it('updates the className for the element when clicked', done => {
    const wrapper = shallow(<BookingTime />)
    wrapper.setProps({selected: true})
    wrapper.childAt(0).simulate('click', {})

    process.nextTick(() => {
      expect(wrapper.getElement().props.className)
        .toEqual("booking-time-selection booking-selected ")
      done()
    })
  })

})