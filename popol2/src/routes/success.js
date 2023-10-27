import React from 'react';
import { NavLink } from 'react-router-dom';

export function SuccessPage() {
  return (
    <div>
      <h1>결제 성공 페이지</h1>
      <p>결제가 성공적으로 처리되었습니다.</p>
      <NavLink to='/'><button>메인</button></NavLink>
    </div>
  );
}

export default SuccessPage;