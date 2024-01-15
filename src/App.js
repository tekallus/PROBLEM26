import React, { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false); //Bu durum, zamanlayıcının çalışıp çalışmadığını kontrol eder.
  const intervalRef = useRef(); //intervalRef adında bir useRef oluşturuldu. Bu, setInterval tarafından döndürülen ID'yi saklamak için kullanılır.

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000); //Eğer isRunning true ise, setInterval ile bir saniyede bir seconds state'ini güncelleyen bir timer başlatılır.
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true); //Timer'ı başlatmak için
  };

  const handleStop = () => {
    setIsRunning(false); //Timer'ı durdurmak için
  };

  const handleReset = () => {
    setIsRunning(false); // Önce sayacı durdur
    setSeconds(0); //Timer'ı sifirlamak icin
  };

  return (
    <div className="p-12 mx-auto space-y-4 max-w-[300px]">
      <div className="font-bold text-center text-3xl">
        Zamanlayıcı: {seconds}s
      </div>
      <div className="flex justify-between">
        <button onClick={handleStop} className="text-amber-500 font-bold">
          Durdur
        </button>
        <button onClick={handleStart} className="text-green-500 font-bold">
          Başlat
        </button>
        <button onClick={handleReset} className="text-blue-500 font-bold">
          Sıfırla
        </button>
      </div>
    </div>
  );
}
