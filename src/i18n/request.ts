import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

async function loadMessages(locale: string) {
  // Import all message files from the locale directory and nest them under their namespace keys
  const messages = {
    common: (await import(`./messages/${locale}/common.json`)).default,
    nav: (await import(`./messages/${locale}/nav.json`)).default,
    header: (await import(`./messages/${locale}/header.json`)).default,
    dashboard: (await import(`./messages/${locale}/dashboard.json`)).default,
    products: (await import(`./messages/${locale}/products.json`)).default,
    productDetails: (await import(`./messages/${locale}/productDetails.json`)).default,
    customers: (await import(`./messages/${locale}/customers.json`)).default,
    orders: (await import(`./messages/${locale}/orders.json`)).default,
    orderDetails: (await import(`./messages/${locale}/orderDetails.json`)).default,
    addOrder: (await import(`./messages/${locale}/addOrder.json`)).default,
    transactions: (await import(`./messages/${locale}/transactions.json`)).default,
    reports: (await import(`./messages/${locale}/reports.json`)).default,
    auditLog: (await import(`./messages/${locale}/auditLog.json`)).default,
    settings: (await import(`./messages/${locale}/settings.json`)).default,
    help: (await import(`./messages/${locale}/help.json`)).default,
    dialogs: (await import(`./messages/${locale}/dialogs.json`)).default,
  };

  return messages;
}

export default getRequestConfig(async () => {
  // Get locale from cookie or default to 'ar'
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'ar';

  return {
    locale,
    messages: await loadMessages(locale)
  };
});
