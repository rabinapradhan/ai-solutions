import { useAuth } from "../context/AuthContext";
import AccessDenied from "./AccessDenied";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <AccessDenied />;
}
