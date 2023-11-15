import {
  HomeOutlined,
  LocalMallOutlined,
  ManageAccountsOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

export const adminNavItems = [
  {
    text: "Dashboard",
    path: "/admin",
    icon: <HomeOutlined />,
  },
  {
    text: "Products",
    icon: null,
  },
  {
    text: "All Products",
    path: "/admin/products",
    icon: <ShoppingBagOutlined />,
  },
  {
    text: "Orders",
    icon: null,
  },
  {
    text: "All Orders",
    path: "/admin/orders",
    icon: <LocalMallOutlined />,
  },
  {
    text: "Users",
    icon: null,
  },
  {
    text: "Users Management",
    path: "/admin/users",
    icon: <ManageAccountsOutlined />,
  },
];
