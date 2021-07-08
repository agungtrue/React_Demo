import { render, screen } from '@testing-library/react';
import App from './App';
import Table from './components/Table';

test('renders learn react link', () => {
  render(<App />);

  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});

// test('render table header', () => {
//   render(<Table />);

//   const text = screen.getByText(/User Name/i);
//   expect(text).toBeInTheDocument();
// });
