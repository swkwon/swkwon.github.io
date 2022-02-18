const clock = document.querySelector("#clock");

function getClock() {
    const date = new Date();
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    clock.innerText = `${h}:${m}:${s}`;
}

getClock();
setInterval(getClock, 1000); 