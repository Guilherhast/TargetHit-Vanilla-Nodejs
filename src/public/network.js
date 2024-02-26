// Constants
const scoresUrl = "/api/";


// Variables
let userName = "";

// Functions
// Local functions
function login(){
  const i = document.querySelector('#login input');
  i.value = i.value.trim();
  userName = i.value;
}
function onEnter(event) {
  if(event.key == 'Enter') login();
}

// Network functions

async function getScores(){
  const resp = await fetch(scoresUrl, { cache: "no-cache" });
  const ans = await resp.json();
  return ans;
}

async function postScores(user, clicks, hits){
  if ( user == '') return '';

  const score = {
    name: user,    
    hits: hits,
    clicks: clicks,
  }
  return await sendPostRequest(scoresUrl, score);
}


//
function createFormData(data){
  const str = JSON.stringify(data);
  const fd = new FormData();
  fd.append('data', str);
  return fd;
}

async function sendPostRequest(url, obj) {
  const headers = {
    method: 'POST',
    body: createFormData(obj)
  }
  
  const req = await fetch(url, headers);


  return await req.json();
}
