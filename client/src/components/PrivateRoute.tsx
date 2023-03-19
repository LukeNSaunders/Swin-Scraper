import {Navigate } from 'react-router-dom';
import { PrivateRouteProps } from '../types';

export default function PrivateRoute({ element, isAuthenticated }: PrivateRouteProps) {

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" replace={true}/>
  );
}