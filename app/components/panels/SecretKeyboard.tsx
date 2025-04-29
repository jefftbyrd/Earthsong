export default function SecretKeyboard() {
  return (
    <>
      <p className="my-5 text-xl text-left">
        Manipulate sounds by hovering your cursor over a sound circle and using
        these keyboard commands:
      </p>
      <div className="flex flex-col gap-7">
        <div className="border-b-1 p-5 border-black/30 ">
          <h3 className="text-xl font-bold mb-2">Change playback speed</h3>
          <div className="grid grid-cols-3 gap-4 items-center w-full md:w-60 mx-auto ">
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                A
              </div>
              <p>slower</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                S
              </div>
              <p>reset</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                D
              </div>
              <p>faster</p>
            </div>
          </div>
        </div>
        <div className="border-b-1 pb-5 mx-6 border-black/30">
          <h3 className="text-xl font-bold mb-2">Toggle playback direction</h3>
          <div className="grid grid-cols-3 gap-4 w-full md:w-60 mx-auto ">
            <div className="flex flex-col items-center justify-center col-start-2">
              <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                R
              </div>
              <p>reverse/forward</p>
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="text-xl font-bold mb-2">
            Change a sound's base volume
          </h3>
          <div className="grid grid-cols-3  gap-4 w-full md:w-60 mx-auto ">
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                Q
              </div>
              <p>quieter</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                W
              </div>
              <p>reset</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                E
              </div>
              <p>louder</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
