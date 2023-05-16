import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

const mockMatchMedia = () =>
  jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });

describe("SearchBar", () => {
  test("renders correctly", () => {
    window.matchMedia = mockMatchMedia();

    const onSearch = jest.fn();
    const value = "";

    render(<SearchBar onSearch={onSearch} value={value} />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-submit")).toBeInTheDocument();
  });
});
