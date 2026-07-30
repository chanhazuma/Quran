const loading = document.querySelector(".loading");
const splash = document.querySelector(".splash");
const header = document.querySelector(".header");
const headerContent = document.querySelectorAll(".header-content");
const inputPage = document.getElementById("inputPage");
const surahInPage = document.getElementById("surahId");
const audioBtn = {
    "before": document.getElementById("before"),
    "playOrPause": document.getElementById("play"),
    "after": document.getElementById("after")
};
const murattal = document.getElementById("murattal");
const page = document.getElementById("page");
const pageTr = document.getElementById("pageTr");
const mode = document.getElementById("mode");

let playList = {};
let QuranText = {};
let QuranPerPage = {};
let urlMurattal = "misyary/Page001.mp3";
let headerActive = true;
let geser = false;
let serX, serY;
let varAn;
let lastData = {
    "page": parseInt(localStorage.getItem("HM-Page")) || 1,
    "date": localStorage.getItem("HM-Date") || new Date().toLocaleDateString("id-ID"),
    "mode": localStorage.getItem("HM-Mode") || "ar",
    "x": localStorage.getItem("HM-X") || 10,
    "y": localStorage.getItem("HM-Y") || 0
}

function createPlaylist(){
    Object.keys(QuranPerPage).forEach((i)=>{
        playList[i] = {
            "title": `Al-Qur'an hal ${i}`,
            "Qori": 'Misyary Rasyid',
            "src": `misyary/Page${i.padStart(3, "0")}.mp3`,
            "page": `mushaf-per-page/Quran-PNG-master/${i.padStart(3, "0")}.png`,
            "artwork": {src: "png/LogoMushaf(whiteBG).png", sizes: "512x512", type: "image/png"}
        }
    });
    if(lastData.mode == "ar"){
        displayPage();
    }else{
        displayPageTr();
    }
};

function updateLastData(){
    lastData.page = parseInt(localStorage.getItem("HM-Page")) || 1;
    lastData.x = localStorage.getItem("HM-X");
    lastData.y = localStorage.getItem("HM-Y");
    lastData.mode = localStorage.getItem("HM-Mode");
}

// Ambil Quran Text
fetch("quran-full.json")
.then((res)=>{
    return res.json()
})
.then((data)=>{
    let index = 1;
    data.forEach((d)=>{
        QuranText[index] = d;
        index += 1;
    });
    console.log("fetch Quran Berhasil");
    GetQuranPerPage();
});

function GetQuranPerPage(){
    Object.values(QuranText).forEach((s)=>{
        s.forEach((a)=>{
            if(!QuranPerPage[a.page]){
                QuranPerPage[a.page] = [];
            }
            QuranPerPage[a.page].push(a);
        })
    })
    console.log("quran per page berhasil dibuat");
    loading.classList.add("hidden");
    createPlaylist();
}

setTimeout(() => {
    splash.classList.add("hidden");
}, 1500);

function headerOff(){
    header.classList.add("header-off");
    header.style.top = lastData.y + "px";
    header.style.left = lastData.x + "px";
    headerActive = false;
    header.addEventListener("click", headerOn);
    headerContent.forEach(e => {
        e.classList.add("hidden");      
    });
    geserable();
    headerAnimation();
};
function headerOn(){
    header.classList.remove("header-off");
    header.style.top = "10px";
    header.style.left = "0";
    headerActive = true;
    headerContent.forEach(e => {
        e.classList.remove("hidden");      
    });
    ungeserable();
    headerAnimationOff();
};

function headerAnimation(){
    if(!headerActive && !geser){
        let animasi = setInterval(()=>{
            header.style.transform = "scale(1.1)";
            setTimeout(()=>{
                header.style.transform = "scale(1)";
            }, 500)
        }, 1000)
        varAn = animasi;
    }
};
function headerAnimationOff(){
    clearInterval(varAn);
}

