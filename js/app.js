
const video_out = document.getElementById('vid-box');

function login(form) {
  var phone = window.phone = PHONE({
    number: form.username.value || 'Anonymous', // listen on username line else Anonymous
    publish_key: process.env.PUBNUB_PUBLISH_KEY_1,
    subscribe_key: process.env.PUBNUB_SUBSCRIBE_KEY_1
  });
  phone.ready(function(){ form.username.style.background='#55ff5b'; });
  phone.receive(function(session){
    session.connected(function(session) { video_out.appendChild(session.video); });
    session.ended(function(session) { video_out.innerHTML=''; });
  });
  return false; 	// So the form does not submit.
}

function makeCall(form){
  if (!window.phone) alert('Login First!');
  else phone.dial(form.number.value);
  return false;
}
