import type common from './messages/en/common.json';

type Messages = typeof common;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
