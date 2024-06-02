import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { sendResetPassword } from "@/services/auth.services";

const ForgotPasswordModal = forwardRef((props, ref) => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
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

    return (
        <>
            <dialog id="forgot_password" ref={ref} className="modal">
                <div className="modal-box max-w-fit p-0 rounded-md bg-neutral text-primary">
                    <div className="flex justify-end m-1">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost">
                                ✕
                            </button>
                        </form>
                    </div>
                    <div className="grid grid-cols-2 gap-5 mx-10">
                        <div>
                            <Image
                                src="/illustration-robot-signin.svg"
                                alt="Robot with Sign In Illustration"
                                objectPosition="bottom"
                                width={300}
                                height={300}
                                priority
                            />
                        </div>
                        <div className="bg-white my-0 flex flex-col gap-1 p-4 mb-10 place-content-center">
                            <p className="text-3xl font-bold">
                                Forgot Password
                            </p>
                            <p className="text-xs">
                                Enter your registered email below and we&rsquo;ll send
                                <br />a link to reset your password.
                            </p>
                            <div className="pt-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="text-xs flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold">Email</p>
                                            <input
                                                type="email"
                                                placeholder="YourEmail@domain.com"
                                                className="input input-xs input-bordered w-full max-w-xs py-4"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex justify-center">
                                            <button className="btn btn-sm btn-primary w-full">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
});

ForgotPasswordModal.displayName = 'ForgotPasswordModal';

export default ForgotPasswordModal;