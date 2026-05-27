document.querySelector("#halaman").addEventListener("change", function(){
  halaman = Number(document.getElementById("halaman").value);
  localStorage.setItem('halamanterakhir', String(halaman));
  if(mode.value === "arabic"){
    tampilkanar();
  }else if(mode.value === "translation"){
    tampilkantr();
  }
});
let startx = 0;
let endx = 0;
function swipe(){
  let space = endx - startx;
  if(space > 70){
    halaman += 1;
    tambahHalaman();
  localStorage.setItem('halamanterakhir', String(halaman));
  if(mode.value === "arabic"){
    tampilkanar();
  }else if(mode.value === "translation"){
    tampilkantr();
  }
}else if(space < -70){
  halaman -= 1;
  kurangHalaman();
  localStorage.setItem('halamanterakhir', String(halaman));
  if(mode.value === "arabic"){
    tampilkanar();
  }else if(mode.value === "translation"){
    tampilkantr();
  }
}
}
maqra.addEventListener("touchstart", function(e){
  startx = e.touches[0].clientX;
});
maqra.addEventListener("touchend", function(e){
  endx = e.changedTouches[0].clientX;
  swipe();
});
function kurangHalaman(){
  article.classList.add("pindahHalaman");
  setTimeout(function(){
    article.classList.remove("pindahHalaman");
  }, 50);
}
function tambahHalaman(){
  article.classList.add("pindahHalaman");
  setTimeout(function(){
    article.classList.remove("pindahHalaman");
  }, 50);
}