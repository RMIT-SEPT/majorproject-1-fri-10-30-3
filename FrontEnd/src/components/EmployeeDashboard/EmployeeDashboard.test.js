import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import sessionStorage from '../../constants/globalSessionMock'


import EmployeeDashboard from './EmployeeDashboard'
import config from '../../config'

Enzyme.configure({ adapter: new Adapter() })

const date = new Date()
const day = date.getDate();
const month = date.getMonth() + 1;

const scheduleFixture = [{
    schedule_id: 1,
    employee: {id: 4} ,
    skills: {skillId: 1},
    capacity: 10,
    price: 0,
    avaliability: `2020-${month}-${day}`,
    starting_hour: 10,
    length: 1,
    created_at: `2020-${month}-${day}`,
    updated_at: 0
  }]

const skillFixture = [{
    cost: 0,
    created_At: "0",
    description: "Fancy Pants",
    imageSrc: "Some file",
    length: 1,
    skillId: 2,
    skills_name: null,
    title: "yoo",
    updated_At: null
  }]

const mockSessionStorage = {
    type: "Employee",
    id: 3,
    token: "Bearer abc123"
  }

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
)
  
  sessionStorage.data = mockSessionStorage
  global.sessionStorage = sessionStorage

  const setup = () => {  
    const mockCustomerPromise = Promise.resolve(skillFixture)
    const mockLoginPromise = Promise.resolve(scheduleFixture)
  
    const mockCustomerFetch = Promise.resolve({ json: () => mockCustomerPromise })
    const mockLoginFetch = Promise.resolve({ json: () => mockLoginPromise })
  
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      return url === config.base + "schedule" ?
        mockLoginFetch :
        mockCustomerFetch
    })
  
    }

  describe('EmployeeDashboard', () => {
    it('Checks if the table renders correctly', done => {
        setup()
        const wrapper = shallow(<EmployeeDashboard />) 

        process.nextTick(() => {
        const props = wrapper.state().schedule.id

        process.nextTick(() => {
            expect(props).toEqual(scheduleFixture.schedule_id)          

            global.fetch.mockClear()
            done()
        })
      })

    })
})