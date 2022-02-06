const quotes = [
    {
        quote:"하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다.",
        author:"사무엘 존슨",
    },
    {
        quote:"언제나 현재에 집중할수 있다면 행복할것이다.",
        author:"파울로 코엘료",
    },
    {
        quote:"피할수 없으면 즐겨라.",
        author:"로버트 엘리엇",
    },
    {
        quote:"자신감 있는 표정을 지으면 자신감이 생긴다.",
        author:"찰스 다윈",
    },
    {
        quote:"1퍼센트의 가능성, 그것이 나의 길이다.",
        author:"나폴레옹",
    }
];

const quote = document.querySelector("#quotes span:first-child");
const author = document.querySelector("#quotes span:last-child");

let idx = Math.floor(Math.random() * quotes.length); 
quote.innerText = quotes[idx].quote;
author.innerText = `- ${quotes[idx].author}`;
