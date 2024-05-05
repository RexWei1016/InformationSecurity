import React, { useState, useEffect } from 'react';
import Question from './Question';
import Timer from './Timer';
import { formatTime } from '../Function/timeUtils';
function AIProgress({ progress, totalQuestions }) {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0); // 追蹤目前正在進行的問題數
  const [answeredCorrectly, setAnsweredCorrectly] = useState(0); // 已答對的題數
  const [currentTime, setCurrentTime] = useState(0); // 環境計時器
  const [completedTime, setCompletedTime] = useState(null); // 測驗完成時間
  const handleTimeUpdate = (newTime) => {
    setCurrentTime(newTime); // 更新時間狀態
  };
  const questions = [
    {
      id: 1,
      text: "問題 1: 小明有 3 顆蘋果，他又買了 5 顆蘋果回家。請問小明一共有幾顆蘋果？",
      options: ["(A)5", "(B)7", "(C)8", "(D)15"]
    },
    {
      id: 2,
      text: "問題 2: 「一石二鳥」這個成語的意思是？",
      options: ["(A)一次只能做一件事情", "(B)一次做兩件事情", "(C)用石頭打鳥的方法", "(D)雙倍的收穫"],
    },
    {
      id: 3,
      text: "問題 3: 小明有 10 元，他買了一支筆花了 3 元，又買了一本書花了 5 元。請問他還剩下多少錢？",
      options: ["(A)2", "(B)3", "(C)5", "(D)7"]
    },
    {
      id: 4,
      text: "問題 4: 「百聞不如一見」這個成語的意思是？",
      options: ["(A)聽了很多次也不如親眼看一看", "(B)聽了很多事情就能比見到一件事情了解更多", "(C)一次見到比聽很多次更有意義", "(D)見到一次比聽一次更有意義"]
    },
    {
      id: 5,
      text: "問題 5: 植物是如何製造自己的食物的？",
      options: ["(A)透過呼吸作用", "(B)透過光合作用", "(C)透過土壤中的營養吸收", "(D)透過根部吸收水分"]
    },
    {
      id: 6,
      text: "問題 6: 太陽是什麼？",
      options: ["(A)行星", "(B)恆星", "(C)衛星", "(D)彗星"],
    },
    {
      id: 7,
      text: "問題 7: 水的三態中，哪一個態可以看到？",
      options: ["(A)氣態", "(B)液態", "(C)固態", "(D)都可以看到"]
    },
    {
      id: 8,
      text: "問題 8: 小華有 12 元，他花了一半的錢買了一支筆。請問他買筆時花了多少錢？",
      options: ["(A)3", "(B)6", "(C)9", "(D)12"]
    },
    {
      id: 9,
      text: "問題 9: 小明有 5 本書，他買了 3 本新書。請問小明現在總共有幾本書？",
      options: ["(A)5", "(B)6", "(C)7", "(D)8"]
    },
    {
      id: 10,
      text: "問題 10: 小華有 10 支鉛筆，他送了小明一半的鉛筆。請問小華還剩下幾支鉛筆？",
      options: ["(A)2", "(B)3", "(C)5", "(D)10"]
    }
  ];
  
  
  useEffect(() => {
    // 更新目前正在進行的問題數，將初始值設為 1
    setCurrentQuestion(Math.floor((totalQuestions * progress) / 100) || 0);
    if(progress===100){
      setCompletedTime(currentTime); // 保存完成時間
    }
  }, [progress, totalQuestions]);
  
  useEffect(() => {
    // 模擬隨機答對或答錯，只模擬新增的題目
    let correctAnswers = answeredCorrectly// >= 0 ? answeredCorrectly : 0; // 如果 answeredCorrectly >= 0 才從前次的題數開始算
    // for (let i = currentQuestion-1; i < currentQuestion; i++) {
    //   const randomAnswer = Math.random() < 0.9 ? 'correct' : 'incorrect'; // 提高答對機率到70%
    //   if (randomAnswer === 'correct') {
    //     correctAnswers++;
    //   }
    // }
    
    const randomAnswer = Math.random() < 0.9 ? 'correct' : 'incorrect'; // 提高答對機率到70%
    if (randomAnswer === 'correct' && currentQuestion!=0) {
      correctAnswers++;
    }
    // 計算已答對的題數
    setAnsweredCorrectly(correctAnswers);
  }, [currentQuestion]);
  
  useEffect(() => {
    const newScore = (answeredCorrectly) * 5; // 每題得 5 分
    setScore(newScore);
  },[answeredCorrectly])// [currentQuestion, totalQuestions, answeredCorrectly]);
  
  return (
    <div>
      <p>{progress === 100 ? 'AI 已完成作答, 總作答時間: [' + formatTime(completedTime) +'] ': 'AI 作答中...進度：' + progress + '%'}</p>
      <p>{progress === 100 ? '' : '目前已經完成第 ' + (currentQuestion) + ' 題'}</p>
      <p> AI得分：{score}</p>
      {progress < 100 && (
        <Question
          questionId={currentQuestion}
          questionText={questions[currentQuestion].text}
          option1Text={questions[currentQuestion].options[0]}
          option2Text={questions[currentQuestion].options[1]}
          option3Text={questions[currentQuestion].options[2]}
          option4Text={questions[currentQuestion].options[3]}
          handleAnswerChange={() => {}}
          disabled={true}
        />
      )}
      <Timer onTimeUpdate={handleTimeUpdate} show={false} />
    </div>
  );
}

export default AIProgress;
