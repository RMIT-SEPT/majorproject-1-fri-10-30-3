import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import EditPage from './EditPage'

Enzyme.configure({ adapter: new Adapter() })

global.fetch = jest.fn(() =>
    Promise.resolve({
    json: () => Promise.resolve(),
  })
)

const params = {
  params: {
    id: 3,
    object: 'customer'
  }
}

describe('<EditPage />', () => {
  
  it('Checks that the correct url and params are passed to the fetch delete request', done => {
    
    const mockCustomerPromise = Promise.resolve(customers)

    const mockCustomerFetch = Promise.resolve({ json: () => mockCustomerPromise })

    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      return url === `${config.base}customer/3` ? 
        mockCustomerFetch :
        mockBookingFetch
    })

    const wrapper = shallow(<CustomerDashboard />)

    process.nextTick(() => {
      const expectUrl = "http://54.210.18.102:8080/api/customer/delete/3" 
      const expectMethod = { method: 'DELETE' }
    
      expect(url).toBe(expectUrl)
      expect(options).toEqual(expectMethod)

      global.fetch.mockClear()
      done()
    })
  })

})
