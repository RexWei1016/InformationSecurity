import React, { useState } from 'react';
import './Question.css'; // 引入問題元件的 CSS 檔案

function Question({ questionId, question, type, options, imageSrc, handleAnswerChange, handleCheckboxChange }) {
  const defaultRangeValue = options && options.min ? options.min : 0;
  const [rangeValue, setRangeValue] = useState(defaultRangeValue);
  const renderInput = () => {
    switch (type) {
      case 'radio':
        return (
          <div className="options-container radio-container"> {/* 添加 CSS 樣式 */}
            {options.map((option, index) => (
              <div key={index} className="option-item"> {/* 添加類以設置單選項目的樣式 */}
                <input
                  type="radio"
                  id={`option--${questionId}-${index}`}
                  name={`option--${questionId}`}
                  value={option}
                  onChange={(event) => handleAnswerChange(questionId, event.target.value)}
                />
                <label htmlFor={`option--${questionId}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'number':
        return (
          <input
            type="number"
            onChange={(event) => handleAnswerChange(questionId, event.target.value)}
          />
        );
      case 'checkbox':
        return (
          <div className="options-container checkbox-container"> {/* 添加 CSS 樣式 */}
            {options.map((option, index) => (
              <div key={index} className="option-item"> {/* 添加類以設置多選項目的樣式 */}
                <input
                  type="checkbox"
                  id={`option-${index}`}
                  name={`question-${questionId}`}
                  value={option}
                  onChange={(event) => handleCheckboxChange(questionId, event.target.checked, option)}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
        
      case 'text':
        // 如果 options 不存在或為空，則不顯示
        return options ? (
          <div className="options-container"> {/* 添加 CSS 樣式 */}
            <h3>{options}</h3>
          </div>
        ) : null;
        

      case 'range':
        return (
          <div className="options-container range-container">
            <input
              type="range"
              min={options.min}
              max={options.max}
              step={options.step}
              value={rangeValue}
              onChange={(event) => {
                setRangeValue(event.target.value);
                handleAnswerChange(questionId, event.target.value);
              }}
            />
            <span>{rangeValue}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {imageSrc && <img src={imageSrc} alt={`Question ${questionId}`} />} {/* 如果 imageSrc 存在則顯示圖片 */}
      {question && <h2>{questionId ? `【${questionId}】` : ''} {question}</h2>} {/* 如果 question 存在並且 questionId 存在則顯示問題 */}
      {renderInput()}
    </div>
  );
}

export default Question;
