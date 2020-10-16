import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'

import Service from './Service'

Enzyme.configure({ adapter: new Adapter() })

const skill = [{
    title: "Some Skill",
    description: "a nice meaningful description",
    imageSrc: "Some image",
    length: 1,
    cost: 80
}]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
)

describe('AdminDashboard', () => {
    it('Checks if the table renders correctly', done => {
        const mockJsonPromise = Promise.resolve(skill)
        const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    })

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

    const wrapper = shallow(<Service />) 

    wrapper.setProps(skill[0])

    process.nextTick(() => {
        expect(wrapper.contains(<p>$80</p>)).toEqual(true) 
        expect(wrapper.contains(<p>1 hr</p>)).toEqual(true) 
        expect(wrapper.contains(<p className="ff-off-black service-title">Some Skill</p>)).toEqual(true) 

        global.fetch.mockClear()
        done()
    })
    })
})
