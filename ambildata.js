let quran = [];
let allpage = [];
for(let i = 1; i <= 604; i++){
  allpage[i] = [];
};
async function getdata(){
  let res = await fetch("quran-full.json");
  let firstdata = await res.json();
  quran.push(firstdata);
  quranpage();
};
function quranpage(){
  for(let data of quran){
    for(let surah of data){
      if(surah[0].surah_id != 1 && surah[0].surah_id != 9){
        let basmalah = {
             id: null,
             surah_id: null,
             ayah: 0,
             page: surah[0].page,
             arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
             kitabah: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
             latin: "Bismillahirrahmanirrahim",
             translation: null
                       };
        surah.unshift(basmalah);
      };
      for(let ayah of surah){
        for(let i = 1; i <= 604; i++){
          if(ayah.page === i){
            allpage[i].push(ayah);
          }
        }
      }
    }
  }
  console.log(allpage);
  loading.classList.add("loadingoff");
  document.getElementById("halaman").value = halaman;
  tampilkanar();
};
getdata();