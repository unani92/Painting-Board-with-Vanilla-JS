const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// canvas의 크기(픽셀이 놀 수 있는)가 얼마나 되는지 정의한다.
canvas.width = 700
canvas.height = 700

ctx.strokeStyle = "black";
ctx.lineWidth = 2.5

// control menu 
const colors = document.querySelectorAll(".jsColor")
const input = document.querySelector("input")

let painting = false; 


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
        event.target.classList.add("active")
        ctx.strokeStyle = event.target.style.backgroundColor
    })
})

// change linewidth
input.addEventListener("change",event=>{
    ctx.lineWidth = event.target.value
})



