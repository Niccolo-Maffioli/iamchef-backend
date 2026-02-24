import { useState, useEffect } from 'react'

export interface User {
    id: number
    username: string
    email: string
}

const API_URL = 'http://localhost:8080/users' // punta al tuo backend

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const response = await fetch(API_URL)
                if (!response.ok) throw new Error('Errore nella fetch degli utenti')
                const data: User[] = await response.json()
                setUsers(data)
            } catch (err: unknown) {
                setError((err as Error).message || 'Errore sconosciuto')
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    return { users, loading, error }
}