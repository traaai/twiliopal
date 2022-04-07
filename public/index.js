const urlToken = "/token";
const Video = Twilio.Video;

$(document).ready(function(){
    let videoRoom = null;
    let screenShareTrack = null;

    $("#joinRoom").click(function(){
        let userName = $("#userName").val();
        let roomName = $("#roomName").val();

        if(userName && roomName && !videoRoom){

            connectToVideoRoom(userName, roomName)
                        .then(vr => videoRoom=vr);
        }
    });

    $("#leaveRoom").click(function(){
        if(videoRoom){
            videoRoom.disconnect();
            alert("Now you are disconnected")
            videoRoom = null;
        }
    })

    $("#turnOnScreenShare").click(function(){
        if(videoRoom){
            publishVideoTrack(videoRoom)
                .then(track =>screenShareTrack = track );
        }
        else
        {
            alert("please start a video room")
        }
    });

    $("#turnOffScreenShare").click(function(){
        if(videoRoom && screenShareTrack){

            screenShareTrack.track.stop();
            screenShareTrack.unpublish();
            screenShareTrack = null;
        }
    });

});

async function publishVideoTrack(videoRoom){
    try{
        const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
        const screenTrack = new Video.LocalVideoTrack(stream.getVideoTracks()[0], {name:'myscreenshare'});
    
        let screenShareTrack = await videoRoom.localParticipant.publishTrack(screenTrack);
        return screenShareTrack;
    }
    catch(err){
        console.log(err);
    }
    

}

async function connectToVideoRoom(userName, roomName){
    const url = `${urlToken}?identity=${encodeURIComponent(userName)}&roomname=${encodeURIComponent(roomName)}`
    try{
        const response = await axios.get(url);
        const token = response.data.token;

        const videoRoom = await Video.connect(token,{
            name: roomName,
            tracks:[]
        });
        alert("Now you are connected to room "  + roomName);
        videoRoom.participants.forEach(participant => {
            console.log(`Participant "${participant.identity}" is connected to the Room`);
            addParticipantInfo(participant);
          });

        videoRoom.on('participantConnected', function(participant) {
            console.log(participant.identity + ' has connected');
            addParticipantInfo(participant);
        });

        videoRoom.once('participantDisconnected', participant => {
            console.log(`Participant "${participant.identity}" has disconnected from the Room`);
            removeParticipant(participant);
        });

        videoRoom.once('disconnected', function() {
            videoRoom.participants.forEach(participant => {

                removeParticipant(participant);
              });
            console.log('You left the Room:', videoRoom.name);
            
        });

        return videoRoom;
    }catch(err){
        console.error(err);
    }

}

async function addParticipantInfo(participant){
    const divParticipant = document.createElement("div");
    divParticipant.setAttribute("id", participant.identity);

    const h6 = document.createElement("h6");
    const textNode = document.createTextNode(participant.identity + " is in the room");
    h6.appendChild(textNode);

    divParticipant.appendChild(h6);
    document.getElementById('remote-media-div').appendChild(divParticipant);

    participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          const track = publication.track;

          divParticipant.appendChild(track.attach());

        }
      });
    
      participant.on('trackSubscribed', track => {

        const divParticipantVideo = document.createElement("div");
        divParticipantVideo.setAttribute("id", participant.identity+"_video");
        divParticipantVideo.appendChild(track.attach())

        document.getElementById(participant.identity).appendChild(divParticipantVideo);


      });

    participant.on('trackUnpublished',publication =>{
        document.getElementById(participant.identity+"_video").remove();

    })

}

async function removeParticipant(participant){
    let element = document.getElementById(participant.identity);
    element.remove();
}
