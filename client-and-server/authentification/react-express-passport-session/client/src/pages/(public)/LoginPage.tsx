import UserService from '../../services/user.service';
import useAuthStore from '../../store/useAuthStore';
import googleLogo from '../../assets/google.svg';

function LoginPage() {
  const { setAuthUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const user = await UserService.login(username, password);
      setAuthUser(user);
    } catch (error) {
      console.error('Login error', error);
      alert('An error occurred. Please try again.');
    }
  };

  function handleGoogleAuth() {
    const authEndpoint = 'http://localhost:3000/v1/auth/google';

    window.open(authEndpoint, '_self');
  }

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input type="text" name="username" required />
        </div>

        <div>
          <label htmlFor="current-password">Password: </label>
          <input
            id="current-password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="login-page__button">
          <button type="submit" style={{ marginTop: '1rem' }}>
            Login
          </button>
          <button type="button" onClick={() => handleGoogleAuth()}>
            <img src={googleLogo} alt="Google logo" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
