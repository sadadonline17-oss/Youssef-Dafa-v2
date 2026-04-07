import { useSearchParams } from "react-router-dom";
import { decodeData } from "@/utils/urlState";
import { useLink, Link } from "./useSupabase";
import { useMemo } from "react";

/**
 * Enhanced hook that retrieves link data either from the URL (stateless)
 * or from the Supabase database (stateful).
 */
export const useLinkData = (linkId?: string) => {
  const [searchParams] = useSearchParams();
  const { data: dbLink, isLoading, isError } = useLink(linkId);

  const encodedData = searchParams.get('d');

  const linkData = useMemo(() => {
    // 1. Try to decode from URL
    const decoded = decodeData<any>(encodedData);

    if (decoded) {
      // Construct a Link object from decoded data
      return {
        id: decoded.id || linkId || 'local',
        type: decoded.type || 'payment',
        country_code: decoded.country || 'SA',
        payload: {
          ...decoded,
          // Map decoded fields to payload structure used in the app
          service_key: decoded.company || decoded.service_key,
          cod_amount: decoded.amount || decoded.cod_amount,
          currency_code: decoded.currency || decoded.currency_code,
          selectedCountry: decoded.country || decoded.selectedCountry,
          payment_method: decoded.paymentMethod || decoded.payment_method,
        },
        status: 'active',
        created_at: new Date(decoded.timestamp || Date.now()).toISOString(),
      } as Link;
    }

    // 2. Fallback to database link
    return dbLink;
  }, [dbLink, encodedData, linkId]);

  return {
    data: linkData,
    isLoading: isLoading && !encodedData, // If we have encoded data, we're not "loading"
    isError: isError && !encodedData,
  };
};
