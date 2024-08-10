const d = new Date();
if (d.getHours() >= 12 && d.getHours() <= 16) {
  document.getElementById("wish").innerHTML = "Good afternoon";
  }
else if (d.getHours() >= 3 && d.getHours() <= 11) {
  document.getElementById("wish").innerHTML = "Good morning";
  }
else {
  document.getElementById("wish").innerHTML = "Good evening";
  };
  
    function showPage(page) {
    // hide all pages
    var pages = document.getElementsByClassName("ui");
    for (var i = 0; i < pages.length; i++) {
      pages[i].style.display = "none";
    }
    // show the selected page
    var selectedPage = document.getElementById(page);
    selectedPage.style.display = "block";
    if (page === "home"){document.getElementById("navopt1").style.color = "white";
    document.getElementById("navopt2").style.color = "grey";}
    else{
    document.getElementById("search").style.display = "block";
    document.getElementById("navopt2").style.color = "white";
    document.getElementById("navopt1").style.color = "grey";
    document.getElementById("wish").style.display = "none"}
  }

// Select all the elements in the HTML page
// and assign them to a variable
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
const music = document.querySelector(".playmusic");
let shufflelist = document.querySelector(".shuffle-track");
let repeatsong = document.querySelector(".rep-track");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
let shuffle = false;
let repeat = false;
 
// Create the audio element for the player
let curr_track = document.createElement('audio');
 
// Define the list of tracks that have to be played
let track_list = [
  {
    name: "ceilings",
    artist: "Lizzy McAlpine",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8e/The_cover_for_the_second_studio_album_by_American_singer-songwriter_Lizzy_McAlpine.jpeg",
    path: "songs/Lizzy McAlpine - ceilings.mp3"
  },
  {
    name: "Motion Sickness",
    artist: "Phoebe Bridgers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhZcVqz02SQxGLvrqWewAQOszxwjZCpYUmVw&usqp=CAU",
    path: "songs/Phoebe Bridgers - Motion Sickness.mp3"
  },
  {
    name: "Let's Fall in Love for the Night",
    artist: "FINNEAS",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR7z-BOIevnP_5N9LHBsaZVASPf5MQ3aDh3Q&usqp=CAU",
    path: "songs/FINNEAS - Let's Fall in Love for the Night.mp3",
  },
  {
    name: "double take",
    artist: "dhruv",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf_qf_EiEDDiE3FTptX8Do0k468mu80d9dmQ&usqp=CAU",
    path: "songs/dhruv - double take.mp3"
  },
  {
    name: "Naked",
    artist: "FINNEAS",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjrtnoMgAB2-lfjtty7TwBLbPW9uTmXAr6A&usqp=CAU",
    path: "songs/FINNEAS - Naked.mp3"
  },
  {
    name: "Midnight Rain",
    artist: "Taylor Swift",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZm3cBeEdbEmP2NbNR3GBlUiMllAo4QpXDHg&usqp=CAU",
    path: "songs/Taylor Swift - Midnight Rain.mp3",
  },
  {
    name: "Call It What You Want",
    artist: "Taylor Swift",
    image: "https://m.media-amazon.com/images/I/71eZBMExRVL._UF1000,1000_QL80_.jpg",
    path: "songs/Taylor Swift - Call It What You Want.mp3"
  },
  {
    name: "All Too Well (10 Minute Version) (Taylor's Version) (From The Vault)",
    artist: "Taylor Swift",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCenZvmUI_7yRYXXJFkYSYv8O76LyPpDIQ_w&usqp=CAU",
    path: "songs/Taylor Swift - All Too Well (10 Minute Version) (Taylor's Version) (From The Vault).mp3"
  },
  {
    name: "Karma",
    artist: "Taylor Swift",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZm3cBeEdbEmP2NbNR3GBlUiMllAo4QpXDHg&usqp=CAU",
    path: "songs/Taylor Swift - Karma.mp3",
  }
];

var a;

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();
 
  // Load a new track
  curr_track.src = a[track_index].path;
  curr_track.load();
 
  // Update details of the track
  track_art.src = a[track_index].image;
  track_name.textContent = a[track_index].name;
  track_artist.textContent = a[track_index].artist;
  
  //Some Adjustments in track name
  if (a[track_index].name.length > 32){
    document.getElementById("name").style.paddingTop = "30px";
  }
 else{
  document.getElementById("name").style.paddingTop = "37px";
 };
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
 
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
}

// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}
 
function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
 
  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa-regular fa-circle-pause fa-2x"></i>';
}
 
function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
 
  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa-regular fa-circle-play fa-2x"></i>';
}
 
function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < a.length - 1)
    track_index += 1;
  else track_index = 0;
  
  if (repeat == true){
    if(track_index === 0){
     track_index = a.length - 1 
    }
    else{track_index -= 1;}
    loadTrack(track_index);
    playTrack();
  }
  else if (shuffle==false){
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
  }
  else if (shuffle == true){
  index = [track_index];
  while (true){
  var rand = Math.floor(Math.random() * 10);
  if (index.includes(rand)===false && rand<a.length){
    index.push(rand);
    break;}}
  track_index = rand;
  loadTrack(track_index);
  playTrack();}
}
 
function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (curr_track.currentTime>3){
    curr_track.currentTime = 0;
  }
  else{
  if (track_index > 0)
    track_index -= 1;
  else track_index = a.length - 1;
   
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value/100);
  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}
 
function seekUpdate() {
  let seekPosition = 0;
 
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
 
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

//Make player visible
function show(){
  document.getElementById("player").style.display = "block";
}
//Load Tracks on Demand
function play1(){
a = track_list;
loadTrack(0);
playTrack();
show();
}

function play2(){
a = track_list;
track_index = 1;
loadTrack(1);
playTrack();
show();
}

function play3(){
a = track_list;
track_index = 2;
loadTrack(2);
playTrack();
show();
}

function play4(){
a = track_list;
track_index = 3;
loadTrack(3);
playTrack();
show();
}

function play5(){
a = track_list;
track_index = 4;
loadTrack(4);
playTrack();
show();
}

function play6(){
a = track_list;
track_index = 5;
loadTrack(5);
playTrack();
show();
}

function play7(){
a = track_list;
track_index = 6
loadTrack(6);
playTrack();
show();
}

function play8(){
a = track_list;
track_index = 7;
loadTrack(7);
playTrack();
show();
}

function play9(){
a = track_list;
track_index = 8;
loadTrack(8);
playTrack();
show();
}

function shuffleTrack(){
  if (shuffle == false){
    shuffle = true;
    shufflelist.style.color = "lime";}
  else{
    shuffle = false;
    shufflelist.style.color = "#c0c0c0";}}
    
function repTrack(){
  if (!repeat){
    repeat = true;
    repeatsong.style.color = "lime";}
  else{
    repeat = false;
    repeatsong.style.color = "#c0c0c0";}}

function Taylor(){
var Taylor_list=[];
let i=0;
while (i<track_list.length){
if (track_list[i].artist === "Taylor Swift"){Taylor_list.push(track_list[i]);
};i++}
a = Taylor_list;
loadTrack(0);
playTrack();
show();
}

function FINNEAS(){
var FINNEAS_list=[];
let i=0;
while (i<track_list.length){
if (track_list[i].artist === "FINNEAS"){FINNEAS_list.push(track_list[i]);
};i++}
a = FINNEAS_list;
loadTrack(0);
playTrack();
show();
}

function dhruv(){
var dhruv_list=[];
let i=0;
while (i<track_list.length){
if (track_list[i].artist === "dhruv"){dhruv_list.push(track_list[i]);
};i++}
a = dhruv_list;
loadTrack(0);
playTrack();
show();
}

function Lizzy(){
var Lizzy_list=[];
let i=0;
while (i<track_list.length){
if (track_list[i].artist === "Lizzy McAlpine"){Lizzy_list.push(track_list[i]);
};i++}
a = Lizzy_list;
loadTrack(0);
playTrack();
show();
}

function Phoebe(){
var Phoebe_list=[];
let i=0;
while (i<track_list.length){
if (track_list[i].artist === "Phoebe Bridgers"){Phoebe_list.push(track_list[i]);
};i++}
a = Phoebe_list;
loadTrack(track_index);
playTrack();
show();
}
