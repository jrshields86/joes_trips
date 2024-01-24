const Places = ({places}) => {
    return (
        <div>
            <h1>Places({places.length})</h1>
            <ul>
                {
                    places.map(place => {
                        return (
                            <li key={place.id}>
                                {place.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Places;