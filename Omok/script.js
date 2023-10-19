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

function checkWin(row, col) {
  let colorToCheck = boardState[row][col];
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

  for (let direction of directions) {
    let count = 0;
    for (let [dx, dy] of direction) {
      let x = row,
        y = col;
      while (true) {
        x += dx;
        y += dy;

        if (x < 0 || x >= 20 || y < 0 || y >= 20) break;
        if (boardState[x][y] === colorToCheck) count++;
        else break;
      }
    }
    if (count >= 4)
      // 현재 돌을 포함하여 5개가 연속되면 승리
      return true;
  }

  return false;
}
