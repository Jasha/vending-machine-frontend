import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { USER_ROLES } from 'utils/constants';
import { getDecodedToken } from 'utils/tokenService';

import LazyElement from './LazyElement';

interface IProtectedElementProps {
  Component: React.FC;
  isForSeller?: boolean;
}

const ProtectedElement: React.FC<IProtectedElementProps> = ({
  Component,
  isForSeller,
}: IProtectedElementProps) => {
  const location = useLocation();
  const claims = getDecodedToken();

  if (!claims) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isForSeller && claims.role !== USER_ROLES.SELLER) {
    return <Navigate to="/" replace />;
  }

  if (!isForSeller && claims.role === USER_ROLES.SELLER) {
    return <Navigate to="/products" replace />;
  }

  return <LazyElement Component={Component} />;
};

ProtectedElement.defaultProps = {
  isForSeller: false,
};

export default ProtectedElement;
