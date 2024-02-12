import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

export default function Nav() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/teams">Teams</Link>
        {
          Auth.loggedIn()
          ?
          <div>
            <Link to="/dashboard">Your Dashboard</Link>
            <a href="/" id="logout" onClick={() => Auth.logout()}>Logout</a>
          </div>

          :
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        }
      </nav>
    </>
  );
}