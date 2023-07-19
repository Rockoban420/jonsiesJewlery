import React from "react";
import { Button } from "@mui/material";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

const User = () => {
    const { loading, data } = useQuery(QUERY_USER);
    const user = data?.user || {};
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {

  return (
    <div className="container">
        <h2 className="text-center">User Profile</h2>
        <h4> Name:  {user.firstName}</h4>
        <h4> Last Name: {user.lastName}</h4>
        <h4> Email: {user.email}</h4>

        <h2 className="text-center">Update Profile</h2>
        <form
        >
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">First Name</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="First Name" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Last Name</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Last Name" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="email" />
            </div>
        </form>
        <Button type="button" className="btn btn-primary">Update</Button>
        <Button> Delete Account </Button>
    </div>
  );
};

export default User;