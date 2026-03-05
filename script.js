console.log("script jalan");

document.addEventListener("DOMContentLoaded", function(){

/* ================= BASE PATH OTOMATIS ================= */

let base = "";

if (window.location.hostname.includes("github.io")) {
  base = "/pyu/";
}

/* ================= HEADER ================= */

fetch(base + "components/header.html")
.then(res => res.text())
.then(data => {

  const header = document.getElementById("header");

  if(header){
    header.innerHTML = data;
  }

  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  if(hamburger && nav){
    hamburger.addEventListener("click", function(){
      nav.classList.toggle("show");
      hamburger.classList.toggle("active");
    });
  }

})
.catch(err => console.log("Header gagal dimuat:", err));



/* ================= FOOTER ================= */

fetch(base + "components/footer.html")
.then(res => res.text())
.then(data => {

  const footer = document.getElementById("footer");

  if(footer){
    footer.innerHTML = data;
  }

})
.catch(err => console.log("Footer gagal dimuat:", err));



/* ================= MUSIC ================= */

fetch(base + "components/music.html")
.then(res => res.text())
.then(data => {

  const musicContainer = document.getElementById("music");

  if(musicContainer){
    musicContainer.innerHTML = data;
  }

  setTimeout(function(){

    const music = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");

    if(!music || !musicBtn) return;

    let playing = localStorage.getItem("musicPlaying") === "true";

    const savedTime = localStorage.getItem("musicTime");

    if(savedTime){
      music.currentTime = savedTime;
    }

    if(playing){
      musicBtn.innerText = "🎧";
    }

    musicBtn.addEventListener("click", function(){

      if(!playing){

        music.play();
        musicBtn.innerText = "🎧";
        playing = true;

        localStorage.setItem("musicPlaying", true);

      }else{

        music.pause();
        musicBtn.innerText = "♫";
        playing = false;

        localStorage.setItem("musicPlaying", false);

      }

    });

    window.addEventListener("beforeunload", function(){
      localStorage.setItem("musicTime", music.currentTime);
    });

  },100);

})
.catch(err => console.log("Music gagal dimuat:", err));

});