function mulaiGeser(e){
        geser = true;
        const headerP = header.getBoundingClientRect();
        if(e.type === "touchstart"){
            serX = e.touches[0].clientX - headerP.left;
            serY = e.touches[0].clientY - headerP.top;
        }else{
            serX = e.clientX - headerP.left;
            serY = e.clientY - headerP.top;
        }
        header.classList.add("geser");
        headerAnimation();
    };

    function sedangGeser(e){
        if(!geser) return;
        let x,y;
        if(e.type === "touchmove"){
            x = e.touches[0].clientX - serX;
            y = e.touches[0].clientY - serY;
        }else{
            x = e.clientX - serX;
            y = e.clientY - serY;
        }
        header.style.left = x + "px";
        header.style.top = y + "px";
        localStorage.setItem("HM-Y", y);
        localStorage.setItem("HM-X", x);
    };

    function selesaiGeser(){
        headerAnimation();
        header.classList.remove("geser");
        geser = false;
        updateLastData();
    }
function geserable(){
    header.addEventListener("mousedown", mulaiGeser);
    header.addEventListener("touchstart", mulaiGeser);
    document.addEventListener("mousemove", sedangGeser);
    document.addEventListener("touchmove", sedangGeser);
    header.addEventListener("mouseup", selesaiGeser);
    header.addEventListener("touchend", selesaiGeser);
}
function ungeserable(){
    header.removeEventListener("mousedown", mulaiGeser);
    header.removeEventListener("touchstart", mulaiGeser);
    document.removeEventListener("mousemove", sedangGeser);
    document.removeEventListener("touchmove", sedangGeser);
    header.removeEventListener("mouseup", selesaiGeser);
    header.removeEventListener("touchend", selesaiGeser);
}

document.getElementById("body").addEventListener("click", ()=>{
    if(header.classList.contains("header-off")) return;
    headerOff();
})
setTimeout(()=>{
    if(header.classList.contains("header-off")) return;
    headerOff();
}, 3500)

// Display The Page
function displayPage(){
    pageTr.classList.add("hidden");
    page.classList.remove("hidden");
    page.src = playList[lastData.page].page;
    inputPage.value = lastData.page;
    displayNameSurah();
    audioBtn.playOrPause.removeEventListener("click", updateBtnp);
    if(murattal.paused){
        murattal.src = playList[lastData.page].src;
        audioBtn.playOrPause.addEventListener("click", updateBtnp);
    }else{
        murattal.src = playList[lastData.page].src;
        audioBtn.playOrPause.addEventListener("click", updateBtnp);
        murattal.play();
    }
}
function displayPageTr(){
    pageTr.classList.remove("hidden");
    page.classList.add("hidden");
    page.src = playList[lastData.page].page;
    inputPage.value = lastData.page;
    displayNameSurah();
    audioBtn.playOrPause.removeEventListener("click", updateBtnp);
    if(murattal.paused){
        murattal.src = playList[lastData.page].src;
        audioBtn.playOrPause.addEventListener("click", updateBtnp);
    }else{
        murattal.src = playList[lastData.page].src;
        audioBtn.playOrPause.addEventListener("click", updateBtnp);
        murattal.play();
    }
    console.log(QuranPerPage[lastData.page]);
    pageTr.innerHTML ="";
    QuranPerPage[lastData.page].forEach((a)=>{
        let tAr = document.createElement("p");
        let tTr = document.createElement("p");
        if(a.ayah === 1 && (a.surah.id != 1 || a.surah.id != 9)){
            let tB = document.createElement("p");
            tB.textContent = QuranPerPage[1][0].arabic;
            tB.classList.add("TB");
            pageTr.append(tB);
        }
        tAr.textContent = a.arabic;
        tTr.textContent = a.translation;
        tAr.classList.add("tAr");
        tTr.classList.add("tTr");
        const e = document.createElement("div");
        e.append(tAr, tTr);
        pageTr.append(e);
    })
}
function displayNameSurah(){
    let displaySurah = [];
    QuranPerPage[lastData.page].forEach((i)=>{
        if(!displaySurah.includes(i.surah.latin)){
            displaySurah.push(i.surah.latin);
        };
    });
    surahInPage.textContent = displaySurah.join(" | ");
    surahInPage.style.fontSize = (displaySurah.join(" | ").length > 25) ? "2.2vw": "3.8vw";
    console.log(displaySurah);
    mode.value = lastData.mode;
}

