const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// canvas의 크기(픽셀이 놀 수 있는)가 얼마나 되는지 정의한다.
canvas.width = 700
canvas.height = 700

ctx.strokeStyle = "black";
ctx.fillStyle = ctx.strokeStyle;
ctx.lineWidth = 2.5

// control menu 
const colors = document.querySelectorAll(".jsColor")
const input = document.querySelector("input")

let painting = false; 
let filling = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  // 클릭하지 않고 움직이는 경우
  if (!painting) {
    ctx.beginPath(); // path를 생성하고
    ctx.moveTo(x,y); // 해당 좌표로 이동합니다.
  } else {
    // 마우스가 움직이는 동안 계속 발생하는 이벤트
    ctx.lineTo(x,y); // path의 이전 위치에서 지금 위치까지의 선을 생성
    ctx.stroke(); // 최종적으로 선을 표시해준다
    }
}

function onMouseDown(event) {
  painting = true;
}

function stopPainting(event) {
  painting = false;
}

function startPainting(event) {
  painting = true;
}

function changeColor() {
  console.log(event.target.style)
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("mousedown", startPainting)
  canvas.addEventListener("mouseup", stopPainting)
  canvas.addEventListener("mouseleave", stopPainting)
}

// change color
colors.forEach(color => {
  color.addEventListener("click", event => {
    const colorPickers  = document.querySelectorAll(".jsColor")
    colorPickers.forEach(colorPicker => {colorPicker.classList.remove("active")})
    event.target.classList.add("active")
    ctx.strokeStyle = event.target.style.backgroundColor
    ctx.fillStyle = ctx.strokeStyle
  })
})

// change linewidth
input.addEventListener("change", event=> ctx.lineWidth = event.target.value)


// change mode paint, fill
const mode = document.querySelector("#jsMode")
mode.addEventListener("click", () => {
  if (filling === true) {
    event.target.innerText = "FILL"
    filling = false
  } else {
    event.target.innerText = "Paint"
    filling = true
    ctx.fillStyle = ctx.strokeStyle
  }
})
canvas.addEventListener("click", () => {
  if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
})

// save painting
const saveBtn = document.querySelector("#jssave")
saveBtn.addEventListener("click", () => {
  const image = canvas.toDataURL("image/jpeg")
  const link = document.createElement("a")
  link.href = image
  link.download = `paintimages`
  link.click()
})


