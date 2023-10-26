import React from "react";
import '../scss/mana.scss';

const Mana = () => {
  return(
    <>
      
      <div div id="mainbox" >

        <div div class="manager1" >
         <ul>
           <li><a href="">관리자 페이지</a></li>
           <li><a href="">대시보드</a></li>
           <li><a href="">음원 등록</a></li>
         </ul>
        </div>

      <div class="manager2">
          <div class="manafi">
            <h4> 음원파일 </h4>
           <label>
              <input type="file"></input>
            </label>

            <h4>앨범 이미지</h4>
           <label>
             <input type = "file"></input>
           </label>
           
          {/* </div> */}
          <br></br>
          {/* <div class="manafi1"> */}
          
            <input type="text" placeholder="가수명"></input>
            <br></br>
            <input type="text" placeholder="작곡가"></input>
            <br></br>
            <input type="text" placeholder="음원 제목"></input>
            <br></br>
            <input type="text" placeholder="노래 가사"></input>

            <h4>카테고리</h4>
            <form class="manara">
              <div>
                <input type="radio" name="PO" value="KPOP"></input>KPOP
                <input type="radio" name="PO" value="JPOP"></input>JPOP
                <input type="radio" name="PO" value="POP"></input>POP
                </div>
             </form>
          </div>
          <div id = "divCategory" >
            <h4>서브 카테고리</h4>
            <ul>
              <li><a href="" target="_blank">여행</a></li>
              <li><a href="" target="_blank">여행</a></li>
              <li><a href="" target="_blank">여행</a></li>
            </ul>

          </div>
          

          
              
        </div>

     
      </div>
      </>
  )
}

export default Mana;