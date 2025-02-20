import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'

import BookingDate from './BookingDate'
import sessionStorage from '../../constants/globalSessionMock'

Enzyme.configure({ adapter: new Adapter() })

const timeFixture = [
  {
    employee: { id: 0 },
    skills: { skillId: 0 },
    availability: "2020-09-16",
    capacity: 10,
    length: 1,
    startingHour: 5,
    remaining: 5
  }
]

const mockSessionStorage = {
  type: "Employee",
  id: 0,
  token: "Bearer abc123"
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
)

sessionStorage.data = mockSessionStorage
global.sessionStorage = sessionStorage

describe('BookingDate', () => {
  
  it('fetches the dates list and stores it within state', done => {
    const mockJsonPromise = Promise.resolve(timeFixture)
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    })
    
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    
    const wrapper = shallow(<BookingDate data={{id: 0}} />) 
    wrapper.find(".booking-date-picker").simulate('change', { currentTarget: { value: "2020-09-16" } })
                          
    process.nextTick(() => {
      expect(wrapper.state().timeSlots.length).toEqual(1)

      global.fetch.mockClear()
      done()
    })
  })

})