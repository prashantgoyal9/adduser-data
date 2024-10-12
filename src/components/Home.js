import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!name || !email) {
            alert('Please provide both name and email');
            return;
        }

        const userExists = users.some((user) => user.name === name || user.email === email);

        if (userExists) {
            alert('User with this name or email already exists!');
            return;
        }
        const newUser = { name, email };
        const updatedUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setName('');
        setEmail('');

        alert('User added successfully!');
    };

    const handleDeleteUser = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        alert('User deleted successfully!');
    };


    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };

    return (
        <div className="home-container">
            <h1>Home Page</h1>
            <div className="add-user-section">
                <h2>Add User</h2>
                <form onSubmit={handleAddUser}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter user's name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter user's email"
                        />
                    </div>
                    <button type="submit" className="btn btn-success button-adduser">Add User</button>
                </form>
            </div>
            <div className="view-users-section">
                <h2>View Users</h2>
                {users.length === 0 ? (
                    <p>No users available. Please add a user.</p>
                ) : (
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>
                                <strong>Name:</strong> {user.name} <br />
                                <strong>Email:</strong> {user.email} <br />
                                <button
                                    className="btn btn-danger button-delete"
                                    onClick={() => handleDeleteUser(index)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="logout-section">
                <button className="button button-logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Home;

