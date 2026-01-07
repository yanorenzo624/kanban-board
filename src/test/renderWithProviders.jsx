import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export function renderWithProviders(ui, options = {}) {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>,
    options
  );
}
