import React, { useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

export default function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);


    const handleInputChange = (event) => {

        console.log(event)
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const { data } = await axios.post('/api/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Register With Your Info</CardTitle>
                    <CardDescription>Registraion</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">UserName</Label>
                                <Input onchange={handleInputChange} id="username" placeholder="Enter your Username" />
                            </div>


                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input onchange={handleInputChange} id="email" placeholder="Enter your Email" />
                            </div>


                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="pass">Password</Label>
                                <Input type="password" onchange={handleInputChange} id="pass" placeholder="Enter Your Password" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Button>Register</Button>
                            </div>

                        </div>

                    </form>
                </CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </div>

    )
}