const Users = ({createUser, users}) => {
    return (
        <div>
            <h1>Users ({users.length})</h1>
            <ul>
                {
                    users.map( user => {
                        return (
                            <li key={user.id}>
                                {user.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Users;