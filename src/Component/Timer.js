import React, { useState, useEffect } from 'react';
import './Timer.css'; // 引入 CSS 樣式文件

function Timer({ onTimeUpdate, show }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        const newTime = prevTime + 1;
        onTimeUpdate(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return show ? (
    <div className="timer-container">
      <div className="clock-icon">&#128340;</div>
      <div className="time">{formatTime(time)}</div>
    </div>
  ) : null;
}

// 格式化時間的函數，將秒數轉換為時分秒格式
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}

// 補零函數，將單位數字補零
function pad(num) {
  return num.toString().padStart(2, '0');
}

export default Timer;
