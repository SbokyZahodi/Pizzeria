import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import {
  closeCartModalMenu,
  setCategory,
  setCurrentProduct,
} from "../../Redux/reducers/pizzaReducer";
import CardsContainer from "./Cards/CardsContainer";
import Cart from "./Cart";

function NewMain() {
  return (
    <div className="">
      <Categories />
      <CardsContainer />
      <Cart />
      <CartMobile />
    </div>
  );
}

function CartMobile() {
  let cartLength = useAppSelector((state) => state.pizzaReducer.cart.length);
  let isCartModalMenuOpen = useAppSelector(
    (state) => state.pizzaReducer.isCartModalMenuOpen
  );
  let dispatch = useAppDispatch();

  if (isCartModalMenuOpen) {
    return null;
  }

  return (
    <>
      <div
        className={`md:hidden fixed bottom-0 right-0 flex justify-end w-1/2 m-2 items-end`}
      >
        <div
          onClick={() => dispatch(closeCartModalMenu())}
          className={`bg-yellow-300 rounded-md relative p-2 w-2/3 shadow-xl flex justify-center items-center cursor-pointer`}
        >
          <span>Корзина</span>
        </div>
        {cartLength ? (
          <div className="absolute -top-2 -right-2 bg-cyan-50 rounded-3xl p-2 w-8 h-8 flex justify-center items-center border border-black">
            {cartLength}
          </div>
        ) : null}
      </div>
    </>
  );
}

function Categories() {
  let categories = useAppSelector((state) => state.pizzaReducer.categories);
  let dispatch = useAppDispatch();
  let currentCategory = useAppSelector(
    (state) => state.pizzaReducer.currentCategory
  );

  let arrayOfCategories = categories.map((item) => {
    return <Item name={item.title} id={item.id} key={item.id} />;
  });

  function Item({
    name,
    id,
  }: {
    name: string;
    id: number;
    key: string | number;
  }) {
    return (
      <div
        onClick={() => dispatch(setCategory({ id: id }))}
        className={`flex items-center  justify-center m-4 md:ml-8 xl:ml-14 my-5 transition   md:hover:translate-x-2 cursor-pointer h-16 md:w-52 xl:w-60 rounded-md ${
          currentCategory === id
            ? "bg-yellow-300 md:translate-x-2"
            : "bg-yellow-100"
        }`}
      >
        <span className="text-2xl font-medium ">{name}</span>
      </div>
    );
  }

  function Cart() {
    let cartLength = useAppSelector((state) => state.pizzaReducer.cart.length);

    return (
      <>
        <div
          onClick={() => dispatch(closeCartModalMenu())}
          className="hidden md:flex relative hover:bg-yellow-400 ml-8 mt-10  shadow-md transition font-medium text-2xl items-center justify-center xl:ml-14 my-2 bg-yellow-300  cursor-pointer h-16 w-52 xl:w-60 rounded-md"
        >
          Корзина
          {cartLength ? (
            <div className="absolute -top-2 -right-2 bg-cyan-50 rounded-3xl p-2 w-8 h-8 flex justify-center items-center border border-black">
              {cartLength}
            </div>
          ) : null}
        </div>
      </>
    );
  }

  return (
    <div className="md:flex ">
      <div className="">
        <div className="md:mt-20 sticky  top-20 ">
          <div
            onClick={() => dispatch(setCategory({ id: null }))}
            className={`flex items-center m-4  justify-center  md:ml-8 xl:ml-14 my-5 transition   md:hover:translate-x-2 cursor-pointer h-16 md:w-52 xl:w-60 rounded-md ${
              currentCategory === null
                ? "bg-yellow-300 md:translate-x-2"
                : "bg-yellow-100"
            }`}
          >
            <span className="text-2xl font-medium ">Все товары</span>
          </div>
          {arrayOfCategories}
          <Cart />
        </div>
      </div>
      <div className="">
        <Products />
      </div>
    </div>
  );
}

function Products() {
  let categories = useAppSelector((state) => state.pizzaReducer.categories);
  let dispatch = useAppDispatch();
  let currentCategory = useAppSelector(
    (state) => state.pizzaReducer.currentCategory
  );

  function Item(props: {
    name: string | undefined;
    id: string | undefined;
    key: string | undefined;
    price: number | undefined;
    img: any;
  }) {
    return (
      <>
        <div
          className="my-5  md:mx-4 relative w-full md:w-64 xl:w-72 2xl:w-72  bg-[#FFFEF0] shadow-md cursor-pointer md:hover:scale-105 transition md:hover:bg-yellow-200 smooth-mount"
          onClick={() => dispatch(setCurrentProduct({ id: props.id }))}
        >
          <div className="flex items-center justify-center ">
            <img src={props.img} alt="" className="h-40 my-4 flex-shrink-0" />
          </div>
          <div className="ml-16 font-medium text-2xl flex justify-center pr-14 m-3">
            <span>{props.name}</span>
          </div>
          <div className="flex justify-between">
            <button className="bg-yellow-300 m-5 py-1 px-4 font-medium text-xl shadow-md rounded-md">
              {props.price}Р
            </button>
            <button className="bg-yellow-300 m-5 py-1 px-4 font-medium text-xl shadow-md rounded-md mr-8">
              Выбрать
            </button>
          </div>
        </div>
      </>
    );
  }

  function Category(props: {
    categoryTitle: string | undefined;
    prod: any;
    key: number;
    id: number;
  }) {
    return (
      <div className="md:ml-14 my-5 mx-2 md:my-24">
        <div className="text-4xl font-medium md:mx-4">
          {props.categoryTitle}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {props.prod}
        </div>
      </div>
    );
  }

  let array = categories.map((item) => {
    let prod = item.products.map((prod) => {
      return (
        <Item
          key={prod.id}
          name={prod.name}
          id={prod.id}
          price={prod.price}
          img={prod.img}
        />
      );
    });

    if (item.id !== currentCategory && currentCategory !== null) {
      return null;
    }

    return (
      <Category
        categoryTitle={item.title}
        prod={prod}
        key={item.id}
        id={item.id}
      />
    );
  });

  return <>{array}</>;
}

export default NewMain;
