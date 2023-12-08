import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TopBar from "../TopBar";
import globalCart from "../../../store/slices/cartSlice";
import theme from "../../../store/slices/themeSlice";
import { useGlobalStore } from "../../../store/store";

describe("TopBar Component Test", () => {
  // Mock the fetchBaseQuery function from RTK Query
  jest.mock("@reduxjs/toolkit/query/react", () => ({
    ...jest.requireActual("@reduxjs/toolkit/query/react"),
    fetchBaseQuery: jest.fn(),
  }));

  const mockStore = configureStore();
  const { setMode } = useGlobalStore();
  let store;

  beforeEach(() => {
    store = mockStore({
      globalCart,
      theme,
    });
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  test("renders redux store provider correctly", () => {
    render(
      <Provider store={store}>
        <TopBar
          isSidebarOpen={false}
          setIsSideBarOpen={() => {}}
          isCartShow={false}
        />
      </Provider>
    );

    expect(screen.getByTestId("menu-icon-button")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  test("toggles the sidebar when button clicked", () => {
    const setIsSideBarOpen = jest.fn();
    render(
      <Provider store={store}>
        <TopBar
          isSidebarOpen={false}
          setIsSideBarOpen={setIsSideBarOpen}
          isCartShow={false}
        />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("menu-icon-button"));
    expect(setIsSideBarOpen).toHaveBeenCalledTimes(1);
  });

  test("Search input working!", () => {
    render(
      <Provider store={store}>
        <TopBar
          isSidebarOpen={false}
          setIsSideBarOpen={() => {}}
          isCartShow={false}
        />
      </Provider>
    );
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput.value).toBe("test");
  });

  // test("changes theme mode on theme button click", () => {
  //   render(
  //     <Provider store={store}>
  //       <TopBar
  //         isSidebarOpen={false}
  //         setIsSideBarOpen={() => {}}
  //         isCartShow={false}
  //       />
  //     </Provider>
  //   );
  //   const globalStore = useGlobalStore(); // Assuming useGlobalStore() returns an object
  //   const setModeSpy = jest.spyOn(globalStore, "setMode");

  //   fireEvent.click(screen.getByTestId("menu-theme-button"));
  //   expect(setModeSpy).toHaveBeenCalled();
  // });

  // test("opens cart on cart button click", () => {
  //   const setIsCartOpen = jest.fn();
  //   render(
  //     <Provider store={store}>
  //       <TopBar isSidebarOpen={false} setIsSideBarOpen={() => {}} isCartShow />
  //     </Provider>
  //   );

  //   fireEvent.click(screen.getByTestId("menu-cart-button"));
  //   expect(setIsCartOpen).toHaveBeenCalledTimes(1);
  // });
});
