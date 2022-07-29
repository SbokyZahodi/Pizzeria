import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks";
import {
  addSublement,
  addToCart,
  closeEditModalMenu,
  closeModalMenu,
  saveEditChanges,
  setCrust,
  setSize,
} from "../../../Redux/reducers/pizzaReducer";
import close from "../assets/Close.png";
import addToCartPNG from "../assets/Add__to__Cart.png";

function Card() {
  const addedToCart = () =>
    toast.success(`"${currentProduct?.name}" добавлен в корзину`, {
      position: `top-center`,
      iconTheme: {
        primary: "green",
        secondary: "#FFFAEE",
      },
    });
  const edited = () =>
    toast.success(`"${currentProduct?.name}" сохранена`, {
      position: `top-center`,
      iconTheme: {
        primary: "green",
        secondary: "#FFFAEE",
      },
    });

  let dispatch = useAppDispatch();
  let isModalOpen = useAppSelector(
    (state) => state.pizzaReducer.isCurrentProductModalOpen
  );
  let categorySublements = useAppSelector(
    (state) => state.pizzaReducer.sumblements
  );

  let currentProduct = useAppSelector(
    (state) => state.pizzaReducer.currentProduct
  );
  let isEditModeModalMenuOpen = useAppSelector(
    (state) => state.pizzaReducer.isEditProductModalMenuOpen
  );

  let size = currentProduct?.size;
  let crust = currentProduct?.crust;
  let currentProductSublements = currentProduct?.sumblements;

  function Item(props: {
    name: string;
    img: any;
    price: number;
    id: string;
    key: string;
    active?: boolean;
  }) {
    return (
      <div
        onClick={() => dispatch(addSublement({ sublementId: props.id }))}
        className="flex flex-col justify-center items-center  m-2 drop-shadow-sm shadow-md rounded-xl p-2 cursor-pointer"
      >
        <div className="">
          <img src={props.img} className="" alt="" />
        </div>
        <div className="font-medium">{props.name}</div>
        <div className="">{props.price}р</div>

        <div className="absolute right-1 top-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 fill-gray-400 ${
              props.active && "fill-green-600"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }

  let arrayOfSublements = categorySublements?.map((item) => {
    return (
      <Item
        name={item.name}
        img={item.img}
        price={item.price}
        key={item.id}
        id={item.id}
        active={currentProductSublements?.includes(item) ? true : false}
      />
    );
  });

  function newSize(size: 25 | 30 | 40) {
    dispatch(setSize({ size: size }));
  }
  function newCrust(crust: "thin" | "thick") {
    dispatch(setCrust({ crust: crust }));
  }

  return (
    <div
      className="fixed w-full h-full top-0 flex justify-center items-center z-10 smooth-mount "
      style={{
        display: `${isModalOpen || isEditModeModalMenuOpen ? "flex" : "none"}`,
      }}
    >
      <div className="bg-teal-50 w-full h-full md:w-[800px] md:h-[600px] shadow-2xl md:flex rounded-md overflow-auto ">
        <div className="basis-1/2 p-5 border md:shadow-2xl shadow-gray-400 m-0">
          <img
            src={close}
            alt=""
            onClick={() => {
              if (isEditModeModalMenuOpen) {
                dispatch(closeEditModalMenu());
              } else {
                dispatch(closeModalMenu());
              }
            }}
            className="cursor-pointer block md:hidden float-right"
          />
          <div className="flex justify-center items-center  ">
            <img src={currentProduct?.img} alt="" className="w-64" />
          </div>
          <div className="flex justify-center items-center font-medium text-3xl my-2">
            {currentProduct?.name}
          </div>
          <div className="flex justify-between">
            <div className="w-60 text-gray-500">
              Томатный соус, моцарелла, острая чоризо, сладкий перец
            </div>
            <div className="text-2xl">500г</div>
          </div>
          <div className="flex justify-center items-center my-5">
            <div className="flex   bg-slate-200 w-full mx-10 items-center justify-between  rounded-full">
              <div
                className={`p-1 m-1 w-1/2 text-center rounded-full cursor-pointer transition duration-200 ${
                  crust === "thick" ? "shadow bg-slate-50" : "bg-none"
                }`}
                onClick={() => newCrust("thick")}
              >
                Толстое
              </div>
              <div
                onClick={() => newCrust("thin")}
                className={`p-1 m-1 w-1/2 text-center rounded-full cursor-pointer transition duration-200 ${
                  crust === "thin" ? "shadow bg-slate-50" : "bg-none"
                }`}
              >
                Тонкое
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center my-5">
            <div className="flex   bg-slate-200 w-full mx-10 items-center justify-between  rounded-full">
              <div
                onClick={() => newSize(25)}
                className={`p-1 m-1 w-1/2 text-center rounded-full cursor-pointer transition duration-200 ${
                  size === 25 ? "shadow bg-slate-50" : "bg-none"
                }`}
              >
                25см
              </div>
              <div
                onClick={() => newSize(30)}
                className={`p-1 m-1 w-1/2 text-center rounded-full cursor-pointer transition duration-200 ${
                  size === 30 ? "shadow bg-slate-50" : "bg-none"
                }`}
              >
                30см
              </div>
              <div
                onClick={() => newSize(40)}
                className={`p-1 m-1 w-1/2 text-center rounded-full cursor-pointer transition duration-200 ${
                  size === 40 ? "shadow bg-slate-50" : "bg-none"
                }`}
              >
                40см
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="p-1.5 px-5 font-medium text-md bg-[#ECC849] rounded-xl w-36">
              Итого: {currentProduct?.price}р
            </div>
            <div className="cursor-pointer">
              <img
                src={addToCartPNG}
                alt=""
                className={`${isEditModeModalMenuOpen ? "hidden" : "block"}`}
                onClick={() => {
                  dispatch(addToCart({ productId: currentProduct?.id }));
                  addedToCart();
                  dispatch(closeModalMenu());
                }}
              />
              <button
                onClick={() => {
                  edited();
                  dispatch(saveEditChanges({ id: currentProduct?.id }));
                }}
                className={`p-1.5 px-5 font-medium text-md bg-[#ECC849] rounded-xl ${
                  isEditModeModalMenuOpen ? "block" : "hidden"
                }`}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <div className="flex justify-between items-center p-2">
            <div className="mx-2 font-medium text-xl">Добавить ингредиенты</div>
            <div className="">
              <img
                src={close}
                alt=""
                onClick={() => {
                  if (isEditModeModalMenuOpen) {
                    dispatch(closeEditModalMenu());
                  } else {
                    dispatch(closeModalMenu());
                  }
                }}
                className="cursor-pointer hidden md:block"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 p-2">{arrayOfSublements}</div>
        </div>
      </div>
    </div>
  );
}
export default Card;
