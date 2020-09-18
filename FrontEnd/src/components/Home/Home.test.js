import React, { Component } from 'react'
import { shallow } from "enzyme";
import Home from './Home';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BookingBar from '../BookingBar/BookingBar';
import Enzyme from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter });

it ('should display the header in home page', () => {
    const wrapper = shallow(<Home/>);
    const header = wrapper.find(Header)

    expect(header.exists()).toBe(true);
});

it ('should display the footer in home page', () => {
    const wrapper = shallow(<Home/>);
    const footer = wrapper.find(Footer)

    expect(footer.exists()).toBe(true);
});

it ('should display the bookingbar in home page', () => {
    const wrapper = shallow(<Home/>);
    const bookingbar = wrapper.find(BookingBar)

    expect(bookingbar.exists()).toBe(true);
});

it ('should display map', () => {
    const wrapper = shallow(<Home/>);
    const map = wrapper.find('img')

    expect(map.exists()).toBe(true);
});