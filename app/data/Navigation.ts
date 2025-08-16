export const navigation = [
  { label: "Каталог", to: "/shop", submenu: true, isAbout: false },
  { label: "О компании", to: "/about", submenu: true, isAbout: true },
  { label: "Портфолио", to: "/works", submenu: false, isAbout: false },
  { label: "Кейсы", to: "/cases", submenu: false, isAbout: false },
  { label: "Отзывы", to: "/reviews", submenu: false, isAbout: false },
  { label: "Блог", to: "/blog", submenu: false, isAbout: false },
  { label: "Контакты", to: "/contacts", submenu: false, isAbout: false },
];

export const aboutSubmenu = [
  { label: "О нас", to: "/about" },
  { label: "Кейсы", to: "/cases" },
  { label: "Портфолио", to: "/works" },
  { label: "Печать", to: "/shop/printing" },
  { label: "Отзывы", to: "/reviews" },
  { label: "Реквизиты", to: "/" },
  { label: "Блог", to: "/blog" },
  { label: "Контакты", to: "/contacts" },
];
