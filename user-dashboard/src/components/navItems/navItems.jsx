import {
  AccountCircleOutlined,
  HomeOutlined,
  LocalMallOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

const userNavItems = [
  {
    text: "Dashboard",
    path: "/home",
    icon: <HomeOutlined />,
  },
  {
    text: "Products",
    icon: null,
  },
  {
    text: "Explore Products",
    path: "/home/products",
    icon: <ShoppingBagOutlined />,
  },
  {
    text: "Orders",
    icon: null,
  },
  {
    text: "My Orders",
    path: "/home/orders",
    icon: <LocalMallOutlined />,
  },
  {
    text: "Profile",
    icon: null,
  },
  {
    text: "My Profile",
    path: "/home/profile",
    icon: <AccountCircleOutlined />,
  },
];

const GuestNavItems = [
  {
    text: "Dashboard",
    path: "/home",
    icon: <HomeOutlined />,
  },
  {
    text: "Products",
    icon: null,
  },
  {
    text: "Explore Products",
    path: "/home/products",
    icon: <ShoppingBagOutlined />,
  },
  {
    text: "Orders",
    icon: null,
  },
  {
    text: "My Orders",
    path: "/auth/signup",
    icon: <LocalMallOutlined />,
  },
];

export { GuestNavItems, userNavItems };
