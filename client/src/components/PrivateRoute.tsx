import { Route, Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
  element: JSX.Element;
  path: string; 
  isAuthenticated: boolean;
}

export default function PrivateRoute({ element, isAuthenticated }: PrivateRouteProps) {
  console.log(isAuthenticated)
  console.log('I am passing through the Dashboard Private Route')
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" replace={true}/>
  );
}