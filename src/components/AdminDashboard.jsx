import { useSelector } from 'react-redux';
import AccommodationList from './AccommodationList';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { role } = useSelector((state) => state.user);

  if (role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/add-accommodation">Add Accommodation</Link>
      <AccommodationList />
    </div>
  );
};

export default AdminDashboard;
