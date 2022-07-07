

const urlToken = "/token";
const Video = Twilio.Video;

var starttime;
var endtime;
var screenshare = true;
var room;
var type;
let stlyedis = true;
let screenShareTrack = null;
$(document).ready(function () {

  if (cxname == null) {
    document.getElementById('userName').value = params1;
  }
  else {
    document.getElementById('userName').value = cxname;
  }
  document.getElementById('roomName').value = params;

  //displaying logo for customer
  if (cxname == null) {
    document.getElementById('logo').style.display = "none"
  }
  //fetching task sid
  console.log(tasksid, "taskkkkkk")



  let videoRoom = null;
  screenShareTrack = null;
  document.getElementById('turnOnScreenShare').style.display = 'none';
  document.getElementById('turnOffScreenShare').style.display =
    'none';
  $("#joinRoom").click(async function () {

    let userName = $("#userName").val();
    let roomName = $("#roomName").val();
    type = "fetch";
    const body = {
      roomnameofscreen: roomName,
      type: type
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams(body),
    };
    await fetch('https://drab-barracuda-8971.twil.io/syncpathh', options)
      .then(resp => resp.json())

      .then(data => {
        console.log(data, "datttttttttttt");
        console.log(data, "######data")
        if (data.includes(roomName)) {
          console.log("join")
          if (userName && roomName && !videoRoom) {
            RecordParticipantsOnConnect = false;
            if (params1 == null) {
              document.getElementById('turnOnScreenShare').style.display = 'inline';
              document.getElementById('leaveRoom').style.display = 'inline';
            }
            else {
              document.getElementById('leaveRoom').style.display = 'inline';
            }
            document.getElementById('joinRoom').style.display = 'none';
            room = connectToVideoRoom(userName, roomName)
              .then(vr => videoRoom = vr);
          }

        }
        else {
          styledis = false;
          console.log("#########already joined")
          document.getElementById('room-controls').style.display = 'none';
          document.getElementById('hidetext').style.display = 'none';
          document.getElementById('logo').style.display = 'none';

          const errormessage = document.createElement("div");
          errormessage.innerHTML = "Room name has been already expired, new room namehas to be created to join the room "

          document.getElementById("errormsg").appendChild(errormessage);
          document.getElementById("errormsg").style.color = "#D8000C";
          document.getElementById("errormsg").style.background = "#FFBABA";
          document.getElementById("errormsg").style.backgroundImage = "https://i.imgur.com/GnyDvKN.png";
          document.getElementById("errormsg").style.border = "1px solid";
          document.getElementById("errormsg").style.margin = "10px 0px";
          document.getElementById("errormsg").style.padding = "15px 10px 15px 50px";
          document.getElementById("errormsg").style.backgroundRepeat = "no-repeat";
          document.getElementById("errormsg").style.backgroundPosition = "10px center";





        }

      })
      .catch(err => {
        console.log(err)
      })


    window.addEventListener('beforeunload', function (e) {
      // e.preventDefault();
      tidyUp(room);

      // e.returnValue = '';
      // return showADialog(e);
    });

  });
  function tidyUp(room) {
    if (screenshare == true) {
      alert("###########hello")
      // currenttime();
      // const date = new Date();

      // const endtime = date.toLocaleString('en-US', {
      //   timeZone: 'America/Los_Angeles',
      // });

      // console.log(endtime, "startttt");
   
      // const body = {
      //   // date: n,
      //   time: starttime,
      //   time1: endtime,
      //   tasksid: tasksid
      // };
      // console.log(body, "boddddddddddddddyyyy")
      // const options = {
      //   method: 'POST',
      //   body: new URLSearchParams(body),
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      //   }
      // };


      // fetch('https://tumbleweed-penguin-7678.twil.io/screen', options)
      if (room && screenShareTrack) {
        document.getElementById('myDIV').style.display =
          'none';
        document.getElementById('joinRoom').style.display = 'inline';
        document.getElementById('turnOnScreenShare').style.display = 'none';
        document.getElementById('turnOffScreenShare').style.display = 'none';
        document.getElementById('leaveRoom').style.display = 'none';
        screenShareTrack.track.stop();
        screenShareTrack.unpublish();
        screenShareTrack = null;
        //   document.getElementById('roomName').value='';
        //   document.getElementById('roomName').disabled=true;
      }
      else {
        document.getElementById('myDIV').style.display =
          'none';
        document.getElementById('joinRoom').style.display = 'inline';
        document.getElementById('turnOnScreenShare').style.display = 'none';
        document.getElementById('turnOffScreenShare').style.display = 'none';
        document.getElementById('leaveRoom').style.display = 'inline';
        room.disconnect();
        alert("Now you are disconnected")
        room = null;


      }

    }
    return function (event) {
      if (event.persisted) {

        return;
      }
      if (roomName) {
        room.disconnect();

        videoRoom = null;
      }


    }
  }
  $("#leaveRoom").click(async function () {

    document.getElementById('remote-media-div').style.display = "none"
    let roomName = $("#roomName").val();
    console.log(roomName, "##########rommm####")
    type = "leave"
    const body = {
      roomnameofscreen: roomName,
      type: type
    }
    console.log(body, "boddddddddddddddyyyy")
    const options = {
      method: 'POST',
      body: new URLSearchParams(body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };

    //   fetch('https://tumbleweed-penguin-7678.twil.io/ssssss', options)
    //   .then(resp => resp.json())
    //   .then(data => console.log(data));
    await fetch('https://drab-barracuda-8971.twil.io/syncpathh', options)

    //  ............................old code......................................................
    // if(videoRoom){
    //     document.getElementById('myDIV').style.display =
    //     'none';
    //     document.getElementById('joinRoom').style.display ='inline';
    //     document.getElementById('turnOnScreenShare').style.display = 'none';
    //     document.getElementById('turnOffScreenShare').style.display = 'none';
    //     document.getElementById('leaveRoom').style.display = 'none';
    //     videoRoom.disconnect();
    //     alert("Now you are disconnected")
    //     videoRoom = null;
    // }
    //   ........................................................
    if (videoRoom && screenShareTrack) {
      document.getElementById('myDIV').style.display =
        'none';
      document.getElementById('joinRoom').style.display = 'inline';
      document.getElementById('turnOnScreenShare').style.display = 'none';
      document.getElementById('turnOffScreenShare').style.display = 'none';
      document.getElementById('leaveRoom').style.display = 'none';
      screenShareTrack.track.stop();
      screenShareTrack.unpublish();
      screenShareTrack = null;
      //   document.getElementById('roomName').value='';
      //   document.getElementById('roomName').disabled=true;
    }
    else {
      document.getElementById('myDIV').style.display =
        'none';
      document.getElementById('joinRoom').style.display = 'inline';
      document.getElementById('turnOnScreenShare').style.display = 'none';
      document.getElementById('turnOffScreenShare').style.display = 'none';
      document.getElementById('leaveRoom').style.display = 'inline';
      videoRoom.disconnect();
      alert("Now you are disconnected")
      videoRoom = null;


    }



  })

  $("#turnOnScreenShare").click(async function () {
    if (videoRoom) {



      publishVideoTrack(videoRoom)
        .then(track => screenShareTrack = track);
      // const date = new Date();

      // starttime = date.toLocaleString('en-US', {
      //   timeZone: 'America/Los_Angeles',
      // });

      // console.log(starttime, "startttt");

     

    }
    else {
      alert("please start a video room")
    }
  });

//   async function convertTZ(date, tzString) {
//     return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
//   }
//   async function currenttime() {
//     const date = new Date();
//     var d = await convertTZ(date, "Asia/Manila")

//     var year = d.getFullYear()
//     var month = (d.getMonth() + 1)
//     var day = d.getDate()
//     var hr = d.getHours()
//     var min = d.getMinutes()
//     var sec = d.getSeconds();
//     // console.log("d",d);
//     if (day < 10) {
//       day = '0' + day;
//     }

//     if (month < 10) {
//       month = '0' + month;
//     }
//     if (hr < 10) {
//       hr = '0' + hr;
//     }
//     if (min < 10) {
//       min = '0' + min;
//     }
//     if (sec < 10) {
//       sec = '0' + sec;
//     }
// endtime = year + "-" + month + "-" + day + " " + hr + ":" + min + ":" + sec;
//   console.log(endtime,"endtime####")
//   const body = {
//     // date: n,
//     time: starttime,
//     time1: endtime,
//     tasksid: tasksid
//   };
//   console.log(body, "boddddddddddddddyyyy")
//   const options = {
//     method: 'POST',
//     body: new URLSearchParams(body),
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//     }
//   };


  // await fetch('https://tumbleweed-penguin-7678.twil.io/screen', options)
  // }
  $("#turnOffScreenShare").click(async function () {

    screenshare = false;


    if (videoRoom && screenShareTrack) {

      // console.log(endtime)
      // await currenttime();
      // const endtime = date.toLocaleString('en-US', {
      //   timeZone: 'America/Los_Angeles',
      // });

      // console.log(currenttime.endtime, "ennnnnnnddd");

      // const body = {
      //   // date: n,
      //   time: starttime,
      //   time1: endtime,
      //   tasksid: tasksid
      // };
      // console.log(body, "boddddddddddddddyyyy")
      // const options = {
      //   method: 'POST',
      //   body: new URLSearchParams(body),
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      //   }
      // };


      // await fetch('https://tumbleweed-penguin-7678.twil.io/screen', options)

      document.getElementById('turnOnScreenShare').style.display = 'inline';
      document.getElementById('turnOffScreenShare').style.display =
        'none';
      screenShareTrack.track.stop();
      screenShareTrack.unpublish();
      screenShareTrack = null;
    }
  });

});


async function publishVideoTrack(videoRoom) {
  try {
    async function convertTZ(date, tzString) {
      return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
    }
    // document.getElementById('turnOnScreenShare').style.display = 'none';
    // document.getElementById('turnOffScreenShare').style.display =
    //   'inline';
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const screenTrack = new Video.LocalVideoTrack(stream.getVideoTracks()[0], { name: 'myscreenshare' });
    console.log(stream, screenTrack, "#####screentrack")
    screenShareTrack = await videoRoom.localParticipant.publishTrack(screenTrack);
    screenShareTrack.track.once('stopped', () => {
      console.log("#####1")
      videoRoom.localParticipant.unpublishTrack(screenShareTrack.track);
      document.getElementById('turnOnScreenShare').style.display = 'inline';
      document.getElementById('turnOffScreenShare').style.display =
        'none';
    });
    if (screenTrack.isStarted) {
      const date = new Date();
      var d = await convertTZ(date, "Asia/Manila")
  
      var year = d.getFullYear()
      var month = (d.getMonth() + 1)
      var day = d.getDate()
      var hr = d.getHours()
      var min = d.getMinutes()
      var sec = d.getSeconds();
      // console.log("d",d);
      if (day < 10) {
        day = '0' + day;
      }
  
      if (month < 10) {
        month = '0' + month;
      }
      if (hr < 10) {
        hr = '0' + hr;
      }
      if (min < 10) {
        min = '0' + min;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }
  starttime = year + "-" + month + "-" + day + " " + hr + ":" + min + ":" + sec;
    console.log(starttime,"starttime####")
      // const date = new Date();

      // starttime = date.toLocaleString('en-US', {
      //   timeZone: 'America/Los_Angeles',
      // });

      // console.log(starttime, "startttt");
      // screenShareTrack.track.once('started', () => {
      console.log("#####screentrack2")
      //   // videoRoom.localParticipant.unpublishTrack(screenShareTrack.track);
      document.getElementById('turnOnScreenShare').style.display = 'none';
      document.getElementById('turnOffScreenShare').style.display = 'inline';

      // });
    }

    return screenShareTrack;
  }
  catch (err) {
    console.log(err);
  }


}

async function connectToVideoRoom(userName, roomName) {

  const url = `${urlToken}?identity=${encodeURIComponent(userName)}&roomname=${encodeURIComponent(roomName)}`

  console.log(url, "urlllll");

  try {
    const response = await axios.get(url);
    const token = response.data.token;
    console.log(token, "tokennnnnnnnnnn")
    const videoRoom = await Video.connect(token, {
      name: roomName,
      tracks: []
    });
    alert("Now you are connected to room " + roomName);
    //checking if username exists or not in query params to display disclaimer
    if (params1 == null) {
      const para = document.createElement("p");
      para.innerHTML = "Do not share any confidential details such as Personal, Payment related details etc";

      // Append to another element:
      document.getElementById("myDIV").appendChild(para);
    }
    videoRoom.participants.forEach(participant => {
      console.log(`Participant "${participant.identity}" is connected to the Room`);
      addParticipantInfo(participant);
    });

    videoRoom.on('participantConnected', function (participant) {
      console.log(participant.identity + ' has connected');
      addParticipantInfo(participant);
      console.log(participant, "particlipant name")
    });

    videoRoom.once('participantDisconnected', participant => {
      console.log(`Participant "${participant.identity}" has disconnected from the Room`);
      removeParticipant(participant);
      //       let screenShareTrack = videoRoom.localParticipant.publishTrack(screenTrack);
      // console.log(videoRoom.participants.size, screenShareTrack,"########yyyyyy")
      if (videoRoom.participants.size == 0 && screenShareTrack) {
        console.log("Stopping screensharing...")
        videoRoom.localParticipant.unpublishTrack(screenShareTrack.track);
        screenShareTrack.track.stop();
        screenShareTrack.unpublish();
        screenShareTrack = null;
      }
      else {
        console.info("Screensharing not stopped");
      }
    });

    videoRoom.once('disconnected', function () {
      videoRoom.participants.forEach(participant => {

        removeParticipant(participant);
      });
      console.log('You left the Room:', videoRoom.name);

    });

    return videoRoom;
  } catch (err) {
    console.error(err);
  }

}

async function addParticipantInfo(participant) {
  const divParticipant = document.createElement("div");
  divParticipant.setAttribute("id", participant.identity);

  const h6 = document.createElement("h6");
  const textNode = document.createTextNode(participant.identity + " is in the room");
  h6.appendChild(textNode);

  divParticipant.appendChild(h6);
  document.getElementById('remote-media-div').appendChild(divParticipant);
  document.getElementById("remote-media-div").style.color = "black";
  document.getElementById("remote-media-div").style.height = "20x";
document.getElementById('remote-media-div').style.background="grey"
  // document.getElementById("remote-media-div").style.borderRadius = "5%";
  document.getElementById("remote-media-div").style.textAlign = "center";
  document.getElementById("remote-media-div").style.marginTop = "0%";
  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      const track = publication.track;

      divParticipant.appendChild(track.attach());

    }
  });

  participant.on('trackSubscribed', track => {

    const divParticipantVideo = document.createElement("div");
    divParticipantVideo.setAttribute("id", participant.identity + "_video");
    divParticipantVideo.appendChild(track.attach())

    document.getElementById(participant.identity).appendChild(divParticipantVideo);
    // track.on('message', data => {
    //   const { mouseDown, mouseCoordinates: { x, y } } = JSON.parse(data);
    //   if (mouseDown) {
    //     drawCircle(canvas, color, x, y);
    //   }
    // });
  });

  participant.on('trackUnpublished', publication => {
    document.getElementById(participant.identity + "_video").remove();

  })

}

async function removeParticipant(participant) {
  let element = document.getElementById(participant.identity);
  element.remove();


}


// export const inxFnc = indexFnc;