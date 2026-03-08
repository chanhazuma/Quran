mode.addEventListener("change", function(){
  if(mode.value=== "arabic"){
    tampilkanar();
    surah.style.direction="rtl";
  }else if(mode.value === "translation"){
    tampilkantr();
    surah.style.direction="ltr";
  }
});