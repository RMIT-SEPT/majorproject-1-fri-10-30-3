import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import sessionStorage from '../../constants/globalSessionMock'


import AdminDashboard from './AdminDashboard'

Enzyme.configure({ adapter: new Adapter() })

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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
)

const mockSessionStorage = {
    type: "Admin",
    id: 3,
    token: "Bearer abc123"
  }
  
  sessionStorage.data = mockSessionStorage
  global.sessionStorage = sessionStorage

describe('AdminDashboard', () => {
    it('Checks if the table renders correctly', done => {
        const mockJsonPromise = Promise.resolve(skillFixture)
        const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    })

    const wrapper = shallow(<AdminDashboard />) 

    process.nextTick(() => {
        const props = wrapper.state().imageSrc

        process.nextTick(() => {
          expect(props).toEqual(skillFixture.imageSrc)          

          global.fetch.mockClear()
          done()
        })
      })

    })
})

