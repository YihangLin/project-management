import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>
          <span>Email: </span>
          <input
            required
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

        </label>

        <label>
          <span>Password: </span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        {!isPending && <button>Login</button>}
        {isPending && <button disabled>Loading</button>}

        {error && <div className='error'>{error}</div>}

        <div className='redirect'>
          <p>Don't have an account?</p>
          <Link to='/signup'>Sign Up Here!</Link>
        </div>
      </form>
  </div>
  )
}

export default Login;