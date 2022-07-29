import { useAppSelector } from "../../../Redux/Hooks";
import Card from "./Card";
import DrinkCard from "./DrinkCard";
import SnackCard from "./SnackCard";

function CardsContainer() {
  let category = useAppSelector((state) => state.pizzaReducer.categories);
  let currentProductName = useAppSelector(
    (state) => state.pizzaReducer.currentProduct?.name
  );

  let currentProductCategory: string | null = null;

  category.forEach((item) => {
    if (item.products.some((item) => item.name === currentProductName)) {
      currentProductCategory = item.title;
    }
  });

  if (currentProductCategory) {
    if (currentProductCategory === "Пицца") {
      return <Card />;
    } else if (currentProductCategory === "Комбо") {
      return <Card />;
    } else if (currentProductCategory === "Напитки") {
      return <DrinkCard />;
    } else if (currentProductCategory === "Закуски") {
      return <SnackCard />;
    }
  }

  return <Card />;
}
export default CardsContainer;
