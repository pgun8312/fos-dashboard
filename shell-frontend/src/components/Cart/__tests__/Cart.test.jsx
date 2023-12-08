import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "../Cart";
import { act } from "react-test-renderer";

// Mock the react-router-dom module
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // Mock useNavigate hook
}));

jest.mock("../../assets/carrot.png", () => ({
  __esModule: true,
  default: "./image.png", // Provide a path to a mock image
}));

describe("Cart Component Tests", () => {
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore({
      globalCart: {
        cart: [
          {
            id: 1,
            name: "Carrot",
            description: "Fresh carrot",
            count: 2,
            price: 1.5,
          },
        ],
        isCartOpen: true,
      },
      authUser: {
        authUser: {
          role: "User",
        },
      },
    });
  });

  test("renders Cart component correctly", () => {
    render(
      <Provider store={store}>
        <Cart isMobile={false} />
      </Provider>
    );

    expect(screen.getByText("SHOPPING CART (1)")).toBeInTheDocument();
    expect(screen.getByText("Carrot")).toBeInTheDocument();
    expect(screen.getByText("Fresh carrot")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("$3.00")).toBeInTheDocument(); // 2 * 1.5
    expect(screen.getByAltText("Carrot")).toHaveAttribute("src", "./image.png");
  });

  test("closes the cart when close button is clicked", () => {
    render(
      <Provider store={store}>
        <Cart isMobile={false} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("cart-close-button"));
    expect(store.getActions()).toEqual([
      { type: "globalCart/setIsCartOpen", payload: undefined },
    ]);
  });

  //   test("navigates to checkout on checkout button click", async () => {
  //     const { useNavigate } = require("react-router-dom");
  //     useNavigate.mockReturnValue(jest.fn()); // Mock the navigate function

  //     render(
  //       <Provider store={store}>
  //         <Cart isMobile={false} />
  //       </Provider>
  //     );

  //     await act(async () => {
  //       fireEvent.click(screen.getByText("CHECKOUT"));
  //     });

  //     // Check if navigate function is called
  //     expect(useNavigate).toHaveBeenCalled();

  //     // Wait for the asynchronous navigation to complete
  //     await act(async () => {});

  //     // Check if dispatch is called after navigation
  //     expect(store.getActions()).toEqual([
  //       { type: "globalCart/setIsCartOpen", payload: undefined },
  //     ]);
  //   });
});
