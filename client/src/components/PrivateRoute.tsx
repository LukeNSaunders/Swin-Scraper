import {Navigate } from 'react-router-dom';
import { PrivateRouteProps } from '../types/route';

export default function PrivateRoute({ element, isAuthenticated }: PrivateRouteProps) {

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" replace={true}/>
  );
}