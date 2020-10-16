import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DeletePage from './DeletePage'
import sessionStorage from '../../constants/globalSessionMock'

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

const mockSessionStorage = {
  type: "Customer",
  id: 3,
  token: "Bearer abc123"
}

sessionStorage.data = mockSessionStorage
global.sessionStorage = sessionStorage

describe('<DeletePage />', () => {
  
  it('Checks that the correct url and params are passed to the fetch delete request', done => {
    
    const mockPromise = Promise.resolve({})
    const mockFetch = Promise.resolve({ json: () => mockPromise })

    jest.spyOn(global, 'fetch').mockImplementation((url, options) => {
      execute(url, options)
      return mockFetch
    })
  
    const wrapper = shallow(<DeletePage match={params} />)
    wrapper.find('.delete-page-confirm').simulate('click')

    function execute(url, options) {
      process.nextTick(() => {
        const expectUrl = "http://34.238.242.177:8080/api/customer/delete/3" 
        const expectMethod = { method: 'DELETE', headers: {Authorization: "Bearer abc123"} }
      
        expect(url).toBe(expectUrl)
        expect(options).toEqual(expectMethod)

        global.fetch.mockClear()
        done()
      })
    }
  })

})
