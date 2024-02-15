// JavaScript 코드
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = []; // 할 일 목록
let underLine = document.getElementById("under-line"); // 탭 아래의 밑줄
let mode = "all"; // 현재 선택된 모드 (all, ongoing, done)
let filterList = []; // 필터링된 할 일 목록

// 각 탭에 대한 이벤트 리스너 추가
tabs.forEach((tab) => tab.addEventListener("click", horizontalIndicator));
tabs.forEach((tab) => tab.addEventListener("click", function(event) {
  filter(event);
}));


// 할 일 추가 버튼에 대한 이벤트 리스너 추가
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 탭 클릭 시 밑줄 위치 및 크기 조정하는 함수
function horizontalIndicator(event) {
  underLine.style.left = event.target.offsetLeft + "px";
  underLine.style.width = event.target.offsetWidth + "px";
  underLine.style.top =
    event.target.offsetTop + event.target.offsetHeight + "px";
}

// 할 일 추가 함수
function addTask() {


  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  if(taskInput.value==""){console.log("내용이 없습니다.")}
  else{
  taskList.push(task);
  taskInput.value = ""; // 입력 필드 초기화
  render(taskList); // 목록 다시 그리기
  }
}

// 할 일 목록을 HTML에 렌더링하는 함수
function render(list) {
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      // 완료된 항목 스타일링
      resultHTML += `<div class="task-donebox">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button class="fa-solid fa-rotate-right" style=" color:blue" onclick="toggleComplete('${list[i].id}')"></button>
          <button class="fa-solid fa-trash" style="color:red" onclick="deleteTask('${list[i].id}')"></button>
        </div>
      </div>`;
    } else {
      // 미완료 항목 스타일링
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
        <button class="fa-solid fa-check" style="color:green" onclick="toggleComplete('${list[i].id}')"></button>
        <button class="fa-solid fa-trash" style="color:red" onclick="deleteTask('${list[i].id}')"></button>
      </div>
    </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML; // HTML에 렌더링
}

// 할 일 완료/미완료 토글 함수
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  if (mode === "all") {
    render(taskList); // 전체 목록을 렌더링
  } else if (mode === "ongoing") {
    filterList = taskList.filter(task => !task.isComplete); // 진행중인 항목만 필터링하여 filterList에 저장
    render(filterList); // 필터링된 목록을 렌더링
  } else if (mode === "done") {
    filterList = taskList.filter(task => task.isComplete); // 완료된 항목만 필터링하여 filterList에 저장
    render(filterList); // 필터링된 목록을 렌더링
  }
}

// 할 일 삭제 함수
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1); // 해당 항목 제거
      break;
    }
  }
  if (mode === "all") {
    render(taskList); // 전체 목록을 렌더링
  } else if (mode === "ongoing") {
    filterList = taskList.filter(task => !task.isComplete); // 진행중인 항목만 필터링하여 filterList에 저장
    render(filterList); // 필터링된 목록을 렌더링
  } else if (mode === "done") {
    filterList = taskList.filter(task => task.isComplete); // 완료된 항목만 필터링하여 filterList에 저장
    render(filterList); // 필터링된 목록을 렌더링
  }
}

// 탭 필터링 함수
function filter(event) {
  mode = event.target.id;
  if (mode === "all") {
    render(taskList); // 전체 목록을 렌더링
  } else if (mode === "ongoing") {
    filterList = taskList.filter(task => !task.isComplete); // 진행중인 항목만 필터링하여 filterList에 저장
    render(filterList); // 필터링된 목록을 렌더링
  } else if (mode === "done") {
    filterList = taskList.filter(task => task.isComplete); // 완료된 항목만 필터링하여 filterList에 저장
    render(filterList); // 필터링된 목록을 렌더링
  }
}


// 무작위 ID 생성 함수
function randomIDGenerate() {
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  ).toUpperCase();
}
