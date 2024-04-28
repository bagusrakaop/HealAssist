import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full bg-white min-h-screen">
      {/* top of landing page */}
      <div className="flex h-[480px] bg-neutral text-primary items-center justify-center">
        <div className="w-1/3">
          <div className="text-xs">For a Better Quality of Life</div>
          <div className="flex text-5xl">
            <p className="font-bold">Heal</p>Assist
          </div>
          <div className="text-3xl">Present for you</div>
          <div>with the power of AI, we helps you live a healthy routine and prevents you from cardiovascular disease</div>
          <button className="btn btn-primary mt-5">Our Features</button>
        </div>
        <Image className="items-center right-0" src="/robot-1.svg" alt="Diagbostic Robot" width={480} height={480} priority />
      </div>
      {/* Cardiovascular Disease Case Information */}
      <div className="flex flex-col w-2/3 mx-auto mt-24 mb-12 bg-white text-primary justify-center items-center">
        <div className="text-3xl font-extrabold mb-10">Did you Know??</div>
        <div className="flex py-5">
          <div className="flex mx-10">
            <Image className="mr-2 -translate-y-2" src="/illustration-stroke.svg" alt="Stroke Illustration" width={72} height={72} priority />
            <div>
              <p className="font-bold text-2xl">331,349</p>
              <p className="text-xs">
                Deaths Caused <br /> by Stroke
              </p>
            </div>
          </div>
          <div className="flex mx-10">
            <Image className="mr-2" src="/illustration-coronary-heart.svg" alt="Coronary Heart Illustration" width={64} height={64} priority />
            <div>
              <p className="font-bold text-2xl">245,343</p>
              <p className="text-xs">
                Deaths Caused <br /> by Coronary Heart
              </p>
            </div>
          </div>
          <div className="flex mx-10">
            <Image className="mr-2" src="/illustration-hypertensive-heart.svg" alt="Hypertensive Heart Illustration" width={64} height={64} priority />
            <div>
              <p className="font-bold text-2xl">50,620</p>
              <p className="text-xs">
                Deaths Caused <br /> by Hypertensive Heart
              </p>
            </div>
          </div>
        </div>
        <div className="text-center my-10">
          <p className="font-bold">
            Currently, heart and blood vessel disease or cardiovascular disease is still the highest cause of death in the world. WHO states that more than 17 million people in the world die from
            heart and blood vessel disease. Meanwhile, deaths in Indonesia due to cardiovascular disease reached 651,481 people per year, consisting of stroke 331,349 deaths, coronary heart disease
            245,343 deaths, hypertensive heart disease 50,620 deaths, and other cardiovascular diseases (Institute for Health Matrics and Evaluation, 2019).{" "}
          </p>
          <br />
          <p className="text-xs">Quoted from sehatnegeriku.kemkes.go.id</p>
        </div>
      </div>
      {/* Features Preview */}
      <div className="flex flex-col w-2/3 mx-auto h-[640px] bg-white text-primary items-center">
        <div className="font-bold mb-12">OUR FEATURES</div>
        {/* Personalized Account */}
        <div className="w-full">
          <div className="font-extrabold text-xl text-center mb-8">Different Personal, Different Health Profile, Different Recommendations</div>
          <div className="flex justify-between">
            <div>
              <Image src="/pict-persona-1.svg" alt="Persona 1 (Sarah)" width={164} height={164} priority />
              <div className="text-black">
                <div className="font-extrabold">Sarah Johnson</div>
                <div className="text-sm">
                  Athlete
                  <br />
                  Female, 26 y/o
                </div>
              </div>
            </div>
            <div>
              <Image src="/pict-persona-2.svg" alt="Persona 2 (Michael)" width={164} height={164} priority />
              <div className="text-black">
                <div className="font-extrabold">Michael Davis</div>
                <div className="text-sm">
                  Office Worker
                  <br />
                  Male, 30 y/o
                </div>
              </div>
            </div>
            <div>
              <Image src="/pict-persona-3.svg" alt="Persona 3 (Emily)" width={164} height={164} priority />
              <div className="text-black">
                <div className="font-extrabold">Emily Chen</div>
                <div className="text-sm">
                  College Student
                  <br />
                  Female, 21 y/o
                </div>
              </div>
            </div>
            <div>
              <Image src="/pict-persona-4.svg" alt="Persona 4 (Sam)" width={164} height={164} priority />
              <div className="text-black">
                <div className="font-extrabold">Sam Kolder</div>
                <div className="text-sm">
                  Outdoor Worker
                  <br />
                  Male, 43 y/o
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center my-10 w-4/5 mx-auto">
            <Image src="/illustration-personalized-account.svg" alt="Personalized Account Illustration" width={192} height={192} priority />
            <div className="mx-10">
              <div className="text-xl">
                <b>Whoever you are,</b> we are ready with
              </div>
              <div className="text-3xl font-extrabold">Personalized Account</div>
              <div className="text-xl">Create an account according to your health profile and condition to get food and exercise recommendations that are suitable for you</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
