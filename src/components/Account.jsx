import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

export default function Account({ session }) {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(true);
    const [website, setWebsite] = useState(null);

    console.log(session)

    useEffect(() => {
        async function getProfile() {
            setLoading(true);
            const { user } = session;

            let { data, error } = await supabase
                .from('profiles')
                .select(`username, website`)
                .eq('id', user.id)
                .single()

            if (error) {
                console.warn(error)
            } else if (data) {
                setUsername(data.username)
                setWebsite(data.website)
            }

            setLoading(false);
        }

        getProfile();
    }, [session]);

    async function updateProfile(event) {
        event.preventDefault();

        setLoading(true);

        const updates = {
            id: session.user.id,
            username,
            website,
            updated_at: new Date()
        }

        let { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
            alert(error.message);
        }
        setLoading(false);
    }

    // const handleLogout = () => {
    //     supabase.auth.signOut();
    //     setUser('');
    // }

    return (
        <form className="w-full max-w-xs m-auto" onSubmit={updateProfile}>
            <div className="relative mt-2 rounded-md shadow-sm">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="text"
                    value={session.user.email}
                    disabled
                />
            </div>
            <div className="relative mt-2 rounded-md shadow-sm">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Name
                </label>
                <input
                    type="text"
                    required
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="relative mt-2 rounded-md shadow-sm">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                    Website
                </label>
                <input
                    type="text"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div className="mt-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Update'}
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>
        </form>
    )
}