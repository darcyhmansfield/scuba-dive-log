import { useState } from "react";

const SearchBar = props => {
    const [searchTerm, setSearchTerm] = useState('');

    const _handleSearch = (e) => {
        e.preventDefault();
        props.onSubmit(searchTerm);
    };

    const _handleInput = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <form onSubmit={ _handleSearch }>
            <input type="search" required autoFocus placeholder="Sydney" onInput={ _handleInput } />
            <input type="submit" value="Search" />
        </form>
    )
}

export default SearchBar;