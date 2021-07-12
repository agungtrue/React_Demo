import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from "enzyme";
import App from './App';
import Table from './components/Table';
import Modal from './components/Modal';
import { getData } from './API/Request'


test("renders without crashing", () => {
    const component = renderer.create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
});

test("renders table component without crashing", () => {
    const component = renderer.create(<Table />);
    expect(component.toJSON()).toMatchSnapshot();
});

test("renders Modal component without crashing", () => {
    const component = renderer.create(<Modal />);
    expect(component.toJSON()).toMatchSnapshot();
});

test("snapshot with all required props in Table Component", () => {

  // with this test, i saw new error: Each child in a list should have a unique "key" prop.
  // and also i fixed alreaday after saw that error console test
  let sample = [{
      user_id: "f97cb2a2",
      user_name: "John Doe",
      email: "john@doe-club.org",
      score: 12,
      registered: "2021-06-23T06:32:23+00:00"
  }]

  const component = renderer.create(<Table
      dataSource={sample}
  />);
  expect(component.toJSON()).toMatchSnapshot();

});