// Play, Pause, Priv And Next Murattal
function mPlay(){
    murattal.play();
    updateMeediaSession();
};
function mPause(){
    murattal.pause();
}
function mPriv(){
    // Update Page
    let p = lastData.page;
    if(lastData.page == 1){
        p = 604;
    }else{
        p -= 1;
    }
    console.log(`yap${p}`)
    localStorage.setItem("HM-Page", p);
    updateLastData();
    // Update Display Page
    if(lastData.mode == "ar"){
        displayPage();
    }else{
        displayPageTr();
    }
}
function mNext(){
    // Update Page
    let p = lastData.page;
    if(lastData.page == 604){
        p = 1;
    }else{
        p += 1;
    }
    localStorage.setItem("HM-Page", p);
    updateLastData();
    // Update Display Page
    if(lastData.mode == "ar"){
        displayPage();
    }else{
        displayPageTr();
    }
    console.log(lastData.mode)
}

// Next Page Logic
Object.keys(audioBtn).forEach((i)=>{
    if(i == "before"){
        audioBtn[i].addEventListener("click", mPriv);
    }else if(i == "after"){
        audioBtn[i].addEventListener("click", mNext);
    }
});
function updateBtnp(){
    if(murattal.paused){
        mPlay();
    }else{
        mPause();
    }
}

// Chaange Page Logic
inputPage.addEventListener("change", ()=>{
    let p = inputPage.value;
    if(Number(p) > 604){
        p = "604";
    }else if(Number(p) < 1){
        p = "1";
    }
    localStorage.setItem("HM-Page", p);
    updateLastData();
    if(lastData.mode == "ar"){
        displayPage();
    }else{
        displayPageTr();
    }
    })

// Media Session & Audio Contrils
function updateMeediaSession(){
    if('mediaSession' in navigator){
        navigator.mediaSession.metadata = new MediaMetadata({
            title: playList[lastData.page].title,
            artist: playList[lastData.page].Qori,
            artwork: [playList[lastData.page].artwork],
            duration: murattal.duration
        });
        navigator.mediaSession.setActionHandler("play", mPlay);
        navigator.mediaSession.setActionHandler("pause", mPause);
        navigator.mediaSession.setActionHandler("previoustrack", mPriv);
        navigator.mediaSession.setActionHandler("nexttrack", mNext);
    }
    murattal.addEventListener("ended", ()=>{
        mNext();
        murattal.play();
    });
    murattal.addEventListener("pause", ()=>{
        document.getElementById("porp").src = "svg/play.svg";
    });
    murattal.addEventListener("play", ()=>{
        document.getElementById("porp").src = "svg/pause.svg";
    });
}

// Mode Logic
mode.addEventListener("change", ()=>{
    let m = mode.value;
    console.log(m)
    localStorage.setItem("HM-Mode", m);
    updateLastData();
    console.log(lastData.mode + "aaa");
    if(lastData.mode == "ar"){
        displayPage();
    }else{
        displayPageTr();
    }
});
let now = new Date().toLocaleDateString("id-ID").split("/");
let lastNow = lastData.date.split("/");
console.log(now, lastNow)
if((now[0] - lastNow[0]) > 3){
    alert("yeay, akhirnya kamu kembali setelah lebih dari 3 harii");
    lastData.date = localStorage.getItem("HM-Date") || new Date().toLocaleDateString("id-ID");
}else{
    alert("Haii, selamat datang kembalii");
    lastData.date = localStorage.getItem("HM-Date") || new Date().toLocaleDateString("id-ID");
}