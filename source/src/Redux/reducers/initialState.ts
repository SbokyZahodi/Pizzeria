import { nanoid } from "@reduxjs/toolkit";
import firmennaya from "./img/firmennaya.png";
import marianskaya from "./img/marianskaya.png";
import morskaya from "./img/morskaya.png";
import pepperoni from "./img/pepperoni.png";

// Combo
import fiveStana from "./img/combo/FiveStan.png";
import fourStana from "./img/combo/FourStan.png";
import salsa from "./img/combo/Salsa.png";
import tristana from "./img/combo/Tristana.png";

// Sublements
import bacon from "./img/sublements/bacon.png";
import harrisaSous from "./img/sublements/boloncheze-sous.png";
import cheezeSous from "./img/sublements/cheeze-sous.png";
import chili from "./img/sublements/chili.png";
import milkSous from "./img/sublements/milk-sous.png";
import mozarela from "./img/sublements/mozarela.png";
import muchroms from "./img/sublements/muchrooms.png";
import oliva from "./img/sublements/oliva.png";
import salsaSous from "./img/sublements/salsa-sous.png";
import spicySous from "./img/sublements/spicy-sous.png";
import tomato from "./img/sublements/tomato.png";

// Drinks
import chocolate from "./img/drinks/Chocolate.png";
import limon from "./img/drinks/Lemon.png";
import meridiana from "./img/drinks/Meridiana.png";
import strawberry from "./img/drinks/strawberry.png";

// Snacks
import cheeze from "./img/snacks/cheeze.png";
import meat from "./img/snacks/meat.png";
import potato from "./img/snacks/potato.png";

interface initialStateType {
  categories: {
    id: number;
    title: string;
    sublements:
      | {
          name: string;
          price: number;
          img: any;
          id: string;
        }[]
      | undefined;
    products: {
      name?: string;
      price?: number;
      img?: any;
      id?: string;
    }[];
  }[];
  isCurrentProductModalOpen: boolean;
  isEditProductModalMenuOpen: boolean;
  isCartModalMenuOpen: boolean;
  isCountrySelectorModalMenuOpen: boolean;
  country: string | "Москва";
  currentProduct: {
    name?: string;
    price?: number;
    img?: any;
    id?: string;
    crust: "thin" | "thick";
    sumblements?: {
      name: string;
      price: number;
      img: any;
      id: string;
    }[];
    size: 25 | 30 | 40;
  } | null;
  currentProductBasicPrice: number | null;
  cart: {
    name?: string;
    price?: number;
    img?: any;
    id?: string;
    crust: "thin" | "thick";
    quantity?: number;
    sumblements?: {
      name: string;
      price: number;
      img: any;
      id: string;
    }[];
    size: 25 | 30 | 40;
  }[];
  sumblements:
    | {
        name: string;
        price: number;
        img: any;
        id: string;
        active?: boolean;
      }[]
    | null
    | undefined;
  currentCategory: number | null;
}

