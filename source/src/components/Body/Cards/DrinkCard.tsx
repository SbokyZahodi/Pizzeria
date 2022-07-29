import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks";
import {
  addToCart,
  closeEditModalMenu,
  closeModalMenu,
  saveEditChanges,
  setSize,
} from "../../../Redux/reducers/pizzaReducer";
import close from "../assets/Close.png";
import addToCartPNG from "../assets/Add__to__Cart.png";

function DrinkCard() {
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

  let isEditModeModalMenuOpen = useAppSelector(
    (state) => state.pizzaReducer.isEditProductModalMenuOpen
  );

  let currentProduct = useAppSelector(
    (state) => state.pizzaReducer.currentProduct
  );
  let size = currentProduct?.size;

  function newSize(size: 25 | 30 | 40) {
    dispatch(setSize({ size: size }));
  }

  function volume() {
    if (size === 25) {
      return 250;
    }
    if (size === 30) {
      return 350;
    }
    if (size === 40) {
      return 500;
    }
  }

  return (
    <div
      className="fixed w-full h-full top-0 flex justify-center items-center z-10  "
      style={{
        display: `${isModalOpen || isEditModeModalMenuOpen ? "flex" : "none"}`,
      }}
    >
      <div className="bg-teal-50 w-full md:w-[500px]  shadow-2xl rounded-md smooth-mount">
        <div className="basis-1/2 p-5 shadow-2xl shadow-gray-400 m-0">
          <img
            src={close}
            alt=""
            className="float-right"
            onClick={() => {
              if (isEditModeModalMenuOpen) {
                dispatch(closeEditModalMenu());
              } else {
                dispatch(closeModalMenu());
              }
            }}
          />
          <div className="flex justify-center items-center  ">
            <img src={currentProduct?.img} alt="" className="" />
          </div>
          <div className="flex justify-center items-center font-medium text-3xl my-2">
            {currentProduct?.name}
          </div>
          <div className="flex justify-between">
            <div className="w-60 text-gray-500">
              Лед, лимон, сироп лимонный, сироп апельсиновый, сок лайма
            </div>
            <div className="text-2xl">{volume()}мл</div>
          </div>
          <div className="flex justify-center items-center my-5">
            <div className="flex   bg-slate-200 w-full mx-10 items-center justify-between  rounded-full"></div>
          </div>
          <div className="flex justify-center items-center my-5">
            <div className="flex   bg-slate-200 w-full mx-10 items-center justify-between  rounded-full">
              <div
                onClick={() => newSize(25)}
                className={`p-1 m-1 w-1/2 text-center rounded-full cursor-pointer transition duration-200 ${
                  size === 25 ? "shadow bg-slate-50" : "bg-none"
                }`}
              >
                250мл
              </div>
              <div
                onClick={() => newSize(30)}
                className={`p-1 m-1 w-1/2 text-center rounded-full cursor-pointer transition duration-200 ${
                  size === 30 ? "shadow bg-slate-50" : "bg-none"
                }`}
              >
                350мл
              </div>
              <div
                onClick={() => newSize(40)}
                className={`p-1 m-1 w-1/2 text-center rounded-full cursor-pointer transition duration-200 ${
                  size === 40 ? "shadow bg-slate-50" : "bg-none"
                }`}
              >
                500мл
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="p-1.5 px-5 font-medium text-md bg-[#ECC849] rounded-xl">
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
      </div>
    </div>
  );
}
export default DrinkCard;
