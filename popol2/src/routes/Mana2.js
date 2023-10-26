import React from "react";
import '../scss/mana.scss';

const Mana = () => {
  return(
    <>
      
      <div id="manamainbox" >
         <div div class="manager1" >
         <ul>
           <li><a href="">관리자 페이지</a></li>
           <li><a href="">대시보드</a></li>
           <li><a href="">음원 등록</a></li>
         </ul>
        </div>

        < div class="manager2" >
          <h2>Tags</h2>
          <textarea placeholder="태그를 입력하세요"></textarea>
          </div>

       
      </div>
      </>
  )
}

export default Mana;