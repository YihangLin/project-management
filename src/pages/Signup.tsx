import '../scss/Form.scss';

import { useState } from "react";
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [thumbnail, setThumbNail] = useState<File | null>(null);
  const [formError, setFormError] = useState<null | string>(null);
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    signup(name, email, password, thumbnail!);
    // console.log(name, email, password, confirmPassword, thumbnail);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbNail(null);
    let file = e.target.files![0];
    
    // console.log(file);

    if (!file) {
      setFormError('Please select a file.');
      return;
    }

    if (!file.type.includes('image')) {
      setFormError('File must be an image.');
      return;
    }

    if (file.size > 300000) {
      setFormError('Image file must be <= 300kb');
      return;
    }

    setFormError(null);
    setThumbNail(file);

  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label>
          <span>Display Name: </span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

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

        <label>
          <span>Confirm Password: </span>
          <input
            required
            type="password" 
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>

        <label>
          <span>Profile Thumbnail: </span>
          <input
            required
            type="file"
            onChange={handleFileChange}
          />
        </label>

        {!isPending && <button>Sign up</button>}
        {isPending && <button disabled>Loading</button>}

        {formError && <div className='error'>{formError}</div>}
        {error && <div className='error'>{error}</div>}

        <div className='redirect'>
          <p>Already have an account?</p>
          <Link to='/login'>Login Here!</Link>
        </div>

      </form>
    </div>
  )
}

export default Signup;