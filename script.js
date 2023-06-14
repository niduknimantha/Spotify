const songData = [
  {
    name: "Nurangana",
    artist: "Nimazz",
    src: "song1",
  },
  {
    name: "Ranwan Maldam",
    artist: "Nimazz",
    src: "song2",
  },
  {
    name: "Wisithuru Mal",
    artist: "Nimazz",
    src: "song3",
  },
  {
    name: "Dasin Pa Ma",
    artist: "Nimazz",
    src: "song4",
  },
  {
    name: "Me Sansare",
    artist: "Nimazz",
    src: "song5",
  },
  {
    name: "Rawatuna Tharam",
    artist: "Nimazz",
    src: "song6",
  },
  {
    name: "Gimhanaye Pawela",
    artist: "Nimazz",
    src: "song7",
  },
  {
    name: "Oya Datha",
    artist: "Nimazz",
    src: "song8",
  },
  {
    name: "Pal",
    artist: "Nimazz",
    src: "song9",
  },
  {
    name: "Wedimal Obe",
    artist: "Nimazz",
    src: "song10",
  },
  {
    name: "Mata Samawenna",
    artist: "Nimazz",
    src: "song11",
  },
  {
    name: "Mihiravi",
    artist: "Nimazz",
    src: "song12",
  },
  {
    name: "Dawasaka Therei",
    artist: "Nimazz",
    src: "song13",
  },
  {
    name: "Sandaganawa",
    artist: "Nimazz",
    src: "song14",
  },
  {
    name: "Thamarasa",
    artist: "Nimazz",
    src: "song15",
  },{
    name: "Himi Nathi Senehe",
    artist: "Nimazz",
    src: "song16",
  },{
    name: "Eka Diga Kathawak",
    artist: "Nimazz",
    src: "song17",
  },{
    name: "Duka Nethe",
    artist: "Nimazz",
    src: "song18",
  },{
    name: "Pinwantha Wu Oya",
    artist: "Nimazz",
    src: "song19",
  },{
    name: "Awa Se A Dura Giya",
    artist: "Nimazz",
    src: "song20",
  },{
    name: "Dawasak Ewi Apith",
    artist: "Nimazz",
    src: "song21",
  },{
    name: "Asi Piyawillak Gane",
    artist: "Nimazz",
    src: "song22",
  },{
    name: "Hama Heenema",
    artist: "Nimazz",
    src: "song23",
  },{
    name: "Mage Thani Preme",
    artist: "Nimazz",
    src: "song24",
  },{
    name: "Man Pathanawa",
    artist: "Nimazz",
    src: "song25",
  },{
    name: "Mandaram Kathawe",
    artist: "Nimazz",
    src: "song26",
  },{
    name: "Me As Diha Balan",
    artist: "Nimazz",
    src: "song27",
  },{
    name: "Pem Sihine",
    artist: "Nimazz",
    src: "song28",
  },{
    name: "Sanda Renu Galana",
    artist: "Nimazz",
    src: "song29",
  },{
    name: "Seerunu Hadawatha Pela",
    artist: "Nimazz",
    src: "song30",
  },{
    name: "Hadawatha Gahena",
    artist: "Nimazz",
    src: "song31",
  },
];

const container = document.querySelector(".container");
const songName = document.querySelector(".song-name");
const songArtist = document.querySelector(".song-artist");
const cover = document.querySelector(".cover");
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const audio = document.querySelector(".audio");
const songTime = document.querySelector(".song-time");
const songProgress = document.querySelector(".song-progress");
const coverArtist = document.querySelector(".cover span:nth-child(1)");
const coverName = document.querySelector(".cover span:nth-child(2)");

let songIndex = 0;

window.addEventListener("load", () => {
  loadSong(songIndex);
});

const loadSong = (index) => {
  coverName.textContent = songData[index].name;
  coverArtist.textContent = songData[index].artist;
  songName.textContent = songData[index].name;
  songArtist.textContent = songData[index].artist;
  audio.src = `music/${songData[index].src}.mp3`;
};

const playSong = () => {
  container.classList.add("pause");
  cover.classList.add("rotate");
  playPauseBtn.firstElementChild.className = "fa-solid fa-pause";
  audio.play();
};

const pauseSong = () => {
  container.classList.remove("pause");
  cover.classList.remove("rotate");
  playPauseBtn.firstElementChild.className = "fa-solid fa-play";
  audio.pause();
};

playPauseBtn.addEventListener("click", () => {
  if (container.classList.contains("pause")) {
    pauseSong();
  } else {
    playSong();
  }
});

const prevSongPlay = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songData.length - 1;
  }

  loadSong(songIndex);
  playSong();
};

const nextSongPlay = () => {
  songIndex++;
  if (songIndex > songData.length - 1) {
    songIndex = 0;
  }

  loadSong(songIndex);
  playSong();
};

prevBtn.addEventListener("click", prevSongPlay);
nextBtn.addEventListener("click", nextSongPlay);

audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let currentTimeWidth = (currentTime / duration) * 100;
  songProgress.style.width = `${currentTimeWidth}%`;

  let songCurrentTime = document.querySelector(".time span:nth-child(1)");
  let songDuration = document.querySelector(".time span:nth-child(2)");

  audio.addEventListener("loadeddata", () => {
    let audioDuration = audio.duration;
    let totalMinutes = Math.floor(audioDuration / 60);
    let totalSeconds = Math.floor(audioDuration % 60);

    if (totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }

    songDuration.textContent = `${totalMinutes}:${totalSeconds}`;
  });

  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
});

songTime.addEventListener("click", (e) => {
  let progressWidth = songTime.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = audio.duration;
  audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;

  playSong();
});

audio.addEventListener("ended", nextSongPlay);