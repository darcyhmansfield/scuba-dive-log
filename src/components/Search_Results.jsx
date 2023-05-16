

const SearchResults = (props) => {

    // console.log(props.results.data[0].name)

    return (
        <table style={{ width: 500 }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Region</th>
                    <th>Ocean</th>
                </tr>
            </thead>
            <tbody>
                {props.results.data.map((location) => (
                    <tr>
                        <td>{location.name.replace('&#039;',"'")}</td>
                        <td>{location.region}</td>
                        <td>{location.ocean}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        // <div>
        //     {props.results.data.map((location) => (
        //         <p>{location.name}</p>

        //     ))}
        // </div>
    )
}

export default SearchResults;