import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post('/api/user/register-user', formData);
            console.log(data);
            toast.success("Successfully registered");
            // setLoading(false);
            navigate('/login')
        } catch (e) {
            toast.error(e.response?.data?.message || "Registration failed");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Register With Your Info</CardTitle>
                    <CardDescription>Registration</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">UserName</Label>
                                <Input onChange={handleInputChange} id="username" placeholder="Enter your Username" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input onChange={handleInputChange} id="email" placeholder="Enter your Email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" onChange={handleInputChange} id="password" placeholder="Enter Your Password" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Registering..." : "Register"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
