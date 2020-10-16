import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CustomerDashboard from './CustomerDashboard'
import config from '../../config'
import sessionStorage from '../../constants/globalSessionMock'

Enzyme.configure({ adapter: new Adapter() })
const booking = [{
  enrollmentId: 1,
  customer: {
    id: 3,
    fname: "Dylan",
    lname: 'Dimkovski',
    userName: 'ddimkovs',
    password: 'Apassword',
  },
  employeeSchedule: {
    employee: {
      id: 4,
      fname: "Dylan",
      lname: 'Dimkovski',
      userName: 'ddimkovs',
      password: 'Apassword',
    },
    skills: {
      title: "test"
    },
    scheduleId: 2,
    availability: "2020-09-20",
    startingHour: "14",
  }
}]

const customers = {
  id: 3,
  fname: "Dylan",
  lname: 'Dimkovski',
  userName: 'ddimkovs',
  password: 'Apassword',
  records: booking
}

const headings = [ "First Name", "Last Name", "UserName", "ID", "Address", "Phone Number" ]
const bookingHeadings = [ "Date", "Time", "ID", "Employee", "Skill" ]

global.fetch = jest.fn(() =>
    Promise.resolve({
    json: () => Promise.resolve(),
  })
)

const mockSessionStorage = {
  type: "Customer",
  id: 3,
  token: "Bearer abc123"
}

sessionStorage.data = mockSessionStorage
global.sessionStorage = sessionStorage

const setup = () => {
  const mockCustomerPromise = Promise.resolve(customers)
  const mockBookgingPromise = Promise.resolve(booking)

  const mockCustomerFetch = Promise.resolve({ json: () => mockCustomerPromise })
  const mockBookingFetch = Promise.resolve({ json: () => mockBookgingPromise })

  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    return url === `${config.base}customer/3` ? 
      mockCustomerFetch :
      mockBookingFetch
  })
}

describe('<CustomerDashboard />', () => {
  it('Checks that server Returns Customer Data', done => {
    
    setup()
    const wrapper = shallow(<CustomerDashboard />)

    process.nextTick(() => {
      expect(wrapper.state().fname).toEqual(customers.fname)
      expect(wrapper.state().lname).toEqual(customers.lname)
      expect(wrapper.state().userName).toEqual(customers.userName)

      global.fetch.mockClear()
      done()
    })
  })
  
  it('Checks that server returns booking data', done => {
    
    setup()
    const wrapper = shallow(<CustomerDashboard />)

    process.nextTick(() =>{
      expect(wrapper.state().records.length).toEqual(1)
      done()
    })      
  })

  it('Check if Customer Details Headings Loaded in Correctly', done =>{
    
    setup()
    const wrapper = shallow(<CustomerDashboard />)

    process.nextTick(() =>{
      headings.forEach(h => {
        expect(wrapper.contains(h)).toEqual(true)
      })

      done()
    })  
  })

  it('Check if Booking Details Loaded in Correctly', done =>{
    
    setup()
    const wrapper = shallow(<CustomerDashboard />)

    process.nextTick(() =>{
      bookingHeadings.forEach(h => {
        expect(wrapper.contains(h)).toEqual(true)
      })

      done()
    })  
  })
})
