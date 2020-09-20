import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'

import BookingBar from './BookingBar'

Enzyme.configure({ adapter: new Adapter() })

const skillFixture = [
  {
    cost: 0,
    created_At: "0",
    description: "Fancy Pants",
    imageSrc: "Some file",
    length: 1,
    skills_id: 2,
    skills_name: null,
    title: "yoo",
    updated_At: null
  }
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
)

describe('BookingBar', () => {
  
  it('fetches the services list and stores it within state', done => {
    const mockJsonPromise = Promise.resolve(skillFixture)
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    })
    
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    
    const wrapper = shallow(<BookingBar />) 
                          
    process.nextTick(() => {
      const props = wrapper.state().services[0].props

      expect(props.title).toEqual(skillFixture[0].title)
      expect(props.description).toEqual(skillFixture[0].description)
      expect(props.cost).toEqual(skillFixture[0].cost)
      expect(props.length).toEqual(skillFixture[0].length)

      global.fetch.mockClear()
      done()
    })
  })

  it('has a spinner icon while waiting for the services to load', done => {
    const wrapper = shallow(<BookingBar />) 
    expect(wrapper.state().services)
      .toEqual(<p><i className="ff-yellow booking-loading-icon fas fa-spinner fa-pulse" /></p>)
    done()
  })

  it('displays an error message if the services failed to load', done => {
    const mockFetchPromise = Promise.resolve({
      json: () => { throw 500 },
    })
    
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    
    const wrapper = shallow(<BookingBar />) 
                          
    process.nextTick(() => {
      const error = (
        <div className="booking-error-box">
          <p className="booking-sad-face">Oh no.. :(</p>
          <p>It looks like there was an issue getting our services, please try again later.</p>
        </div>
      )
      
      expect(wrapper.state().services)
        .toEqual(error)

      global.fetch.mockClear()
      done()
    })
  })

})