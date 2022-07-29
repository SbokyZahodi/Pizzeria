import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialState";

function recalculation(
  basicPrice: number | null,
  size: number,
  sublements:
    | {
        name: string;
        price: number;
        img: any;
        id: string;
        active?: boolean | undefined;
      }[]
    | undefined
) {
  let price: number | null = basicPrice;

  if (basicPrice) {
    if (size === 25) {
      price = basicPrice;
    } else if (size === 30) {
      price = basicPrice * 1.2;
    } else if (size === 40) {
      price = basicPrice * 1.4;
    }
  }

  function sublementsPrice() {
    let anime = 0;

    sublements?.forEach((item) => {
      anime += item.price;
    });
    return anime;
  }

  if (price) {
    return +price.toFixed(0) + sublementsPrice();
  }
}

const pizzaReducer = createSlice({
  name: "pizzaReducer",
  initialState,

  reducers: {
    setCategory(state, action: PayloadAction<{ id: number | null }>) {
      if (action.payload.id === null) {
        state.currentCategory = null;
      }

      let category = state.categories.find(
        (item) => item.id === action.payload.id
      );

      if (category) {
        state.currentCategory = category.id;
      }
    },

    setCurrentProduct(
      state,
      action: PayloadAction<{ id: string | undefined }>
    ) {
      state.categories.forEach((cat) => {
        cat.products.forEach((item) => {
          if (item.id === action.payload.id) {
            state.currentProduct = { ...item, size: 25, crust: "thick" };
            state.isCurrentProductModalOpen = true;
            if (item.price) {
              state.currentProductBasicPrice = item.price;
            }
          }
        });
      });

      // Снабжение ингредиентами категории
      state.categories.forEach((cat) => {
        if (cat.products.some((item) => item.id === action.payload.id)) {
          state.sumblements = cat.sublements;
        }
      });
    },
    setSize(state, action: PayloadAction<{ size: 25 | 30 | 40 }>) {
      if (state.currentProduct) {
        state.currentProduct.size = action.payload.size;
        state.currentProduct.price = recalculation(
          state.currentProductBasicPrice,
          state.currentProduct.size,
          state.currentProduct.sumblements
        );
      }
    },
    setCrust(state, action: PayloadAction<{ crust: "thin" | "thick" }>) {
      if (state.currentProduct) {
        state.currentProduct.crust = action.payload.crust;
      }
    },
    addSublement(state, action: PayloadAction<{ sublementId: string }>) {
      if (state.currentProduct?.sumblements) {
        state.sumblements?.forEach((item) => {
          if (item.id === action.payload.sublementId) {
            if (
              state.currentProduct?.sumblements?.some(
                (item) => item.id === action.payload.sublementId
              )
            ) {
              state.currentProduct.sumblements =
                state.currentProduct.sumblements.filter(
                  (item) => item.id !== action.payload.sublementId
                );
            } else {
              state.currentProduct?.sumblements?.push(item);
            }
          }
        });
      } else {
        if (state.currentProduct) {
          state.currentProduct.sumblements = [];
          state.sumblements?.forEach((item) => {
            if (item.id === action.payload.sublementId) {
              state.currentProduct?.sumblements?.push(item);
            }
          });
        }
      }

      if (state.currentProduct) {
        state.currentProduct.price = recalculation(
          state.currentProductBasicPrice,
          state.currentProduct.size,
          state.currentProduct.sumblements
        );
      }
    },

    closeModalMenu(state) {
      state.isCurrentProductModalOpen = !state.isCurrentProductModalOpen;
    },
    closeCartModalMenu(state) {
      state.isCartModalMenuOpen = !state.isCartModalMenuOpen;
    },
    closeEditModalMenu(state) {
      state.isEditProductModalMenuOpen = !state.isEditProductModalMenuOpen;
    },
    closeOrOpenCountrySelector(state) {
      state.isCountrySelectorModalMenuOpen =
        !state.isCountrySelectorModalMenuOpen;
    },

    addToCart(state, action: PayloadAction<{ productId: string | undefined }>) {
      if (state.currentProduct) {
        state.cart.push({
          ...state.currentProduct,
          quantity: 1,
          id: nanoid(),
        });
      }
    },
    removeFromCart(state, action: PayloadAction<{ id: string | undefined }>) {
      let array = state.cart.filter((item) => item.id !== action.payload.id);
      state.cart = array;
    },
    setQuantity(
      state,
      action: PayloadAction<{ prodId: string | undefined; quantity: number }>
    ) {
      state.cart.forEach((item) => {
        if (item.id === action.payload.prodId) {
          item.quantity = action.payload.quantity;
        }
      });
    },
    editProd(state, action: PayloadAction<{ id: string | undefined }>) {
      let prod = state.cart.find((item) => item.id === action.payload.id);
      if (prod) {
        state.currentProduct = prod;
        state.isEditProductModalMenuOpen = true;
      }

      // Ингредиенты категории
      let currentProductname = state.cart.find(
        (state) => state.id === action.payload.id
      );

      state.categories.forEach((cat) => {
        cat.products.forEach((item) => {
          if (item.name === currentProductname?.name) {
            if (item.price) {
              state.currentProductBasicPrice = item.price;
            }
          }
        });

        if (
          cat.products.some((item) => item.name === currentProductname?.name)
        ) {
          if (state.currentProduct) {
            state.sumblements = cat.sublements;
          }
        }
      });
    },
    saveEditChanges(state, action: PayloadAction<{ id: string | undefined }>) {
      state.cart.forEach((item) => {
        if (item.id === action.payload.id) {
          if (state.currentProduct) {
            item.crust = state.currentProduct.crust;
            item.price = state.currentProduct.price;
            item.size = state.currentProduct.size;
            item.sumblements = state.currentProduct.sumblements;
          }
        }
      });
      state.isEditProductModalMenuOpen = false;
    },
    setCountry(state, action: PayloadAction<{ country: string }>) {
      state.country = action.payload.country;
      state.isCountrySelectorModalMenuOpen = false;
    },
  },
});

export default pizzaReducer.reducer;
export const {
  setCurrentProduct,
  setCategory,
  closeModalMenu,
  setSize,
  setCrust,
  addSublement,
  closeCartModalMenu,
  addToCart,
  removeFromCart,
  closeEditModalMenu,
  saveEditChanges,
  setQuantity,
  editProd,
  closeOrOpenCountrySelector,
  setCountry,
} = pizzaReducer.actions;