const initialState: initialStateType = {
  country: "Москва",
  isCountrySelectorModalMenuOpen: false,
  currentCategory: null,
  isCurrentProductModalOpen: false,
  isCartModalMenuOpen: false,
  isEditProductModalMenuOpen: false,
  currentProduct: null,
  currentProductBasicPrice: 0,
  cart: [],
  sumblements: null,
  categories: [
    {
      id: 0,
      title: "Пицца",
      sublements: [
        { name: "Томаты", price: 60, img: tomato, id: nanoid() },
        { name: "Бекон", price: 100, img: bacon, id: nanoid() },
        { name: "Шампиньоны", price: 60, img: muchroms, id: nanoid() },
        { name: "Оливки", price: 100, img: oliva, id: nanoid() },
        { name: "Чили", price: 100, img: chili, id: nanoid() },
        { name: "Моцарелла", price: 100, img: mozarela, id: nanoid() },
      ],
      products: [
        {
          name: "Пепперонесса",
          price: 499,
          img: pepperoni,
          id: nanoid(),
        },
        {
          name: "Пепперонесса",
          price: 499,
          img: pepperoni,
          id: nanoid(),
        },
        {
          name: "Пепперонесса",
          price: 499,
          img: pepperoni,
          id: nanoid(),
        },
        {
          name: "Пепперонесса",
          price: 499,
          img: pepperoni,
          id: nanoid(),
        },
        {
          name: "Фирменная",
          price: 599,
          img: firmennaya,
          id: nanoid(),
        },
        {
          name: "Фирменная",
          price: 599,
          img: firmennaya,
          id: nanoid(),
        },
        {
          name: "Фирменная",
          price: 599,
          img: firmennaya,
          id: nanoid(),
        },
        {
          name: "Фирменная",
          price: 599,
          img: firmennaya,
          id: nanoid(),
        },
        {
          name: "Марианская",
          price: 299,
          img: marianskaya,
          id: nanoid(),
        },
        {
          name: "Марианская",
          price: 299,
          img: marianskaya,
          id: nanoid(),
        },
        {
          name: "Марианская",
          price: 299,
          img: marianskaya,
          id: nanoid(),
        },
        {
          name: "Марианская",
          price: 299,
          img: marianskaya,
          id: nanoid(),
        },
        {
          name: "Морская",
          price: 399,
          img: morskaya,
          id: nanoid(),
        },
        {
          name: "Морская",
          price: 399,
          img: morskaya,
          id: nanoid(),
        },
        {
          name: "Морская",
          price: 399,
          img: morskaya,
          id: nanoid(),
        },
        {
          name: "Морская",
          price: 399,
          img: morskaya,
          id: nanoid(),
        },
      ],
    },
    {
      id: 1,
      title: "Комбо",
      sublements: [
        { name: "Томаты", price: 60, img: tomato, id: nanoid() },
        { name: "Бекон", price: 100, img: bacon, id: nanoid() },
        { name: "Шампиньоны", price: 60, img: muchroms, id: nanoid() },
        { name: "Оливки", price: 100, img: oliva, id: nanoid() },
        { name: "Чили", price: 100, img: chili, id: nanoid() },
        { name: "Моцарелла", price: 100, img: mozarela, id: nanoid() },
      ],
      products: [
        {
          name: "Тристана",
          price: 899,
          img: tristana,
          id: nanoid(),
        },
        {
          name: "ЧетыреСтана",
          price: 1199,
          img: fourStana,
          id: nanoid(),
        },
        {
          name: "ПятьСтанов",
          price: 799,
          img: fourStana,
          id: nanoid(),
        },
        {
          name: "ПятьСтанов",
          price: 899,
          img: fiveStana,
          id: nanoid(),
        },
        {
          name: "Сальса",
          price: 899,
          img: salsa,
          id: nanoid(),
        },
      ],
    },
    {
      id: 2,
      title: "Напитки",
      sublements: [],
      products: [
        {
          name: "Лаймон фреш",
          price: 169,
          img: limon,
          id: nanoid(),
        },
        {
          name: "Коктейль Меридиана",
          price: 199,
          img: meridiana,
          id: nanoid(),
        },
        {
          name: "Коктейль Шоколадный",
          price: 299,
          img: chocolate,
          id: nanoid(),
        },
        {
          name: "Клубничный фреш",
          price: 159,
          img: strawberry,
          id: nanoid(),
        },
      ],
    },
    {
      id: 3,
      title: "Закуски",
      sublements: [
        { name: "Сальса", price: 60, img: salsaSous, id: nanoid() },
        { name: "Сырный", price: 60, img: cheezeSous, id: nanoid() },
        { name: "Творожный", price: 60, img: milkSous, id: nanoid() },
        { name: "Горчичный", price: 60, img: spicySous, id: nanoid() },
        { name: "Харисса", price: 60, img: harrisaSous, id: nanoid() },
      ],
      products: [
        {
          name: "Картофель фри",
          price: 159,
          img: potato,
          id: nanoid(),
        },
        {
          name: "Сырный набор",
          price: 159,
          img: cheeze,
          id: nanoid(),
        },
        {
          name: "Мясной набор",
          price: 159,
          img: meat,
          id: nanoid(),
        },
      ],
    },
  ],
};

export default initialState;
