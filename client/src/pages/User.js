import React, { useState } from "react";
import { Button } from "@mui/material";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER, DELETE_USER } from "../utils/mutations";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const User = () => {
    const { loading, data } = useQuery(QUERY_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const user = data?.user || {};
    const userId = Auth.getProfile().data._id;

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const { data } = await deleteUser({
                variables: {
                    id: userId,
                },
            });
            console.log(data);
            Auth.logout();
            window.location.assign("/");
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await updateUser({
                variables: {
                    firstName: formState.firstName,
                    lastName: formState.lastName,
                    email: formState.email,
                },
            });
            console.log(data);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };


  return (
    <div className="container">
        <h2 className="text-center">User Profile</h2>
        <h4> Name:  {user.firstName}</h4>
        <h4> Last Name: {user.lastName}</h4>
        <h4> Email: {user.email}</h4>

        <h2 className="text-center">Update Profile</h2>
        <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label>First Name</label>
                <input 
                type="text" 
                name="firstName"
                value={formState.firstName} 
                onChange={handleChange}
                className="form-control" 
                placeholder="First Name" 
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input 
                type="text"
                name="lastName"
                value={formState.lastName} 
                onChange={handleChange}
                className="form-control" 
                placeholder="Last Name" 
                />
            </div>
            <div className="form-group">
                <label>Email address</label>
                <input 
                type="email" 
                name="email"
                value={formState.email} 
                onChange={handleChange}
                className="form-control" 
                placeholder="email" 
                />
            </div>
        <Button type="submit"  className="btn btn-primary">Update</Button>
        </form>
        <Button onClick={handleDelete} > Delete Account </Button>
    </div>
  );
};

export default User;