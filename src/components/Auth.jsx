import { useState } from 'react'
import { supabase } from '../config/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ 
        email: email, 
        password: password 
    });
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login w-full max-w-xs my-5">
        {loading ? (
          'Loading...'
        ) : (
          <form className="bg-slate-400 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input 
              id="email"
              className="inputField shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                required
                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus-ring-indigo-600 sm-text-sm sm:leading-6 mb-2"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="mt-5 bg-yellow-400 hover:bg-orange-700 active:animate-ping text-slate font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
              Login
            </button>
          </form>
        )}
    </div>
  );
}