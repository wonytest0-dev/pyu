console.log("script jalan");

document.addEventListener("DOMContentLoaded", function(){

let path = "";

/* cek apakah halaman ada di folder pages */
if (window.location.pathname.includes("/pages/")) {
  path = "../";
}

/* ================= HEADER ================= */

fetch(path + "components/header.html")
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

  /* aktifkan smooth transition setelah header dimuat */
  enablePageTransition();

})
.catch(err => console.log("Header gagal dimuat:", err));



/* ================= FOOTER ================= */

fetch(path + "components/footer.html")
.then(res => res.text())
.then(data => {

  const footer = document.getElementById("footer");

  if(footer){
    footer.innerHTML = data;
  }

})
.catch(err => console.log("Footer gagal dimuat:", err));



/* ================= MUSIC ================= */

fetch(path + "components/music.html")
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
      music.play();
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


/* ================= PAGE TRANSITION ================= */

function enablePageTransition(){

document.querySelectorAll("a").forEach(link => {

link.addEventListener("click", function (e) {

const href = this.getAttribute("href");

if (href && !href.startsWith("#") && !this.target) {

e.preventDefault();

document.body.classList.add("fade-out");

setTimeout(() => {
window.location.href = href;
}, 400);

}

});

});

}


/* fade masuk saat halaman load */
window.addEventListener("pageshow", function () {
document.body.classList.remove("fade-out");
});
