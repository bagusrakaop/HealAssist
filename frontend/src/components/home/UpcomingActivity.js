import Image from 'next/image'

export default function ActivityContainer() {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="p-4 bg-white border-l-4 border-primary shadow-lg drop-shadow-lg rounded-lg">
        <div className="flex items-center">
          <div className="m-2 mr-8">
            <Image src="/exercise-jogging.png" alt="Jogging" width={95} height={95} />
          </div>
          <div className="flex items-center gap-x-10">
            <div className='text-black'>
              <span className='text-[12px]'>Activity</span> 
              <div className='font-bold text-[20px]'>Jogging</div>
            </div>
            <div className='text-black'>
              <span className='text-[12px]'>Type</span> 
              <div className='font-bold text-[20px]'> Exercise </div>
            </div>
            <div className='text-black'>
              <span className='text-[12px]'> Time</span> 
              <div className='font-bold text-[20px]'> Evening </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <button className="px-10 py-2 hover:bg-green-700 active:bg-green-900 text-white font-bold bg-midgreen rounded">Done</button>
              <button className="px-10 py-2 hover:bg-red-700 active:bg-red-900 text-white font-bold bg-midred rounded">Skip</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
