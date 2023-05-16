import { Auth } from '@supabase/auth-ui-react'
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom';
import { supabase } from '/src/config/supabaseClient'
import { useEffect } from 'react';

const Login = () => {

  const navigate = useNavigate();

  
  
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        console.log(event)
        // forward to success URL
        console.log("navigating");
        navigate("/userhome");
      } else {
        // forward to localhost
        navigate("/");
      }
    })
  }, [])

  return (
    <div>
      <p>Login</p>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={["github", "google"]}
      />
    </div>
  )
}

export default Login;