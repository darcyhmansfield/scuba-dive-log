import { Auth } from '@supabase/auth-ui-react'
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import { supabase } from '/src/config/supabaseClient'
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';



const User_Home_Page = () => {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                // value.data.user
                if (value.data?.user) {
                    console.log(value.data.user);
                    setUser(value.data.user);
                }
            })
        }
        getUserData();
    }, []);

    async function signOutUser() {
        const { error } = await supabase.auth.signOut();
        navigate("/");
    }

    return (
        <div>
            { Object.keys(user) !== 0 ? 
                <div> 
                    <h1>User Home Page coming soon</h1>
                    <button onClick={() => signOutUser()}>Sign Out</button>
                </div>
            :
                <div>
                    <h1>User is not logged in</h1>
                    <button onClick={() => { navigate("/")}}>Go back home!</button>
                </div>
            }
                
        </div>
    )
}

export default User_Home_Page;