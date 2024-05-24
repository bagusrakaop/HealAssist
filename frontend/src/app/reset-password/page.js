"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { handleResetPassword } from "@/services/auth.services";

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [formData, setFormData] = useState({
        resetToken: token,
        email: email,
        password: "",
        passwordConfirmation: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
            const res = await handleResetPassword(formData);
            if (res && res.message) {
                console.log(res.message);
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="w-full bg-neutral min-h-screen">
            <div className="flex flex-col items-center py-10">
                <div className="flex flex-col text-primary text-2xl font-bold py-2">
                    Reset Password
                </div>
                <form
                    className="bg-white shadow-md rounded-lg w-2/5 mt-10 p-10"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col justify-between text-black p-1 gap-1">
                        <p className="font-bold">New Password</p>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="input input-xs input-bordered w-full py-4"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col justify-between text-black p-1 gap-1">
                        <p className="font-bold">Confirm New Password</p>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="input input-xs input-bordered w-full py-4"
                            name="passwordConfirmation"
                            value={formData.passwordConfirmation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center w-full">
                        <button className="btn btn-sm btn-primary px-auto my-5">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
