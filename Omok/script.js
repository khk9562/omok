const gameBoard = document.getElementById("game-board");
let currentPlayer = "black"; // 흑돌부터 시작
let boardState = Array(20)
  .fill()
  .map(() => Array(20).fill(null)); // 게임판 상태 추적

const player = document.getElementsByClassName("player")[0];
player.innerHTML = `현재 플레이어: ${currentPlayer}`;

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const check = document.createElement("input");
    check.className = "check";
    check.id = `${i}-${j}`;
    check.type = "checkbox";
    check.hidden = true;

    const checkLabel = document.createElement("label");
    checkLabel.htmlFor = `${i}-${j}`;

    // 돌을 놓는 이벤트 리스너 추가
    check.addEventListener("change", function () {
      //   console.log("boardState", boardState);
      if (currentPlayer === "black") {
        console.log("this", this);
        console.log("this.nextElementSibling", this.nextElementSibling);
        this.nextElementSibling.style.backgroundColor = "black";
        boardState[i][j] = "black";
        currentPlayer = "white";
      } else {
        console.log("this", this);
        console.log("this.nextElementSibling", this.nextElementSibling);
        this.nextElementSibling.style.backgroundColor = "#eee";
        boardState[i][j] = "white";
        currentPlayer = "black";
      }
      player.innerHTML = `현재 플레이어: ${currentPlayer}`;

      if (checkWin(i, j)) {
        setTimeout(() => {
          alert(
            `${boardState[i][j] == "black" ? "흑돌" : "백돌"}이 승리했습니다!`
          );
        }, 100);
      }
    });

    itemDiv.appendChild(check);
    itemDiv.appendChild(checkLabel);
    gameBoard.appendChild(itemDiv);
  }
}

// 승리 조건
// 수직, 수평, 대각 같은 색 연속 5개 놓여졌을 때
function checkWin(row, col) {
  let colorToCheck = boardState[row][col];
  // directions 변수는 각 방향을 나타내는 배열
  // 각 배열은 두 개의 좌표 [dx, dy]를 포함하며, 이 좌표들은 현재 위치에서 어느 방향으로 탐색할지를 나타냄
  let directions = [
    [
      [-1, -1],
      [1, 1],
    ], // 대각선 왼쪽 위에서 오른쪽 아래로
    [
      [-1, 0],
      [1, 0],
    ], // 세로
    [
      [0, -1],
      [0, 1],
    ], // 가로
    [
      [-1, 1],
      [1, -1],
    ], // 대각선 왼쪽 아래에서 오른쪽 위로
  ];

  // 각 방향에 대해 반복문 수행
  for (let direction of directions) {
    let count = 0;
    // 해당 방향과 반대방향에 대해서도
    for (let [dx, dy] of direction) {
      let x = row,
        y = col;
      // 내부의 while (true) 구문에서 현재 위치 (x,y)를 시작으로 해당 방향 (dx,dy)로 계속 움직이면서 같은 색상의 돌이 있는지 확인
      while (true) {
        x += dx;
        y += dy;

        // 만약 움직인 셀이 게임판 밖으로 벗어나거나(if (x < 0 || x >= 20 || y < 0 || y >= 20) break;) 다른 색상의 돌을 만나면(else break;) while 문을 멈추고 다음 방향으로
        if (x < 0 || x >= 20 || y < 0 || y >= 20) break;
        // 같은 색상의 돌을 만날 때마다 카운트(count++)
        if (boardState[x][y] === colorToCheck) count++;
        else break;
      }
    }
    //그 카운트가 4(자기 자신 포함해서 5개)가 되면 승리
    if (count >= 4)
      // 현재 돌을 포함하여 5개가 연속되면 승리
      return true;
  }

  // 모든 방향에 대한 검사가 끝났음에도 연속된 같은 색상의 돌이 없으면 패배
  return false;
}
