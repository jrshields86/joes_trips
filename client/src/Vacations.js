const Vacations = ({vacations, places, users}) => {
    console.log(vacations)
    return (
        <div>
            <h1>Vacations</h1>
            <ul>
                {
                    vacations.map(vacation => {
                        const place = places.find(place => place.id === vacation.place_id)
                        const user = users.find(user => user.id === vacation.user_id)
                        console.log(user)
                        return (
                            <li key={vacation.id}>
                                <div>
                                    {user ? user.name : ''} is going to
                                    <br/>
                                    {place ? place.name : ''}
                                </div>
                                <p>
                                    {vacation.note}
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Vacations;