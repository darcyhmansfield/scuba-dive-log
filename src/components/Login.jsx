import { Auth } from '@supabase/auth-ui-react'
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  'https://wgpigjfrywpnomybyqqj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncGlnamZyeXdwbm9teWJ5cXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4NjI2MzcsImV4cCI6MTk5OTQzODYzN30.NIcn8d3rC_BbdqKM65LNufeAUWIPzeJJgvB7JDKA5ZU'
)

const Login = () => {

  const navigate = useNavigate();
  
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
  });

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