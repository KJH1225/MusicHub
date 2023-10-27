import React from 'react';
import ChatBot from 'react-simple-chatbot';

const steps = [
  {
    id: '1',
    message: '안녕하세요! 무엇을 도와드릴까요?',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 'option1', label: '음악 추천', trigger: '3' },
      { value: 'option2', label: '넌 뭐야', trigger: 'whoAmI' },
      { value: 'goBack', label: '처음으로 돌아가기', trigger: '1' },
    ],
  },
  {
    id: 'whoAmI',
    message: '저는 저에요!',
    trigger: 'recommendMusic',
  },
  {
    id: '3',
    message: '옵션 1을 선택하셨습니다.',
    end: true,
  },
  {
    id: '4',
    message: '옵션 2를 선택하셨습니다.',
    end: true,
  },
  {
    id: 'recommendMusic',
    options: [
      { value: 'musicOption1', label: '음악 추천 1', trigger: 'music1' },
      { value: 'musicOption2', label: '음악 추천 2', trigger: 'music2' },
      { value: 'goBack', label: '처음으로 돌아가기', trigger: '1' },
    ],
  },
  {
    id: 'music1',
    message: '음악 추천 1을 선택하셨습니다.',
    end: true,
  },
  {
    id: 'music2',
    message: '음악 추천 2를 선택하셨습니다.',
    end: true,
  },
];


const Simple = () => {
  return <ChatBot steps={steps} />;
};

export default Simple;
