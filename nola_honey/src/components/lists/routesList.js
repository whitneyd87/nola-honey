import AboutView from "../aboutView.js";
import ShopView from "../shopView.js";
import AddToCartView from "../addToCartView.js";
import ItemView from "../itemView.js";
import ContactView from "../contactView.js";
import SignInView from "../signInView.js";
import CreateAccountView from "../createAccountView.js";
import MyCart from "../myCartView.js";
import EditCart from "../editCartView.js";

const routes = [
  {
    path: "/#",
    component: () => (window.location = "http://localhost:3000/#/"),
  },
  {
    path: "/about",
    component: AboutView,
  },
  {
    path: "/shop",
    component: ShopView,
  },
  {
    path: "/shop/mycart",
    component: MyCart,
  },
  {
    path: "/shop/mycart/edit",
    component: EditCart,
  },
  {
    path: "/shop/:id",
    component: ItemView,
  },
  {
    path: "/shop/:id/addtocart",
    component: AddToCartView,
  },
  {
    path: "/contact",
    component: ContactView,
  },
  {
    path: "/createaccount",
    component: CreateAccountView,
  },
  {
    path: "/signin",
    component: SignInView,
  },
  {
    path: "/facebook",
    component: () => (window.location = "https://www.facebook.com/"),
  },
  {
    path: "/instagram",
    component: () => (window.location = "https://www.instagram.com/"),
  },
  {
    path: "/twitter",
    component: () => (window.location = "https://twitter.com/"),
  },
];

export default routes;
