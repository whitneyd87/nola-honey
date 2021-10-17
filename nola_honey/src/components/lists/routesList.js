import AboutView from "../aboutView";
import ShopView from "../shopView";
import ContactView from "../contactView";
import ItemView from "../itemView";
import AddToCartView from "../addToCartView";
import MyCartView from "../myCartView";
import EditCartView from "../editCartView";
import DeleteCartItemView from "../deleteCartItemView";
import SignInView from "../signInView";
import CreateAccountView from "../createAccountView";
import MyAccountView from "../myAccountView";
import AccountDetailsView, {
  OrderHistoryView,
  ReviewsHistoryView,
} from "../helpers/accountHelper";
import CheckoutView from "../checkoutView";

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
    component: MyCartView,
  },
  {
    path: "/shop/mycart/edit",
    component: EditCartView,
  },
  {
    path: "/shop/mycart/delete",
    component: DeleteCartItemView,
  },
  {
    path: "/shop/mycart/checkout",
    component: CheckoutView,
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
    path: "/myaccount",
    component: MyAccountView,
    routes: [
      { path: "/myaccount/accountdetails", component: AccountDetailsView },
      { path: "/myaccount/orders", component: OrderHistoryView },
      { path: "/myaccount/reviews", component: ReviewsHistoryView },
    ],
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
