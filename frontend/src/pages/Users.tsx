import { useUsers } from '../hooks/useUsers'

const Users = () => {
    const { users, loading, error } = useUsers()

    if (loading) return <p>Caricamento utenti...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Lista utenti</h2>
            <ul className="space-y-2">
                {users.map(user => (
                    <li key={user.id} className="p-2 bg-gray-100 rounded">
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Users