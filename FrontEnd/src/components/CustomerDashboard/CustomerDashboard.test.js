import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerDashboard from './CustomerDashboard';

Enzyme.configure({ adapter: new Adapter() })

const customers =
    {
        fname: "Dylan",
        lname: 'Dimkovski',
        userName: 'ddimkovs',
        password: 'Apassword',
        records: [
            {
            employee: { id: 1 },
            skills: { skills_id: 2 },
            availability: true,
            capacity: 10,
            length: 1,
            startingHour: 12,
            remaining: Math.floor(1 + (Math.random() * 10))
        }]
    }
    const heading1 = "First Name";
    const heading2 = "Last Name";
    const heading3 = "UserName";
    const heading4 = "Password";
    const heading5 = "Address";
    const heading6 = "Phone Number";

    const bookingHeading1 = "Date";
    const bookingHeading2 = "Time";
    const bookingHeading3 = "ID";
    const bookingHeading4 = "Employee";
    const bookingHeading5 = "Skill";

global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(),
        })
      );

describe('<CustomerDashboard />', () => {
    it('Checks that server Returns Customer Data', done => {
        const mockPromise = Promise.resolve(customers);
        const mockFetch = Promise.resolve({
            json: () => mockPromise,
          });
          jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);

          const wrapper = shallow(<CustomerDashboard />);

          process.nextTick(() => {
              expect(wrapper.state().fname).toEqual(customers.fname);
              expect(wrapper.state().lname).toEqual(customers.lname);
              expect(wrapper.state().userName).toEqual(customers.userName);

              global.fetch.mockClear();
              done();
          })
    });
  
    it('Checks that server returns booking data', () => {
        const mockPromise = Promise.resolve(customers);
        const mockFetch = Promise.resolve({
            json: () => mockPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);

        const wrapper = shallow(<CustomerDashboard />);

        process.nextTick(() =>{
            expect(wrapper.state().records.length).toEqual(1);
        }
    )      
    });

    it('Check if Customer Details Headings Loaded in Correctly', () =>{
        const mockPromise = Promise.resolve(customers);
      const mockFetch = Promise.resolve({
          json: () => mockPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);

      const wrapper = shallow(<CustomerDashboard />);

      process.nextTick(() =>{
        expect(wrapper.contains(heading1)).toEqual(true)
        expect(wrapper.contains(heading2)).toEqual(true)
        expect(wrapper.contains(heading3)).toEqual(true)
        expect(wrapper.contains(heading4)).toEqual(true)
        expect(wrapper.contains(heading5)).toEqual(true)
        expect(wrapper.contains(heading6)).toEqual(true)
      }
      )  
    })

    it('Check if Booking Details Loaded in Correctly', () =>{
        const mockPromise = Promise.resolve(customers);
      const mockFetch = Promise.resolve({
          json: () => mockPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);

      const wrapper = shallow(<CustomerDashboard />);

      process.nextTick(() =>{
        expect(wrapper.contains(bookingHeading1)).toEqual(true)
        expect(wrapper.contains(bookingHeading2)).toEqual(true)
        expect(wrapper.contains(bookingHeading3)).toEqual(true)
        expect(wrapper.contains(bookingHeading4)).toEqual(true)
        expect(wrapper.contains(bookingHeading5)).toEqual(true)
      }
      )  
    })
  });