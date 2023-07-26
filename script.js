//variables

let index=1;

const music=new Audio("/audio/1.mp3");
// music.play();


//array of object to change the content of songs through javascript.

const songs=[
  {
    id:1,
    songname:`Filhal 2 b praak<br>
    <div class="subtitle">B Praak</div>`,
    
  },

  {
    id:2,
    songname:`Toofan KGF-2<br>
    <div class="subtitle">Anirudh Music</div>`,
    
  },
  {
    id:3,
    songname:`Pasoori coke studies<br>
    <div class="subtitle">Coke Studios</div>`,
    
  },

  {
    id:4,
    songname:`Razi E Watan <br>
    <div class="subtitle">Arijit Singh</div>`,
    
  },

  {
    id:5,
    songname:`Rata Lambeyaan <br>
    <div class="subtitle">Jubin Nautiyal</div>`,
    
  },

  {
    id:6,
    songname:`Matargashti <br>
    <div class="subtitle">Tamasha</div>`,
    
  },

  {
    id:7,
    songname:`Apna Bana Le <br>
    <div class="subtitle">Arijit Singh</div>`,
    
  },

  {
    id:8,
    songname:`Mausam Ki Baarish <br>
    <div class="subtitle">jubin Nautiyal</div>`,
    
  },

  {
    id:9,
    songname:`e dil he mushkil <br>
    <div class="subtitle">Arijit singh</div>`,
    
  },

  {
    id:10,
    songname:`Tera Fitoor <br>
    <div class="subtitle">Arijit Singh</div>`,
    
  },

  {
    id:11,
    songname:`Kamle  <br>
    <div class="subtitle">Punjabi Pop</div>`,
    
  },

  {
    id:12,
    songname:`Mein Royaan <br>
    <div class="subtitle">LOFI remix</div>`,
    
  },

  {
    id:13,
    songname:`Bum Diggy Bum Bum <br>
    <div class="subtitle">Sonu ke titu ki sweety</div>`,
    
  },

  {
    id:14,
    songname:`Bekhayali <br>
    <div class="subtitle">Sachet tondon</div>`,
    
  },

  {
    id:15,
    songname:`Kesariyaa <br>
    <div class="subtitle">Arijit Singh</div>`,
    
  }
 
];


//javascript for music app.

let pop_song_left=document.getElementById("pop-song-left");
let pop_song_right=document.getElementById("pop-song-right");

//targeting pop song container

let pop_song=document.querySelector(".pop-song");


//adding an eventlistner for scrolling the popular songs list.

pop_song_right.addEventListener("click",()=>{
  
  pop_song.scrollLeft+=120;
})

pop_song_left.addEventListener("click",()=>{
    pop_song.scrollLeft-=120;
})


//adding event-listener for pop artists

let item=document.querySelector(".item");
let pop_artist_left=document.getElementById("pop-artist-left");
let pop_artist_right=document.getElementById("pop-artist-right");

pop_artist_right.addEventListener("click",()=>{

  item.scrollLeft+=120;
})

pop_artist_left.addEventListener("click",()=>{
  item.scrollLeft-=120;
})

//targeting the song item class by using an array to change the content of the cards.

Array.from(document.getElementsByClassName("songItem")).forEach((e,j)=>{

  e.getElementsByTagName("h5")[0].innerHTML=songs[j].songname;


})

//targeting popular songs card-list seperately.
Array.from(document.getElementsByClassName("render")).forEach((e1,i)=>{
e1.getElementsByTagName("h5")[0].innerHTML=songs[i].songname;


})

// targeting master-play button to play song.

let masterPlay=document.getElementById("masterPlay");


masterPlay.addEventListener("click",()=>{
  if(music.paused || music.currentTime<=0)
  {
       music.play();
       masterPlay.classList.remove("bi-play-fill");
       masterPlay.classList.add("bi-pause-fill");
       document.querySelector(".wave").classList.add("active1");
   
       //make a pause.

       make_pause=document.getElementById(index);
       make_pause.classList.add("bi-pause-circle-fill");
       make_pause.classList.remove("bi-play-circle-fill");

  
  }
  else{
      music.pause();
      masterPlay.classList.remove("bi-pause-fill");
      masterPlay.classList.add("bi-play-fill");
      document.querySelector(".wave").classList.remove("active1");
      make_all_play();
  }
})


//targeting big cards of class play-list play.

