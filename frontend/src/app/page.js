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
      <div className="flex flex-col w-2/3 mx-auto h-[640px] bg-white text-primary justify-center items-center">
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
    </main>
  );
}
