function tampilkanar(){
  if(halaman <=9){
    audio.src = "misyary/Page00"+halaman+".mp3";
  }else if(halaman <=99 && halaman >=10){
    audio.src = "misyary/Page0"+halaman+".mp3";
  }else{
    audio.src = "misyary/Page"+halaman+".mp3";
  };
  if(audioset === "ply"){
    audiobtn.textContent="◼️️️";
    audio.play();
  }else{
  audiobtn.textContent="▶";
  }
  maqra.innerHTML="";
  surah.innerHTML="";
  let awalsurah = [];
  let tengahsurat = [];
  document.getElementById("halaman").value = halaman;
  let nowpage = allpage[halaman];
  console.log(nowpage);
  for(let i of nowpage){
    if(i.ayah === 0 || (i.ayah === 1 && i.surah_id === 1)){
      let b = document.createElement("h3");
      b.classList.add("textbismillah");
      b.textContent = i.kitabah;
      maqra.append(b);
    }else{
      let aa = document.createElement("p");
      aa.classList.add("textayahar");
      aa.textContent = i.kitabah+" ("+i.ayah+")";
      maqra.append(aa);
    };
  };
  for(let i of nowpage){
    if(i.ayah === 1){
      awalsurah.push(i);
    }else if(i.ayah >1){
      tengahsurat.push(i)
    };
  };
  awalsurah.forEach(function(i){
   let value = document.createElement("p");
   value.textContent = i.surah.arabic;
   value.classList.add("textnamesurah");
   surah.append(value);
  });
  if(nowpage[0].ayah != 0 && (nowpage[0].surah_id != 1 && nowpage[0].surah_id != 9)){
    let value = document.createElement("p");
    value.textContent = nowpage[0].surah.arabic;
    value.classList.add("textnamesurah");
    surah.append(value);
  }
};