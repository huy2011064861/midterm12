import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Login from './Login';

export function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Truy cập bị từ chối</h2>
        <p>Bạn cần quyền admin để truy cập trang này.</p>
      </div>
    );
  }

  return children;
}
