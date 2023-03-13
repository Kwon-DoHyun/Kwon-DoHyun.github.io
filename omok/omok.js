


const size = 10 ;
let turn = 1;
let win = 0;
let cnt = 0;



// 생성 매커니즘
const root = document.querySelector(".root");

// div 전체에게 맵 속성을 부여
const map = document.createElement("div");

//.setAttribute()를 통해 맵의 이름을 class로, 속성을 map으로 설정
map.setAttribute("class", "map");



// 맵 설정 메소드 실행
setMap();

function setMap() {
    //3x3으로 반복: 매 칸마다 작동하는 칸을 생성
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {

        //매번 만들 아이디를iXj로 만든다(변할 일 없으므로 const)
      const id = `y${i} x${j}`;
     
      // 박스라는 div(구획)요소를 하나 만든다.
      const box = document.createElement("div");
     
      //박스의 고유 id에 직전에 만든  id를 할당한다.
      box.setAttribute("id", id);
     
      //박스의 이름을 class. 공통 속성을 box로 설정
      box.setAttribute("class", "box");
    
        if(i==0){

            box.textContent =j; 
            box.classList.add("index");
        }
        if(j==0){
            box.textContent =i; 
            box.classList.add("index");
        }
      //박스 구획마다 이벤트리스터 생성(조건: 클릭)
      box.addEventListener("click", () => {
      
      
        //비어있는 공간이 아니거나. 누가 승리했으면 반환
        if (box.textContent !== "" || win !== 0) return;
        //턴이 1이면 x로, 2면 o로 표기 후 turnflip 메소드와 유사하게 진행
       
       
      
        //체크가 끝난 뒤 승리 조건 확인 메소드를 실행
       
        if (turn === 1) {
            box.textContent = "X";

          } else {
            box.textContent = "O";

          }
       
        // checkWin();
        findHorizon();
        findVertical();
        findDiagonal();
        reverseFindDiagonal();
        //무승부 체커
        
        turn =  turn === 1? 2:1;

        cnt++;
        if(cnt>80){
      
            alert(`무승부!`);
            return; 
          }

      });
      //맵 마지막에 박스를 삽입(반복문이니 3회 반복)
      map.append(box);
    }
  }
  //root에 맵을 삽입(이 또한 반복문이니 3x3회)
  root.append(map);

}


// 승리 감지 매커니즘


function findHorizon() {
    const boxes = document.querySelectorAll(".box");
    const userId = turn === 1 ? "X" : "O";
  
    for (let i = 0; i < size; i++) {
      let cnt = 0;

      for (let j = 0; j < size; j++) {
        const box = boxes[i * size + j];
        const boxUserId = box.textContent;

        if (boxUserId === userId) {
          // Increment the counter if the current box has the same marker as the last box
          cnt++;
          if (cnt >= 5) {
            // We have a winner!
            win = turn;
            alert(`Player ${win} wins!`);
            return;
          }
        } else {
          // Reset the counter if the current box has a different marker than the last box
          cnt = 0;
        }
      }
    }
  }

  function findVertical() {
    const boxes = document.querySelectorAll(".box");
    const userId = turn === 1 ? "X" : "O";
  
    for (let i = 0; i < size; i++) {
      let cnt = 0;

      for (let j = 0; j < size; j++) {
        const box = boxes[j * size + i];
        const boxUserId = box.textContent;

        if (boxUserId === userId) {
          // Increment the counter if the current box has the same marker as the last box
          cnt++;
          if (cnt >= 5) {
            // We have a winner!
            win = turn;
            alert(`Player ${win} wins!`);
            return;
          }
        } else {
          // Reset the counter if the current box has a different marker than the last box
          cnt = 0;
        }
      }
    }
  }
  function findDiagonal() {
    const boxes = document.querySelectorAll(".box");
    const userId = turn === 1 ? "X" : "O";
  
    for (let i = 0; i < size - 4; i++) {
      for (let j = 0; j < size - 4; j++) {
        let cnt = 0;
        for (let k = 0; k < 5; k++) {
          const box = boxes[(i + k) * size + (j + k)];
          const boxUserId = box.textContent;
          if (boxUserId === userId) {
            cnt++;
            if (cnt >= 5) {
              win = turn;
              alert(`Player ${win} wins!`);
              return;
            }
          } else {
            cnt = 0;
          }
        }
      }
    }
  }
  function reverseFindDiagonal() {
    const boxes = document.querySelectorAll(".box");
    const userId = turn === 1 ? "X" : "O";
  
    for (let i = 4; i< size; i++) {
      for (let j =0; j<size-4; j++) {
        let cnt = 0;
        for (let k = 0; k < 5; k++) {
          const box = boxes[(i - k) * size + (j + k)];
          const boxUserId = box.textContent;
          if (boxUserId === userId) {
            cnt++;
            if (cnt >= 5) {
              win = turn;
              alert(`Player ${win} wins!`);
              return;
            }
          } else {
            cnt = 0;
          }
        }
      }
    }
  }

  
  const button = document.querySelector(".button");
  button.addEventListener("click", () => {
  
      reset();
  
  
  });
  
  function reset(){
  
      turn=1;
      win=0;
      location.reload();
  }