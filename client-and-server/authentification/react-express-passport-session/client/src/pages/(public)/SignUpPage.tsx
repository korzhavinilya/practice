import UserService from '../../services/user.service';
import useAuthStore from '../../store/useAuthStore';

function SignUpPage() {
  const { setAuthUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const user = await UserService.signup(username, password);
      setAuthUser(user);
    } catch (error) {
      console.error('Registration error', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Sign Up Page</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input type="text" name="username" required />
        </div>

        <div>
          <label htmlFor="new-password">Password: </label>
          <input
            id="new-password"
            type="password"
            name="password"
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
