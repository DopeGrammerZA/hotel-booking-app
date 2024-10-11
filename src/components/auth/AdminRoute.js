import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { role } = useSelector((state) => state.user);

  if (role !== 'admin') {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default AdminRoute;
        