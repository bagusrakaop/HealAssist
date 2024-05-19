import Image from "next/image";

export default function Profile() {
  return (
    <main className="w-full bg-neutral min-h-screen">
      <div className="flex flex-col items-center py-10">
        <div className="flex flex-col text-primary text-2xl font-bold py-2">Your Profile</div>
        <div className="bg-white shadow-md rounded-lg w-2/5 mt-10 p-10">
          <div className="flex w-full justify-center mb-10">
            <Image src="/dummy-profile-picture.svg" alt="Dummy Profpic" width={100} height={100} priority />
          </div>
          <div className="flex justify-between text-black">
            <div className="font-bold">Name</div>
            <div className="flex justify-end">
              <div>Namanya</div>
              <button className="ml-2">
                <Image src="/button-edit.svg" alt="Edit Button" width={20} height={20} priority />
              </button>
            </div>
          </div>
          <div className="h-0.5 w-full bg-lightgrey my-3"></div>
          <div className="flex justify-between text-black">
            <div className="font-bold">Email</div>
            <div>Email@gmail</div>
          </div>
          <div className="h-0.5 w-full bg-lightgrey my-3"></div>
          <div className="flex justify-between text-black">
            <div className="font-bold">Age</div>
            <div>100</div>
          </div>
          <div className="h-0.5 w-full bg-lightgrey my-3"></div>
          <div className="flex justify-between text-black">
            <div className="font-bold">Gender</div>
            <div>Male</div>
          </div>
          <div className="h-0.5 w-full bg-lightgrey my-3"></div>
          <div className="flex justify-center w-full">
            <button className="btn btn-sm btn-primary px-auto my-5">Reset Password</button>
          </div>
        </div>
      </div>
    </main>
  );
}
