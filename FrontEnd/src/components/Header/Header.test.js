import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from './Header'
import sessionStorage from '../../constants/globalSessionMock'
import config from '../../config'

Enzyme.configure({ adapter: new Adapter() })

global.fetch = jest.fn(() =>
    Promise.resolve({
    json: () => Promise.resolve(),
  })
)

const mockSessionStorage = {
  type: "Default",
  id: 0,
  token: "Default",
  login: 0,
  name: "Default"
}

sessionStorage.data = mockSessionStorage
global.sessionStorage = sessionStorage

const setup = () => {
  const login = {
    type: "Customer",
    token: "Bearer abc123",
  }
  
  const customers = [{
    id: 3,
    fname: "Dylan",
    lname: 'Dimkovski',
    userName: 'ddimkovs',
    password: 'Apassword',
  }]

  
  const mockCustomerPromise = Promise.resolve(customers)
  const mockLoginPromise = Promise.resolve(login)

  const mockCustomerFetch = Promise.resolve({ json: () => mockCustomerPromise })
  const mockLoginFetch = Promise.resolve({ json: () => mockLoginPromise })

  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    return url === config.base + "customer/login" ?
      mockLoginFetch :
      mockCustomerFetch
      
  })

}

describe('<Header />', () => {
  
  it('Checks that login with a valid username and password set the sessionStorage correctly', done => {
    
    setup()

    const wrapper = shallow(<Header.WrappedComponent />)
    
    process.nextTick(() => {

      wrapper.setState({
        username: "ddimkovs",
        password: "123"
      })

      wrapper.setProps({ history: { push: () => {} } })
      wrapper.find(".header-login").simulate("click")
      
      expect(wrapper.state().login).toBe(1)
      global.fetch.mockClear()
      done()
    })
  })

  it('Checks that login with a invalid does not login', done => {
    
    setup()

    const wrapper = shallow(<Header.WrappedComponent />)
    
    wrapper.setProps({ history: { push: () => {} } })
    wrapper.find(".header-login").simulate("click")
    wrapper.setState({
      username: "",
      password: ""
    })
    
    process.nextTick(() => {
      expect(wrapper.find(".header-login-input").length).toBe(2)
      global.fetch.mockClear()
      done()
    })
  })

  it('Displays the users name when logged in correctly', done => {
    
    setup()

    const wrapper = shallow(<Header.WrappedComponent />)
    sessionStorage.data.name = "dylan"
    sessionStorage.data.login = 1
  
    wrapper.setProps({ history: { push: () => {} } })
    wrapper.setState({ login: "1" })
    
    process.nextTick(() => {
      expect(wrapper.contains(
        <p className="ff-white">Welcome, dylan</p>
      )).toBe(true)

      global.fetch.mockClear()
      done()
    })
  })

})
