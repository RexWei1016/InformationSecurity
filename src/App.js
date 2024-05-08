import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // 引入React Modal庫
import './App.css';
import Question from './Component/Question';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 樣式

// 在使用React Modal之前 需要設置其在DOM中的位置
Modal.setAppElement('#root');

function App() {
  const [answers, setAnswers] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false); // 控制彈出視窗的開關
  const [totalQuestions, setTotalQuestions] = useState(20);
  const [currentPage, setCurrentPage] = useState(0); // 當前顯示的頁面索引
  const [submitted, setSubmitted] = useState(false); // 新增已提交答案的狀態
  const totalSections = 4;// 4個部分
  
  const [randomValue, setRandomValue] = useState(null); // 存儲隨機值

  // 在頁面載入時生成隨機值
  useEffect(() => {
    generateRandomValue();
  }, []);
  useEffect(() => {
    // 在每次 currentPage 改變時將滾動條置於頂部
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  const generateRandomValue = () => {
    const random = Math.floor(Math.random() * 3) + 1; // 產生 1、2 或 3 的隨機值
    setRandomValue(random);
  };
  
  // useEffect(() => {
  //   // 每次answers狀態發生改變時更新已回答問題數量
  //   // console.log('len:'+Object.keys(answers).length+'/'+totalQuestions);
  //   setAnsweredQuestions(Object.keys(answers).length);
  
  //   // 在這裡直接使用最新的已回答問題數量來判斷是否超過一半
  //   if (Object.keys(answers).length > totalQuestions / 2) {
  //     console.log('show:' +totalQuestions/2);
  //     toggleModal();
  //   }
  // }, [answers]);
  

  const handleAnswerChange = (questionId, answer) => {
    // console.log(questionId + "f:"+answer)
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  // 處理多選的變化
  const handleCheckboxChange = (questionId, isChecked, option) => {
    setAnswers(prevAnswers => {
      if (isChecked) {
        // 如果被勾選 將選項添加到答案中
        return {
          ...prevAnswers,
          [questionId]: [...(prevAnswers[questionId] || []), option]
        };
      } else {
        // 如果取消勾選 將選項從答案中移除
        return {
          ...prevAnswers,
          [questionId]: (prevAnswers[questionId] || []).filter(item => item !== option)
        };
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 檢查是否所有問題都已經回答
    if(Object.keys(answers).length !== totalQuestions) {
      alert('請確保所有問題都已經回答完畢！');
      return;
    }
    // console.log(JSON.stringify(answers));
    // 將答案提交到後端
    fetch('https://script.google.com/macros/s/AKfycbxI7FFV1TvLA5v0gibB81fjE08tgNWgDQwejZnyIYJmd8Z_GwLa0iq14DPKC2QCc8So/exec', {
      method: 'POST',
      body: JSON.stringify(answers)
    })
      .then(response => {
        if (response.ok) {
          // console.log('Answers submitted successfully');
          setSubmitted(true); // 提交成功後更新狀態
        } else {
          // console.error('Failed to submit answers');
        }
      })
      .catch(error => {
        //console.error('Error submitting answers:', error);
      });
      
      setSubmitted(true); // 提交成功後更新狀態
  };
  // 處理頁面切換
  const handlePageChange = (page) => {
    if (page < 0 || page >= totalSections) {
      return; // 如果page不在有效範圍內，不進行操作
    }

    // 檢查當前部分的問題是否已回答
    const currentSectionQuestions = questions.filter(question => question.section === currentPage + 1);
    const isAllAnswered = currentSectionQuestions.every(question => {
      const isTextQuestion = question.type === "text"; // 判斷是否為文字題
      const isAnswered = isTextQuestion || answers.hasOwnProperty(question.id); // 非文字題或已回答的題目
      // console.log('檢查目標:', question.question, '檢查結果:', isAnswered);
      return isAnswered;
    });

    if (!isAllAnswered) {
      // console.log('請完成本節所有問題後再繼續！');
      alert('請完成本區塊所有問題後再繼續！')
      return; // 如果當前section的問題未全部回答，則不允許翻頁
    }

    if(page === 1){
      setTimeout(() => {
        toggleModal();
      }, 3000); // 延遲三秒後執行 toggleModal 函數
    }

    setCurrentPage(page); // 更新頁面
  };

  // 開關彈出視窗的函數
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // 繼續填寫
  const continueFilling = () => {
    toggleModal(); // 關閉彈出視窗
    handleAnswerChange('0',randomValue)
  };

  // 稍後再填寫
  const fillLater = () => {
    toggleModal(); // 關閉彈出視窗
    // 可以在這裡執行其他相關操作
  };

  const questions = [
    {
      section: 1,
      question:"防毒軟體",
      type:"text",
      options:"請看仔細看著這個圖片，接下來回答下面的問題",
      imageSrc:process.env.PUBLIC_URL + '/images/img01.png'}
    ,
    {
      section: 1,
      id: 1,
      question: "我預期這個產品的功能是優良的",
      type: "radio",
      options: ['非常同意', '同意', '普通', '不同意', '非常不同意']
    },
    {
      section: 1,
      id: 2,
      question: "我預期這個產品的功能是穩定的",
      type: "radio",
      options: ['非常同意', '同意', '普通', '不同意', '非常不同意']
    },
    {
      section: 1,
      id: 3,
      question: "我預期這個產品可以有效的防毒",
      type: "radio",
      options: ['非常同意', '同意', '普通', '不同意', '非常不同意']
    },
    {
      section: 1,
      id: 4,
      question: "我預期這個產品是有價值的",
      type: "radio",
      options: ['非常同意', '同意', '普通', '不同意', '非常不同意']
    },
    // {
    //   section: 2,
    //   id: 5,
    //   question: "請問 SafeCam for PC的功能在哪些系統當中可以使用?",
    //   options: ['Windows', 'Mac OS ', '兩者都可以'],
    //   type: "radio",
    //   imageSrc:process.env.PUBLIC_URL + '/images/img02.jpg'
    // },
    {
      section: 2,
      id: 5,
      question: "關於系統需求的描述，該產品提到那些有關裝置安全的系統說明?",
      type: "checkbox",
      options: ['Windows', 'Mac', 'Linux', 'Android', 'IOS'],
      imageSrc:process.env.PUBLIC_URL + '/images/img03.png'
    },
    {
      section: 3,
      id: 6,
      question: "剛剛你的網站是不是跳出了中毒提示?別擔心，那是這個產品提供的試用功能，你認為跳出來中毒的訊息提示是 溫暖的/嚴肅的/客觀的?",
      type: "radio",
      options: ['溫暖的', '嚴肅的', '客觀的'],
    },
    {
      section: 3,
      id: 7,
      question: "根據剛剛防毒軟體的測試，如果您有1000塊錢，你願意花多少錢來買?",
      type: "number"
    },
    {
      section: 3,
      id: 8,
      question: "我相信這個防毒軟體是可信的",
      type: "radio",
      options: ['非常同意', '同意', '普通', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 9,
      question: "我相信這個防毒軟體是有效的",
      type: "radio",
      options: ['非常同意', '同意', '普通', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 10,
      question: "我相信這個防毒軟體可以降低資訊漏洞的風險",
      type: "radio",
      options: ['非常同意', '同意', '普通', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 11,
      question: "我相信這個防毒軟體是有用的",
      type: "radio",
      options: ['非常同意', '同意', '普通', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 12,
      question: "我相信這個防毒軟體不會洩漏我的資訊",
      type: "radio",
      options: ['非常同意', '同意', '普通', '不同意', '非常不同意']
    },
    {
      section: 4,
      id: 13,
      question: "您出生為西元?",
      type: "number"
    },
    {
      section: 4,
      id: 14,
      question: "您的性別為?",
      type: "radio",
      options: ['生理男', '生理女']
    },
    {
      section: 4,
      id: 15,
      question: "您的教育背景為?",
      type: "radio",
      options: ['社會科學院', '文/法學院', '商管學院', '理工學院', '海學院', '藝術/音樂學院', '醫(護)學院', '其他']
    },
    {
      section: 4,
      id: 16,
      question: "您的最高學歷為?",
      type: "radio",
      options: ['國中小', '高中', '大專院校', '碩博士']
    },
    {
      section: 4,
      id: 17,
      question: "您平常每天使用電腦的時間約為?",
      options: { min: 0, max: 24, step: 1 },
      type: "range"
    },
    {
      section: 4,
      id: 18,
      question: "您的工作產業為?",
      type: "checkbox",
      options: ['軍警', '公務人員', '教育', '商', '工', '農', '醫療', '服務業', '家管', '學生', '退休', '資訊業', '其他']
    }
  ];
  
  // 節的過濾函數
  const filteredQuestions = questions.filter(question => question.section === currentPage + 1);
  
  return (
    <div className="App">
      <header className="App-header">
        {/* 根據是否提交顯示不同的畫面 */}
        {submitted ? (
          <div>
            <h2>感謝您的作答！</h2>
            {/* 可以在這裡添加其他感謝畫面的內容 */}
          </div>
        ) : (<form onSubmit={handleSubmit}>
          <div className="question-section">
            {/* 根據當前頁面索引顯示相應的問題 */}
            {filteredQuestions.map((question, index) => (
              <div key={question.id}> {/* 將 key 設置為 question 的 id */}
                <Question
                  questionId={question.id}
                  question={question.question}
                  type={question.type}
                  options={question.options}
                  imageSrc={question.imageSrc}
                  handleAnswerChange={handleAnswerChange}
                  handleCheckboxChange={question.type === 'checkbox' ? handleCheckboxChange : null}
                  {...question}
                />
              </div>
            ))}

          {/* 提交按鈕 */}
          </div>
          {/* // 上一頁按鈕 */}
          {/* {currentPage > 0 && (
            <button type="button" onClick={() => handlePageChange(currentPage - 1)} className="btn btn-secondary mr-2">上一頁</button>
          )} */}
          {/* // 下一頁按鈕 */}
          {currentPage < totalSections - 1 && (
            <button type="button" onClick={() => handlePageChange(currentPage + 1)} className="btn btn-primary">下一頁</button>
          )}
          {/* 提交按鈕 */}
          {currentPage ===totalSections - 1 && (
            <button type="submit" className="btn btn-primary">提交答案</button>
          )}
        </form>
        )}

        {/* 彈出視窗 */}
        <Modal
          shouldCloseOnOverlayClick={false}
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel="Example Modal"
          className="custom-modal"
        >
          <h2>注意</h2>
          {/*<img src={process.env.PUBLIC_URL + '/images/img04.png'} alt="modal" />*/}
          {/* 根據隨機值顯示不同的訊息 */}
          {randomValue === 1 && <p><span style={{color: 'red'}}>親愛的用戶💗</span>，我們注意到您可能不小心下載了有害軟體。
          請不要擔心，我們已為您準備了一套簡單的步驟來安全清理您的設備。<span style={{color: 'red'}}>您的安全是我們最大的關心</span></p>}
          {randomValue === 2 && <p><span style={{color: 'red'}}>警告❗❗：</span>您必須立刻採取防毒行動，偵測到潛在惡意軟體感染。<span style={{color: 'red'}}>務必按照提供的指示打擊威脅。</span></p>}
          {randomValue === 3 && <p>系統檢測到潛在惡意軟體。請您遵循下列推薦步驟來解決問題並防止您的數據損失或系統受到損害。</p>}
          {/* 其他隨機值的訊息 */}
          <div className="modal-buttons">
            <button onClick={continueFilling} className="btn btn-primary">確定</button>
            {/* <button onClick={fillLater} className="btn btn-secondary">放棄</button> */}
          </div>
        </Modal>
      </header>
    </div>
  );
}

export default App;

/*教學用法*/
            {/* <Question
              questionId={2}
              question="請問您每週觀看該種類型影片的頻率"
              type="number"
              handleAnswerChange={handleAnswerChange}
            />

            <Question
              questionId={3}
              question="請選擇你喜歡的水果（可以多選）？"
              type="checkbox"
              options={['蘋果', '香蕉', '橙子', '草莓', '西瓜']}
              handleCheckboxChange={handleCheckboxChange}
            />

            <Question
              questionId={4}
              question="請問你的性別？"
              type="radio"
              options={['男', '女', '其他']}
              handleAnswerChange={handleAnswerChange}
            />

            <Question
              questionId={5}
              question="你是否有運動習慣？"
              type="radio"
              options={['有', '沒有']}
              handleAnswerChange={handleAnswerChange}
            />

            <Question
              questionId={6}
              question="請問你的最高教育程度？"
              type="radio"
              options={['小學', '中學', '大學', '研究生', '博士']}
              handleAnswerChange={handleAnswerChange}
            /> */}