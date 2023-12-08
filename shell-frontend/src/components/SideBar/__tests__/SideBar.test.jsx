import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SideBar from "../SideBar";
import { HomeMiniOutlined as HomeIcon } from "@mui/icons-material";

// Mock the react-router-dom module
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ pathname: "/mock-path" }), // Mock the useLocation hook
  useNavigate: jest.fn(), // Mock useNavigate hook
}));

describe("SideBar Component Tests", () => {
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

  test("renders SideBar component correctly", () => {
    const navItems = [
      { text: "Home", icon: <HomeIcon />, path: "/home" },
      { text: "Profile", icon: <HomeIcon />, path: "/profile" },
    ];

    render(
      <Provider store={store}>
        <SideBar
          isSidebarOpen={true}
          drawerWidth={240}
          setIsSideBarOpen={() => {}}
          isMobile={false}
          navItems={navItems}
        />
      </Provider>
    );

    // Add your assertions based on the rendered content
    expect(screen.getByText("FOS")).toBeInTheDocument();
    expect(screen.getByText("Food at your fingertips")).toBeInTheDocument();
    // Add more assertions as needed
  });

  //   test("handles navigation when a list item is clicked", () => {
  //     const navItems = [
  //       { text: "Home", icon: <HomeIcon />, path: "/home" },
  //       { text: "Profile", icon: <HomeIcon />, path: "/profile" },
  //     ];

  //     const navigateMock = jest.fn();

  //     render(
  //       <Provider store={store}>
  //         <SideBar
  //           isSidebarOpen={true}
  //           drawerWidth={240}
  //           setIsSideBarOpen={() => {}}
  //           isMobile={false}
  //           navItems={navItems}
  //         />
  //       </Provider>
  //     );

  //     fireEvent.click(screen.getByText("Home"));

  //     // Check if navigate function is called with the correct path
  //     expect(navigateMock).toHaveBeenCalledWith("/home");
  //   });
});
