import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import cities from "../../Redux/reducers/cities";
import {
  closeOrOpenCountrySelector,
  setCountry,
} from "../../Redux/reducers/pizzaReducer";
import close from "./assets/Close.png";
import { nanoid } from "@reduxjs/toolkit";

function Header() {
  const [FilterStr, setFilterStr] = useState("");
  let isModalOpen = useAppSelector(
    (state) => state.pizzaReducer.isCountrySelectorModalMenuOpen
  );
  let currentCountry = useAppSelector((state) => state.pizzaReducer.country);
  let dispatch = useAppDispatch();

  let arrayOfFilteredCountries = filter(FilterStr);

  function filter(str?: string) {
    if (str) {
      let array = cities.filter((item) =>
        item.name.toUpperCase().includes(str.toUpperCase())
      );
      return array.map(({ name, subject }) => {
        return <Country subject={subject} name={name} key={nanoid()} />;
      });
    } else {
      return cities.map(({ name, subject }) => {
        return <Country subject={subject} name={name} key={nanoid()} />;
      });
    }
  }

  function Country({
    subject,
    name,
  }: {
    subject: string;
    name: string;
    key: string;
  }) {
    return (
      <div
        className={`border hover:bg-slate-200 p-2 cursor-pointer transition mx-10 py-3 flex items-center`}
        onClick={() => dispatch(setCountry({ country: name }))}
      >
        <div className={`w-40`}>{name}</div>
        <div className={`text-sm ml-14 text-slate-400 `}>{subject}</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-cover bg-[#FACF00] shadow">
        <div className=" w-full flex justify-between p-5 items-center font-medium text-lg ">
          <div className="md:mx-10 text-md md:text-lg flex items-center ">
            <span className="text-center">
              Ваш город -{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => dispatch(closeOrOpenCountrySelector())}
              >
                {currentCountry}
              </span>
            </span>
          </div>
          <div className="flex">
            <div className="hidden md:block  px-5 hover:underline cursor-pointer">
              Информация
            </div>
            <div className="hidden md:block  px-5 hover:underline cursor-pointer">
              Доставка и оплата
            </div>
            <div className="hidden md:block px-5 hover:underline cursor-pointer">
              +7 (800)-55-35-35
            </div>
          </div>
        </div>

        {/* Модальное окно для выбора города */}
        <div
          className={`fixed w-full h-full top-0 flex justify-center items-center z-10 rounded-md smooth-mount ${
            isModalOpen ? "flex" : "hidden"
          }`}
        >
          <div
            className={`w-full h-[550px] md:w-[500px] bg-slate-100 shadow-xl`}
          >
            <div
              className={`font-medium text-xl m-5 flex justify-between items-center`}
            >
              <span>Выберите город</span>
              <img
                className="cursor-pointer"
                src={close}
                alt=""
                onClick={() => dispatch(closeOrOpenCountrySelector())}
              />
            </div>
            {/* Поиск города */}
            <div className={`flex bg-slate-100 shadow-md m-5 p-4 text-lg  `}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-slate-400 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                className="bg-slate-100 outline-none w-full ml-2"
                placeholder="Введите название города"
                value={FilterStr}
                onChange={(e) => setFilterStr(e.target.value)}
              />
            </div>

            {/* Города */}
            <div className={`overflow-auto h-[70%]`}>
              {arrayOfFilteredCountries}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
