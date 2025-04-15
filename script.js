
const theCanvas = document.getElementById("TheCanvas");
const ctx = theCanvas.getContext("2d");

const theLink = document.createElement("a");

const bg0 = document.getElementById("bg0");
const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");
const avatar = document.getElementById("avatar");

function update(type, lines, font, avatar) {
    let bg = type == 1 ? bg1 : type == 2 ? bg2 : bg0;
    ctx.drawImage(bg, 0, 0);
    ctx.font = font ?? "18pt sans-serif";
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 165, 473 + 35 * i);
    }
    avatar && ctx.drawImage(avatar, 607, 436, 200, 200);
}

function download() {
    const dataURL = theCanvas.toDataURL("image/png");
    theLink.download = `营地跑团${cfg("TheLevel")}证-${cfg("TheName")}.png`;
    theLink.href = dataURL;
    document.body.appendChild(theLink);
    theLink.click();
    document.body.removeChild(theLink);
}



function randomNum() {
    let e = document.getElementById("TheNum");
    e.value = Math.floor(1e11 + 9e11 * Math.random());
    updateCanvasByConfig();
}
randomNum();

function updateDate() {
    let e = document.getElementById("TheDate");
    let d = new Date();
    e.value = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    updateCanvasByConfig();
}
updateDate();

function cfg(id) {
    return document.getElementById(id).value;
}

document.getElementById("TheType").addEventListener("change", (e) => {
    document.getElementById("TheLevel").value = ["守秘人", "玩家", "涩批"][cfg("TheType")];
});

document.getElementById("TheUpload").addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const img = document.getElementById('avatar');
      img.src = e.target.result;
    };
    
    if (file) reader.readAsDataURL(file);
});



function updateCanvasByConfig() {
    update(cfg("TheType"), [
        `昵${" ".repeat(cfg("TheSpace"))}称：${cfg("TheName")}`,
        `考证等级：${cfg("TheLevel")}`,
        `注册编号：${cfg("TheNumHead")}-${cfg("TheNum")}`,
        `考核认证：${cfg("TheCert")}`,
        `考核日期：${cfg("TheDate")}`
    ], cfg("TheFont"), avatar);
}

window.addEventListener("load", updateCanvasByConfig);

for (element of document.getElementsByClassName("config")) {
    element.addEventListener("change", updateCanvasByConfig);
}

for (element of document.getElementsByClassName("imageSource")) {
    element.addEventListener("load", updateCanvasByConfig);
}



console.log("这傻逼玩意被我写成了一坨屎，想翻源码请自备降压药。懒得优化。");