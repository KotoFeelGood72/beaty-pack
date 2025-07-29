export const navigation = [
  { label: "Каталог", to: "/shop", submenu: true },
  { label: "О компании", to: "/about", submenu: true },
  { label: "Портфолио", to: "/works", submenu: true },
  { label: "Кейсы", to: "/cases", submenu: true },
  { label: "Отзывы", to: "/reviews", submenu: true },
  { label: "Блог", to: "/blog", submenu: true },
  { label: "Контакты", to: "/contacts", submenu: false },
];

export const submenu = [
  {
    label: "Каталог",
    items: [
      {
        title: "Настольные игры",
        items: [
          {
            label: "Игральные карты",
            to: "/shop/tabletop-games/playing-cards",
          },
          {
            title: "Упаковка",
            items: [
              {
                label: "Конверты",
                to: "/shop/tabletop-games/packaging/envelopes",
                tag: "sale",
              },
              { label: "Коробки", to: "/shop/tabletop-games/packaging/boxes" },
              { label: "Пакеты", to: "/shop/tabletop-games/packaging/bags" },
              { label: "Тубусы", to: "/shop/tabletop-games/packaging/tubes" },
            ],
          },
        ],
      },
      {
        title: "Полиграфия",
        items: [
          { label: "Визитки", to: "/shop/polygraphy/business-cards" },
          { label: "Календари", to: "/shop/polygraphy/calendars" },
          { label: "POS-материалы", to: "/shop/polygraphy/pos-materials" },
          { label: "Папки-фолдеры", to: "/shop/polygraphy/folders" },
          { label: "Листовки", to: "/shop/polygraphy/leaflets" },
          { label: "Флаеры", to: "/shop/polygraphy/flyers" },
          { label: "Буклеты", to: "/shop/polygraphy/booklets" },
          { label: "Блокноты", to: "/shop/polygraphy/notebooks" },
          {
            label: "Тетради",
            to: "/shop/polygraphy/exercise-books",
            tag: "sale",
          },
          { label: "Куб-блоки", to: "/shop/polygraphy/cube-blocks" },
        ],
      },
      {
        title: "Чай, шоколад, конфеты",
        items: [
          { label: "Комплименты", to: "/shop/food/compliments", tag: "new" },
          {
            label: "Конфеты в коробках с логотипом",
            to: "/shop/food/chocolates-with-logo",
          },
          { label: "Наборы шоколада", to: "/shop/food/chocolate-sets" },
          {
            label: "Шоколад и конфеты россыпью",
            to: "/shop/food/loose-chocolates",
          },
          { label: "Чай и кофе", to: "/shop/food/tea-coffee" },
        ],
      },
      {
        title: "Сувенирная продукция",
        items: [
          { label: "Виниловые магниты", to: "/shop/souvenirs/vinyl-magnets" },
          { label: "Носки с логотипом", to: "/shop/souvenirs/socks-with-logo" },
          {
            label: "Магнит с куб-блоком",
            to: "/shop/souvenirs/magnet-cube-block",
          },
          { label: "Адвенты", to: "/shop/souvenirs/advents", tag: "new" },
          { label: "Браслеты", to: "/shop/souvenirs/bracelets" },
        ],
      },
      {
        title: "Широкоформатная печать",
        items: [
          { label: "Роллапы", to: "/shop/wide-format/roll-ups", tag: "sale" },
          {
            label: "Информационные стенды",
            to: "/shop/wide-format/information-stands",
          },
          {
            title: "Интерьерная печать",
            items: [
              { label: "Баннеры", to: "/shop/wide-format/interior/banners" },
              {
                label: "Таблички",
                to: "/shop/wide-format/interior/signs",
                tag: "sale",
              },
            ],
          },
        ],
      },
      {
        title: "Сувениры и подарки на праздники",
        items: [
          { label: "День строителя", to: "/shop/holidays/builders-day" },
          { label: "1 мая", to: "/shop/holidays/may-1" },
          { label: "9 мая", to: "/shop/holidays/may-9" },
          { label: "12 июня", to: "/shop/holidays/june-12" },
          { label: "Новый год", to: "/shop/holidays/new-year", tag: "new" },
          { label: "8 марта", to: "/shop/holidays/march-8", tag: "new" },
          { label: "23 февраля", to: "/shop/holidays/february-23", tag: "new" },
          { label: "День нефтяника", to: "/shop/holidays/oilman-day" },
          {
            label: "День железнодорожника",
            to: "/shop/holidays/railwayman-day",
          },
        ],
      },
    ],
  },
];

export const aboutSubmenu = [
  { label: "О нас", to: "/about" },
  { label: "Кейсы", to: "/cases" },
  { label: "Портфолио", to: "/works" },
  { label: "Печать", to: "/printing" },
  { label: "Отзывы", to: "/reviews" },
  { label: "Реквизиты", to: "/requisites" },
  { label: "Блог", to: "/blog" },
  { label: "Контакты", to: "/contacts" },
];
