import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test/renderWithProviders";
import App from "./App";

test("renders app", () => {
  renderWithProviders(<App />);
  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
});
