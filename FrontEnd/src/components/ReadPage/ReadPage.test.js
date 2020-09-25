import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReadPage from './ReadPage'

Enzyme.configure({ adapter: new Adapter() })

const customers = {
  id: '3',
  fname: "arone",
  lname: 'susau',
  userName: 'arone123',
  password: '123',
}

const params = {
  params: { 
    id: 3,
    object: 'customer'
  }
}

const stateFixture = {
  title: 'Customer',
  key: 'customer',
  object: 'customer',
  id: 3,
}

global.fetch = jest.fn(() =>
    Promise.resolve({
    json: () => Promise.resolve(),
  })
)

const setup = (data) => {
  const mockPromise = Promise.resolve(data)
  const mockFetch = Promise.resolve({ json: () => mockPromise })

  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return mockFetch
  })
}

describe('<ReadPage />', () => {
  
  it('Checks that the customer table and state is displayed correctly', done => {
    
    setup(customers)
    const wrapper = shallow(<ReadPage match={params} />)

    process.nextTick(() => {
      const keys = ['title', 'key', 'object', 'id']
      const state = wrapper.state()
      
      keys.forEach(k => {
        expect(state[k]).toBe(stateFixture[k])
      })

      wrapper.find(".read-page-data").forEach((td, index) => {
        const field = wrapper.find(".read-page-field").at(index).text()
        expect(td.text()).toBe(customers[field])
      })

      global.fetch.mockClear()
      done()
    })
  })

  it('Checks that an error is displayed when the object param does not exist', done => {
    
    setup(customers)
    const wrapper = shallow(<ReadPage match={{ params: { id: 0, object: 'racoon' } }} />)
    const expected = "Object Type 'racoon' Does Not Exist"

    process.nextTick(() => {
      
      wrapper.find(".read-page-data").forEach(td => {
        expect(td.text()).toBe(expected)
      })

      global.fetch.mockClear()
      done()
    })
  })

  it('Checks that an error is displayed when an error is returned from the server', done => {
  
    const mockFetchPromise = Promise.resolve({
      json: () => { throw 500 },
    })

    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return mockFetchPromise
    })

    const wrapper = shallow(<ReadPage match={{ params: { id: 0, object: 'customer' } }} />)
    const expected = "Hmm.. Looks like something went wrong there, please try again later"

    process.nextTick(() => {
      
      wrapper.find(".read-page-data").forEach(td => {
        expect(td.text()).toBe(expected)
      })

      global.fetch.mockClear()
      done()
    })
  })

})
