import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import EditPage from './EditPage'
import sessionStorage from '../../constants/globalSessionMock'
import config from '../../config'

Enzyme.configure({ adapter: new Adapter() })

global.fetch = jest.fn(() =>
    Promise.resolve({
    json: () => Promise.resolve(),
  })
)

const employee = {
  id: 4,
  fname: "Dylan",
  lname: 'Dimkovski',
  userName: 'ddimkovs',
  password: 'Apassword',
}

const mockSessionStorage = {
  type: "Default",
  id: 0,
  token: "Default",
  login: 0,
  name: "Default"
}

const params = {
  params: {
    id: 4,
    object: 'employee'
  }
}

sessionStorage.data = mockSessionStorage
global.sessionStorage = sessionStorage

const setup = (data) => {
  
  const mockPromise = Promise.resolve(data)
  const mockFetch = Promise.resolve({ json: () => mockPromise })

  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    return mockFetch
  })

}

describe('<Header />', () => {
  
  it ("should render the correct number of inputs for given data type", () => {
    setup(employee)
    
    const wrapper = shallow(<EditPage.WrappedComponent match={params}/>)

    process.nextTick(() => {
      expect(wrapper.find("input").length).toBe(4)
      expect(wrapper.find("input").at(0).type()).toBe("input")
    })
  })

  it ("should render the ID error when given an invalid id", () => {
    setup(false)
    
    const wrapper = shallow(<EditPage.WrappedComponent match={params}/>)
    process.nextTick(() => {
      expect(wrapper.contains(<p key="1">Invalid ID Provided.</p>)).toBe(true)
    })
  })

})
