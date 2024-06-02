"use client";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { handleResetPassword } from "@/services/auth.services";

function ResetPasswordContent() {
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
                toast.success("Password reset successfully. Please login");
                router.push("/");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
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
    );
}

export default function ResetPassword() {
    return (
        <main className="w-full bg-neutral min-h-screen">
            <div className="flex flex-col items-center py-10">
                <div className="flex flex-col text-primary text-2xl font-bold py-2">
                    Reset Password
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <ResetPasswordContent />
                </Suspense>
            </div>
        </main>
    );
}