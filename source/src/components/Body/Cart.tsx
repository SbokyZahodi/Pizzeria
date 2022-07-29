import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import {
  closeCartModalMenu,
  editProd,
  removeFromCart,
  setQuantity,
} from "../../Redux/reducers/pizzaReducer";
import close from "./assets/Close.png";

function Cart() {
  let cart = useAppSelector((state) => state.pizzaReducer.cart);
  let isCartModalMenuOpen = useAppSelector(
    (state) => state.pizzaReducer.isCartModalMenuOpen
  );
  let dispatch = useAppDispatch();

  function Summ() {
    let anime: number = 0;
    cart.forEach((item) => {
      if (item.price) {
        if (item.quantity) {
          anime += item.price * item.quantity;
        }
      }
    });

    return anime;
  }

  function Item(props: {
    img: any | undefined;
    name: string | undefined;
    price: number | undefined;
    id: string | undefined;
    crust: string;
    size: number;
    quantity: number | undefined;
    sumblements:
      | {
          name: string;
          price: number;
          img: any;
          id: string;
        }[]
      | undefined;
  }) {
    let categories = useAppSelector((state) => state.pizzaReducer.categories);
    let currentCategoryID = findCategory();

    function count(action: "minus" | "plus", id: string | undefined) {
      let counter = props.quantity;

      if (action === "plus") {
        if (counter) {
          dispatch(setQuantity({ prodId: id, quantity: counter + 1 }));
        }
      } else {
        if (counter) {
          if (counter <= 1) {
          } else {
            dispatch(setQuantity({ prodId: id, quantity: counter - 1 }));
          }
        }
      }
    }

    let sub = props.sumblements?.map((item) => {
      return `${item.name} `;
    });

    function toFluid(size: number) {
      let ml: number = 0;
      if (size === 25) {
        ml = 250;
      } else if (size === 30) {
        ml = 350;
      } else if (size === 40) {
        ml = 500;
      }

      return ml;
    }
    function toSnack(size: number) {
      let weight: number = 0;
      if (size === 25) {
        weight = 100;
      } else if (size === 30) {
        weight = 200;
      } else if (size === 40) {
        weight = 300;
      }

      return weight;
    }

    function findCategory() {
      let cat: number | null = null;
      categories.forEach((item) => {
        if (item.products.some((prod) => prod.name === props.name)) {
          cat = item.id;
        }
      });

      return cat;
    }

    return (
      <div className={`flex flex-col  `}>
        <div className={`m-2 p-2 shadow-md`}>
          <div className={`mb-4`}>
            <img
              src={close}
              alt=""
              className="float-right cursor-pointer"
              onClick={() => dispatch(removeFromCart({ id: props.id }))}
            />
          </div>
          <div className={`md:flex`}>
            <div className={`flex justify-center items-center`}>
              <img src={props.img} alt="" className="w-40" />
            </div>
            <div className={`ml-2`}>
              <div className={`flex justify-between items-center mt-2`}>
                <div className="font-medium text-2xl">"{props.name}"</div>
                <div className="text-sm mx-2 text-slate-500">{sub}</div>
              </div>
              <div className={``}>
                <div className={`ml-2 text-slate-600`}>
                  {currentCategoryID === 2 && (
                    <span> {toFluid(props.size)}мл</span>
                  )}
                  {currentCategoryID === 3 && (
                    <span> {toSnack(props.size)}г</span>
                  )}
                  {currentCategoryID === 1 && (
                    <span> Размер - {props.size}см</span>
                  )}
                  {currentCategoryID === 0 && (
                    <span> Размер - {props.size}см</span>
                  )}
                </div>
                <div className={`ml-2 text-slate-600`}>
                  {currentCategoryID === 0 && (
                    <span>
                      {props.crust === "thick" ? "Толстая" : "Тонкая"} корочка
                    </span>
                  )}
                  {currentCategoryID === 1 && (
                    <span>
                      {props.crust === "thick" ? "Толстая" : "Тонкая"} корочка
                    </span>
                  )}
                </div>
                <div className={`m-2 ml-6 font-medium text-2xl`}>
                  {props.price}р
                </div>
              </div>
            </div>
          </div>
          <div className={`flex justify-end`}>
            <button
              className={`bg-yellow-300 mx-2 p-1 rounded-xl shadow-md hover:bg-yellow-400 transition`}
              onClick={() => dispatch(editProd({ id: props.id }))}
            >
              Редактировать
            </button>
            <button
              className={`bg-yellow-300 mx-2 p-1 rounded-xl flex shadow-md `}
            >
              <span>Кол-во: </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 border border-black rounded-full mx-2 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => count("minus", props.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 12H6"
                />
              </svg>

              <span className="text-bold ">{props.quantity}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 border border-black rounded-full mx-2 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => count("plus", props.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  function EmptyCartComponent() {
    return (
      <div className={`flex items-center justify-center h-full w-full`}>
        <div className={``}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-40 w-40 stroke-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-center text-gray-400 text-md">
            Кажется, корзина пуста
          </div>
        </div>
      </div>
    );
  }

  let prod = cart.map((item) => {
    return (
      <Item
        img={item.img}
        name={item.name}
        price={item.price}
        id={item.id}
        sumblements={item.sumblements}
        crust={item.crust}
        quantity={item.quantity}
        size={item.size}
        key={item.id}
      />
    );
  });

  return (
    <div
      className={`fixed w-full h-full top-0 flex justify-center items-center smooth-mount ${
        isCartModalMenuOpen ? "block" : "hidden"
      }`}
    >
      <div
        className={`bg-slate-50 h-full w-full md:w-[600px] md:h-[650px] md:rounded-xl drop-shadow-xl`}
      >
        <div className={`flex justify-between items-center p-4`}>
          <div className={`font-medium text-2xl`}>Корзина</div>
          <div className={``}>
            <img
              src={close}
              alt=""
              className="cursor-pointer"
              onClick={() => dispatch(closeCartModalMenu())}
            />
          </div>
        </div>

        <div className={`overflow-auto h-[70%] md:h-[80%]`}>
          {cart.length ? prod : <EmptyCartComponent />}
        </div>
        <div className={`flex justify-between items-center mt-4 `}>
          <div className={`md:flex justify-between items-center`}>
            <div
              className={`bg-yellow-300 shadow-md p-1 px-2 mx-2 my-2  rounded-md`}
            >
              Товаров: {cart.length}
            </div>
            <div
              className={`bg-yellow-300 shadow-md p-1 px-2 mx-2 my-2  rounded-md`}
            >
              Итого: {Summ()}р
            </div>
          </div>
          <button
            className={`flex justify-between items-center mr-4 bg-yellow-300 shadow-md p-4 md:p-1 px-2 mx-2 rounded-md`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>Перейти к оплате</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