Array.from(document.getElementsByClassName("Playlistplay")).forEach((e,i)=>{
  e.addEventListener("click",(el)=>{
    index =el.target.id;
    music.src=`/audio/${index}.mp3`;
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    document.querySelector(".wave").classList.add("active1");

    make_all_play();
    el.target.classList.remove("bi-play-circle-fill");
    el.target.classList.add("bi-pause-circle-fill");
 
    //changing song titles.

    let songTitles = songs.filter((ele)=>{
      return ele.id == index;
    })
    
    songTitles.forEach(els =>{
      let {songname}=els;
      document.getElementById("title").innerHTML=songname;
    })

  })

})

//making all the buttons play.

function make_all_play(){

  Array.from(document.getElementsByClassName("Playlistplay")).forEach((e)=>{
    e.classList.add("bi-play-circle-fill");
    e.classList.remove("bi-pause-circle-fill");
  
  })
}

//adjusting the timeline and seekbar.
let currentStart=document.getElementById("currentStart");
let currentEnd=document.getElementById("currentEnd");

let seek=document.getElementById("seek");
let bar2=document.getElementById("bar2");
let dot=document.getElementById("dot");

//timeupdate event for music.
music.addEventListener("timeupdate",()=>{
let music_curr=music.currentTime;
let music_dur=music.duration;
let min1=Math.floor(music_dur/60); //converting into minutes.
let sec1=Math.floor(music_dur%60); //converting to seconds.

if(sec1 <10)
{
  sec1=`0${sec1}`;
}

currentEnd.innerText=`${min1}:${sec1}`;

let min2=Math.floor(music_curr/60); //converting to the current time in minutes.

let sec2=Math.floor(music_curr%60);

currentStart.innerText=`${min2}:${sec2}`;


//updating seekbar.
let progressbar=parseInt(music_curr/music_dur*100);
seek.value=progressbar;
let seekbar=seek.value;
bar2.style.width=`${seekbar}%`;
dot.style.left=`${seekbar}%`;
})

// adding change event listner to seekbar.

seek.addEventListener("change",()=>{

  music.currentTime=seek.value*music.duration/100;
})



//updating the volume
let vol_icon=document.getElementById("vol-icon");
let vol=document.getElementById("volume");
let volbar=document.querySelector(".volbar");
let voldot=document.querySelector(".voldot");

vol.addEventListener("change",()=>{
  if(vol.value==0)
  {
    vol_icon.classList.remove("bi-volume-up-fill");
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.add("bi-volume-off-fill");
  }

  if(vol.value > 0)
  {
    vol_icon.classList.remove("bi-volume-up-fill");
    vol_icon.classList.add("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-off-fill");
  }
  if(vol.value >50)
  {
    vol_icon.classList.add("bi-volume-up-fill");
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-off-fill");
  }

  let vol_a=vol.value;
  volbar.style.width=`${vol_a}%`;
  voldot.style.left=`${vol_a}%`;
  //increasing volume.

  music.volume=vol_a/100;
})


//fast forward and backward.

let back=document.getElementById("back");
let next=document.getElementById("next");

back.addEventListener("click",()=>{
  
  if(index<1)
  {
    index=1
  }
  else{
    index=index-1;
  }

  
  
  music.src=`/audio/${index}.mp3`;
  music.play();
  masterPlay.classList.remove("bi-play-fill");
  masterPlay.classList.add("bi-pause-fill");
  document.querySelector(".wave").classList.add("active1");

  make_all_play();

  let change=document.getElementById(index);
  change.classList.remove("bi-play-circle-fill"); 
  change.classList.add("bi-pause-circle-fill");
  
  //changing song titles.

  let songTitles = songs.filter((ele)=>{
    return ele.id == index;
  })
  
  songTitles.forEach(els =>{
    let {songname}=els;
    document.getElementById("title").innerHTML=songname;
  })  


})



next.addEventListener("click",()=>{

  if(index>15)
  {
    index=1;
  }
  else{
    index=index+1;
  }


  music.src=`/audio/${index}.mp3`;
  music.play();
  masterPlay.classList.remove("bi-play-fill");
  masterPlay.classList.add("bi-pause-fill");
  document.querySelector(".wave").classList.add("active1");

  make_all_play();

  let change=document.getElementById(index);
  change.classList.remove("bi-play-circle-fill"); 
  change.classList.add("bi-pause-circle-fill");
  
  //changing song titles.

  let songTitles = songs.filter((ele)=>{
    return ele.id == index;
  })
  
  songTitles.forEach(els =>{
    let {songname}=els;
    document.getElementById("title").innerHTML=songname;
  })  


})

  
//sidebar

document.querySelector(".banner").addEventListener("click",()=>{

  sidebar=document.querySelector(".menu-side");

  if(sidebar.style.left=="-1000px"){
    sidebar.style.left="-10px";
  }
  else 
  {
    sidebar.style.left="-1000px";
  }
})




