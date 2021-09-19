import HoneyJar from "../../images/honey-jar.png";
import TeaCup from "../../images/tea-bee-cup.png";
import MensGetDatHoney from "../../images/get-dat-honey-mens.png";
import WomensGetDatHoney from "../../images/get-dat-honey-womens.png";
import MensSweetVibes from "../../images/sweet-vibes-mens.png";
import WomensSweetVibes from "../../images/sweet-vibes-womens.png";

const items = [
  {
    id: "honeyjar",
    src: HoneyJar,
    title: "honey jar",
    description: "100% pure organic honey",
    price: 15,
    inventory: 10,
  },
  {
    id: "teacup",
    src: TeaCup,
    title: "tea bee tea cup",
    description: "Made of selected ceramics without lead or cadmium",
    price: 8,
    inventory: 10,
  },
  {
    id: "mensgetdathoney",
    src: MensGetDatHoney,
    title: "mens get dat honey t-shirt",
    description: "100% cotton classic crew neck with comfort tag",
    options: ["XS", "S", "L", "XL", "XXL"],
    price: 23,
    inventory: 10,
  },
  {
    id: "womensgetdathoney",
    src: WomensGetDatHoney,
    title: "womens get dat honey t-shirt",
    description: "100% cotton classic crew neck with comfort tag",
    options: ["XS", "S", "L", "XL", "XXL"],
    price: 23,
    inventory: 10,
  },
  {
    id: "menssweetvibes",
    src: MensSweetVibes,
    title: "mens sweet vibes t-shirt",
    description: "100% cotton classic crew neck with comfort tag",
    options: ["XS", "S", "L", "XL", "XXL"],
    price: 23,
    inventory: 10,
  },
  {
    id: "womenssweetvibes",
    src: WomensSweetVibes,
    title: "womens sweet vibes t-shirt",
    description: "100% cotton classic crew neck with comfort tag",
    options: ["XS", "S", "L", "XL", "XXL"],
    price: 23,
    inventory: 10,
  },
];

export default items;
