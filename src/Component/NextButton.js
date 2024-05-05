// NextButton.js
import React from 'react';

function NextButton({ title, onClick }) {
  return (
    <button
      style={{
        fontSize: '28px',        // 設置字體大小
        padding: '10px 20px',    // 設置內邊距
        backgroundColor: '#007bff',  // 設置背景顏色
        color: '#fff',           // 設置文字顏色
        border: 'none',          // 移除邊框
        borderRadius: '5px',     // 設置圓角
        cursor: 'pointer',       // 添加指針游標
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default NextButton;
