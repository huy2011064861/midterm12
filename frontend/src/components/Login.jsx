import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Demo usernames
  const demoUsers = [
    { username: 'admin', password: 'admin123', role: 'Admin' },
    { username: 'user', password: 'user123', role: 'User' }
  ];

  const handleDemoLogin = (demoUsername, demoPassword) => {
    setUsername(demoUsername);
    setPassword(demoPassword);
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Đăng Nhập</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              disabled={loading}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </form>

        <div className="demo-section">
          <h3>Tài khoản Demo:</h3>
          {demoUsers.map((user) => (
            <button
              key={user.username}
              className="demo-btn"
              onClick={() => handleDemoLogin(user.username, user.password)}
              disabled={loading}
            >
              {user.role} ({user.username})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
