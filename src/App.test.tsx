import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // You might need to adjust this expectation based on what's actually in App
    // For now, just checking if it renders (container exists) or search for a known text
    // Example: verify header exists
    // expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
