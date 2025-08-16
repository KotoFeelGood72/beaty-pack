/// <reference types="@nuxt/types" />
/// <reference types="@nuxtjs/tailwindcss" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Расширение типов для кастомных цветов и размеров
declare module '@nuxt/schema' {
  interface NuxtConfig {
    tailwindcss?: {
      config?: {
        theme?: {
          extend?: {
            colors?: {
              darkGreyBlue?: string
              lightGreyBlue?: string
              brown?: string
              darkBrown?: string
              lightBrown?: string
              grey?: string
              darkGrey?: string
              lightGrey?: string
              green?: string
              dark?: string
            }
            fontSize?: {
              'headline-1'?: [string, string]
              'headline-2'?: [string, string]
              'headline-3'?: [string, string]
              'headline-4'?: [string, string]
              'headline-5'?: [string, string]
              'body-1'?: [string, string]
              'body-2'?: [string, string]
              'body-3'?: [string, string]
              'body-4'?: [string, string]
            }
            fontWeight?: {
              regular?: string
              medium?: string
              semibold?: string
              bold?: string
            }
            borderRadius?: {
              'xs'?: string
              'sm'?: string
              'md'?: string
              'lg'?: string
              'xl'?: string
              '2xl'?: string
              '3xl'?: string
              'full'?: string
              'card'?: string
            }
          }
        }
      }
    }
  }
}





