"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { getUserProfile, editUserProfile } from "@/services/profile.services";
import { sendResetPassword } from "@/services/auth.services";

export default function Profile() {
    const [profile, setProfile] = useState({});
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true); // Add a loading state
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.replace("/");
        }
    }, []);

    useEffect(() => {
        getUserProfile()
            .then((res) => {
                setProfile(res);
                setName(res.name); // Set the initial name value
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { value } = e.target;
        setName(value);
    };

    const handleEditName = async () => {
        let body = {
            username: name,
            name: name,
        };

        try {
            const res = await editUserProfile(body);
            if (res && res.message) {
                toast.success("Name changed");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleSubmit = async () => {
        try {
            let formData = {
                email: profile.email,
            };
            const res = await sendResetPassword(formData);
            if (res && res.message) {
                console.log(res.message);
                toast.success(
                    "Reset password email is send. Please check your email"
                );
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    if (loading) {
        return <div className="bg-white text-primary">Loading...</div>;
    }

    return (
        <main className="w-full bg-neutral min-h-screen">
            <div className="flex flex-col items-center py-10">
                <div className="flex flex-col text-primary text-2xl font-bold py-2">
                    Your Profile
                </div>
                <div className="bg-white shadow-md rounded-lg w-2/5 mt-10 p-10">
                    <div className="flex w-full justify-center mb-10">
                        <Image
                            src="/dummy-profile-picture.svg"
                            alt="Dummy Profpic"
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                    <div className="flex justify-between text-black">
                        <div className="font-bold">Name</div>
                        <div className="flex justify-end">
                            <input
                                type="text"
                                name="name"
                                defaultValue={profile.name}
                                onChange={handleChange}
                                className="text-right"
                            ></input>
                            {/* <div>{profile.name}</div> */}
                            <button
                                className="ml-2"
                                onClick={() => handleEditName()}
                            >
                                <Image
                                    src="/button-edit.svg"
                                    alt="Edit Button"
                                    width={20}
                                    height={20}
                                    priority
                                />
                            </button>
                        </div>
                    </div>
                    <div className="h-0.5 w-full bg-lightgrey my-3"></div>
                    <div className="flex justify-between text-black">
                        <div className="font-bold">Email</div>
                        <div>{profile.email}</div>
                    </div>
                    <div className="h-0.5 w-full bg-lightgrey my-3"></div>
                    <div className="flex justify-between text-black">
                        <div className="font-bold">Age</div>
                        <div>{profile.Health?.age}</div>
                    </div>
                    <div className="h-0.5 w-full bg-lightgrey my-3"></div>
                    <div className="flex justify-between text-black">
                        <div className="font-bold">Gender</div>
                        <div>
                            {profile.Health?.sex === 0 ? "Female" : "Male"}
                        </div>
                    </div>
                    <div className="h-0.5 w-full bg-lightgrey my-3"></div>
                    <div className="flex justify-center w-full">
                        <button
                            className="btn btn-sm btn-primary px-auto my-5"
                            onClick={handleSubmit}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
