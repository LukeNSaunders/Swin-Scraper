export interface UserProps {
  username?: string; 
  email: string; 
  password: string; 
} 

export interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export interface RegisterProps{
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
}

export interface PrivateRouteProps {
  element: JSX.Element;
  path: string; 
  isAuthenticated: boolean;
}
