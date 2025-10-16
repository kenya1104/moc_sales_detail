import { useState } from "react";
import UserSelection from "./components/UserSelection";
import CustomerDashboard from "./components/CustomerDashboard";
import SalesDashboard from "./components/SalesDashboard";
import AdminDashboard from "./components/AdminDashboard";

type UserType = 'customer' | 'sales' | 'admin' | null;

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserType>(null);

  const handleUserSelect = (userType: UserType) => {
    setCurrentUser(userType);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (currentUser === null) {
    return <UserSelection onUserSelect={handleUserSelect} />;
  }

  switch (currentUser) {
    case 'customer':
      return <CustomerDashboard onLogout={handleLogout} />;
    case 'sales':
      return <SalesDashboard onLogout={handleLogout} />;
    case 'admin':
      return <AdminDashboard onLogout={handleLogout} />;
    default:
      return <UserSelection onUserSelect={handleUserSelect} />;
  }
}