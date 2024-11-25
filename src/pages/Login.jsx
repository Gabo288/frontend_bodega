import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/api.js'

const Login = () => {
    const [mail, setEmail] = useState('')
    const [clave, setClave] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const response = await authService.login(mail, clave)
            console.log('Login successful:', response.data)
            localStorage.setItem('token', response.data.token)
            navigate('/')
        } catch (err) {
            setError(
                'Error al iniciar sesión. Por favor, verifica tus credenciales.'
            )
            console.error('Login error:', err)
        }
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center">Iniciar sesión</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={mail}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Contraseña:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                    <div className="mt-3 text-center">
                        <Link to="/" className="btn btn-link">
                            Volver a Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
