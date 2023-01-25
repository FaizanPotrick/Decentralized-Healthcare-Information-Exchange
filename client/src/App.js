import React from "react";

function App() {
  return (
    <div class="flex justify-center items-center w-full h-screen">
      <div class="flex flex-col justify-around w-full max-w-lg border-2 border-[#0e8f66]/20 shadow-lg rounded-xl bg-[#0e8f66]/[0.15] p-4 md:p-5">
        <div class="flex justify-between items-center">
          <div class="flex flex-col">
            <div class="relative text-[#00553a] text-3xl font-semibold">
              Noteworthy technology acquisitions
              <span class="absolute bottom-3 text-xs font-semibold px-1.5 rounded bg-blue-200 text-blue-800 ml-1">
                PDF
              </span>
            </div>
            <div class="text-lg text-[#00553a]/70 font-medium">
              Faizan Potrick - 45
            </div>
          </div>
          <img class="rounded-t-lg w-28 h-28" src="x-ray.png" alt="product" />
        </div>
        <div class="flex gap-2 my-3 font-semibold">
          <div class="bg-green-200 rounded-xl px-3.5 py-1 text-green-700">
            Cancer
          </div>
          <div class="bg-gray-200 rounded-xl px-3.5 py-1 text-gray-700">
            Diabetes
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-4xl font-bold text-[#00553a]">$599</div>
          <div class="bg-red-200 rounded-lg font-medium px-3.5 py-0.5 text-red-700">
            High
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
