import { useEffect, useState } from 'react';
import '../styles/loginpage.css';
import { useNavigate } from 'react-router-dom';
import NotAuthnav from '../components/notauthnav';
import { isAuthenticated } from '../../util';
import { handleError, handleSuccess } from '../../util.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

        e.preventDefault();
        const loginInfo = { 
          email: email,
          password: password
        }
        if (!email || !password) {
            return handleError('Email and Password are required')
        }
        try {
            const url = `your_backend_base_url/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, user, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('handle',user.handlename);
                localStorage.setItem('bookmarks',JSON.stringify(user.bookmarks));
                setTimeout(() => {
                    navigate('/profile')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
  };

  useEffect(()=>{
    {isAuthenticated() ? navigate('/profile') : ''}
  },[navigate])



  return (

    <>
    <NotAuthnav/>
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome back to <span className="brand">ZCoder</span></h2>
          <p>Log in to continue your coding journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form" >
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="coder@example.com"
              required
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          
          
          <button type="submit" className="auth-button">Log In</button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;