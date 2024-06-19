// import { useSelector } from 'react-redux';
// import { Outlet, Navigate } from 'react-router-dom';

// export default function PrivateRoute() {
//   const { currentUser } = useSelector((state) => state.user);
//   return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
// }
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Navigate to={`/sign-in`} />;
}
