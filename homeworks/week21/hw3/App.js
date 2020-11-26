/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import Form from './Form';
import questionList from './Questions';

function showAnswers(answers) {
  const result = [];
  answers.forEach((answer) => {
    const { title, value } = answer;
    result.push(`${title}：${value}`);
  });
  alert(`您的回答如下：\n\n${result.join('\n')}`);
}

const initialAnswers = [];
const initialErrorMessages = [];

questionList.forEach((question) => {
  initialAnswers.push({
    title: question.title,
    value: '',
  });
  initialErrorMessages.push('');
});


function App() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages);

  function hideErrorMessage(indexOfAnswer) {
    const newErrorMessages = [...errorMessages];
    newErrorMessages[indexOfAnswer] = '';
    setErrorMessages(newErrorMessages);
  }

  const handleInputChange = (e, indexOfAnswer) => {
    hideErrorMessage(indexOfAnswer);
    setAnswers(answers.map((answer, index) => {
      if (index === indexOfAnswer) {
        return {
          ...answer,
          value: e.target.value,
        };
      }
      return answer;
    }));
  };

  function handleRadioClick(e, indexOfAnswer) {
    hideErrorMessage(indexOfAnswer);
    setAnswers(answers.map((answer, index) => {
      if (index === indexOfAnswer) {
        return {
          ...answer,
          value: e.target.parentElement.innerText,
        };
      }
      return answer;
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let isCompleted = true;

    const newErrorMessages = [];
    answers.forEach((answer, indexOfAnswer) => {
      if (answer.value === '') {
        isCompleted = false;
        newErrorMessages[indexOfAnswer] = '請輸入欄位';
      } else {
        newErrorMessages[indexOfAnswer] = '';
      }
    });

    setErrorMessages(newErrorMessages);

    if (isCompleted) {
      showAnswers(answers);
    }
  };

  useEffect(() => {
    document.title = '新拖延運動報名表單';
  }, []);

  return (
    <Form
      answers={answers}
      questionList={questionList}
      handleInputChange={handleInputChange}
      handleRadioClick={handleRadioClick}
      handleSubmit={handleSubmit}
      errorMessages={errorMessages}
    />
  );
}

export default App;
