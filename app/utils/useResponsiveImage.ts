import { useMediaQuery } from "@vueuse/core";

/**
 * Утилита для работы с адаптивными изображениями
 * Возвращает подходящее изображение в зависимости от размера экрана
 */
export const useResponsiveImage = () => {
  // Определяем тип устройства с помощью useMediaQuery
  // Используем более точные брейкпоинты, соответствующие Tailwind
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  /**
   * Получить подходящее изображение на основе размера экрана
   * @param images - объект с изображениями для разных размеров экрана
   * @returns подходящее изображение
   */
  const getResponsiveImage = (images: {
    mobile?: string;
    tablet?: string;
    desktop: string;
  }) => {
    // Проверяем, что мы на клиенте и медиа-запросы доступны
    if (process.client) {
      if (isMobile.value && images.mobile) {
        return images.mobile;
      }
      if (isTablet.value && images.tablet) {
        return images.tablet;
      }
    }
    return images.desktop;
  };

  /**
   * Получить изображение для мобильного или десктопа
   * @param mobileImage - изображение для мобильных устройств
   * @param desktopImage - изображение для десктопа
   * @returns подходящее изображение
   */
  const getImage = (mobileImage: string, desktopImage: string) => {
    // Проверяем, что мы на клиенте и медиа-запросы доступны
    if (process.client && isMobile.value) {
      return mobileImage;
    }
    return desktopImage;
  };

  /**
   * Получить массив изображений для слайдера
   * @param images - массив объектов с изображениями для разных размеров экрана
   * @returns массив подходящих изображений
   */
  const getResponsiveImages = (images: Array<{
    mobile?: string;
    tablet?: string;
    desktop: string;
    alt?: string;
  }>) => {
    return images.map(image => ({
      src: getResponsiveImage(image),
      alt: image.alt || 'Image'
    }));
  };

  return {
    isMobile,
    isTablet,
    isDesktop,
    getResponsiveImage,
    getImage,
    getResponsiveImages
  };
};
