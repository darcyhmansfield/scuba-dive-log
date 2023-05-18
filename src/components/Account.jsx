import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

export default function Account({ session }) {
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [license, setLicense] = useState('')

    const user = session.user;

    useEffect(() => {
        async function getProfile() {
            setLoading(true);
        
            let { data, error } = await supabase
                .from('User_Information')
                .select(`id, name, country, license`)
                .eq('user_id', user.id)

            console.log(data[0])
            if (error) {
                console.warn(error)
            } else if (data) {
                setId(data[0].id)
                setName(data[0].name)
                setCountry(data[0].country)
                setLicense(data[0].license)
            }
            setLoading(false);
        }
        getProfile();
    }, []);

    async function updateProfile(event) {
        event.preventDefault();

        setLoading(true);

        const updates = {
            id:id,
            name: name,
            country: country,
            license: license,
        }

        let { error } = await supabase
            .from('User_Information')
            .upsert(updates)
            

        console.log(updates)

        if (error) {
            alert(error.message);
        }
        setLoading(false);
    }

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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    required
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="relative mt-2 rounded-md shadow-sm">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                    Country
                </label>
                <input
                    type="text"
                    value={country || ''}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            <div className="relative mt-2 rounded-md shadow-sm">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="license">
                    License
                </label>
                <input
                    type="text"
                    value={license || ''}
                    onChange={(e) => setLicense(e.target.value)}
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