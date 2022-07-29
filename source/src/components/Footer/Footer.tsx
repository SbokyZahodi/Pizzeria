function Footer() {
  return (
    <div
      className={`flex justify-center items-center bg-[#414141] text-slate-50 mt-40 `}
    >
      <div className={`flex flex-col md:flex-row `}>
        <div className={`flex flex-col m-10 ml-0 md:mx-10 xl:mx-20`}>
          <span className="leading-10 border-b border-[#616161] text-xl">
            Компания
          </span>
          <span className="leading-10 cursor-pointer hover:underline">
            О компании{" "}
          </span>
          <span className="leading-10 cursor-pointer hover:underline">
            Партнерам
          </span>
          <span className="leading-10 cursor-pointer hover:underline">
            Вакансии
          </span>
          <span className="leading-10 cursor-pointer hover:underline">
            Политика конфиденциальности
          </span>
        </div>
        <div className={`flex flex-col m-10 ml-0 md:mx-10 xl:mx-20`}>
          <span className="leading-10 border-b border-[#616161] text-xl">
            Покупателям
          </span>
          <span className="leading-10 cursor-pointer hover:underline">
            Как оформить заказ
          </span>
          <span className="leading-10 cursor-pointer hover:underline">
            Способы оплаты
          </span>
          <span className="leading-10 cursor-pointer hover:underline">
            Доставка
          </span>
          <span className="leading-10 cursor-pointer hover:underline">
            Обратная связь
          </span>
          <span className="leading-10 cursor-pointer hover:underline">
            Подарочные карты
          </span>
        </div>
        <div className={`flex flex-col m-10 ml-0 md:mx-10 xl:mx-20`}>
          <span className="leading-10 border-b border-[#616161] text-xl">
            Оставайтесь на связи
          </span>
          <span className="leading-10">+7 (800)-55-35-35</span>
          <span className="leading-10 cursor-pointer hover:underline">
            Адреса ресторанов
          </span>
          <span className="leading-10 hidden md:block ">
            Следите за новинками и акциями:
          </span>
          <div className={`hidden justify-between items-center md:flex`}>
            <input
              type="e-mail"
              placeholder="Введите e-mail"
              className="outline-none text-black bg-slate-200 p-1 rounded-md focus:rounded-none transition-all "
            />
            <button
              className={`mx-2 bg-slate-200 text-black rounded-md p-1 hover:bg-slate-300 transition`}
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
