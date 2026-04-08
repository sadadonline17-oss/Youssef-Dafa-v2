import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resolveEntity, PaymentEntityConfig } from '@/config/gccPaymentEntities';

export const usePaymentEntity = (): PaymentEntityConfig => {
  const [searchParams] = useSearchParams();

  const companyKey = searchParams.get('company') || searchParams.get('service') || '';

  const config = useMemo(() => {
    return resolveEntity(companyKey);
  }, [companyKey]);

  return config;
};
