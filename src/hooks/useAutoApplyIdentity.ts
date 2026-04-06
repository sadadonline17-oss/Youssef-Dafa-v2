import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  detectEntityFromURL,
  getEntityIdentity,
  applyFullBrandCSS,
  removeDynamicIdentity
} from '@/lib/dynamicIdentity';
import { useLink } from '@/hooks/useSupabase';

export const useAutoApplyIdentity = () => {
  const { id } = useParams();
  const location = useLocation();
  const { data: linkData } = useLink(id);

  useEffect(() => {
    let entity = detectEntityFromURL();

    if (!entity && linkData?.payload) {
      entity = linkData.payload.entity_type || linkData.payload.type || linkData.payload.service_key;
    }

    const urlParams = new URLSearchParams(location.search);
    const entityParam = urlParams.get('entity') || urlParams.get('type') || urlParams.get('company') || urlParams.get('service');
    if (entityParam) {
      entity = entityParam;
    }

    if (entity) {
      const brand = getEntityIdentity(entity);
      if (brand) {
        applyFullBrandCSS(brand);
      }
    }

    return () => {
      removeDynamicIdentity();
    };
  }, [id, linkData, location]);

  const entity = detectEntityFromURL() || linkData?.payload?.entity_type || linkData?.payload?.type || linkData?.payload?.service_key;
  const identity = entity ? getEntityIdentity(entity) : null;

  return { entity, identity };
};

export default useAutoApplyIdentity;
