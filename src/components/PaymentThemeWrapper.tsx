import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@/themes/ThemeContext';
import { useLink } from '@/hooks/useSupabase';

interface PaymentThemeWrapperProps {
  children: ReactNode;
  defaultCompany?: string;
}

export const PaymentThemeWrapper: React.FC<PaymentThemeWrapperProps> = ({
  children,
  defaultCompany = 'aramex'
}) => {
  const { id } = useParams();
  const { data: linkData } = useLink(id);

  // Get company from multiple sources with priority:
  // 1. URL query parameter 'company'
  // 2. Link data service_key
  // 3. URL path parameter (company in path)
  // 4. Default company
  const urlParams = new URLSearchParams(window.location.search);
  const companyFromQuery = urlParams.get('company');

  // Extract company from path if available (e.g., /pay/company-id/...)
  const pathParts = window.location.pathname.split('/');
  const companyFromPath = pathParts[2] && pathParts[2] !== id ? pathParts[2] : null;

  const serviceKey = companyFromQuery
    || linkData?.payload?.service_key
    || companyFromPath
    || defaultCompany;

  return (
    <ThemeProvider companyId={serviceKey}>
      {children}
    </ThemeProvider>
  );
};

export default PaymentThemeWrapper;
