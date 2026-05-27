audiobtn.addEventListener("click", function(){
  if(audio.paused){
    audio.play();
  audiobtn.textContent="◼️";
  audioset = "ply";
  }else{
    audio.pause();
    audiobtn.textContent="▶";
    audioset = "pss";
  }
  console.log(audioset);
});
audio.addEventListener("ended", function(){
    halaman += 1;
    tambahHalaman();
  localStorage.setItem('halamanterakhir', String(halaman));
  if(mode.value === "arabic"){
    tampilkanar();
  }else if(mode.value === "translation"){
    tampilkantr();
  }
});
