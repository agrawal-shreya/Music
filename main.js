
song_1="";
song_2="";
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0;
right_wrist_y=0;
song_status="not_plaiyng";

scoreLeftWrist=0;
scoreRightWrist=0;

function preload() {
   
    song_1=loadSound("music_1.mp3");
    song_2=loadSound("music2.mp3");
}
function setup() {
    canvas =createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw() {
    image(video,0,0,600,500);
    fill('#FF0000');
    stroke('#FF0000');

    song_1_status = song_1.isPlaying();
    song_2_status = song_2.isPlaying();

    if(scoreRightWrist>0.2){
        circle(right_wrist_x,right_wrist_y,20);
        song_2.stop();        
        if(song_1_status == false){
            song_1.play();
            document.getElementById("play").innerHTML = "Playing - Harry Potter";
        }
    
    }
    if(scoreLeftWrist>0.2){
        circle(left_wrist_x,left_wrist_y,20);
        song_1.stop();
        if(song_2_status == false){
            song_2.play();
            document.getElementById("play").innerHTML = "Playing - Peter Pan";
        }
    }
    
    
}
function play() {
   // song_1.play();
    //song_1.setVolume(1);
   // song_1.rate(1);
       
}

function modelLoaded() {
    console.log("model loaded");
}
function gotPoses(results) {
    if(results.length>0){
        console.log(results);

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;

        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        //console.log("l x"+left_wrist_x+"l y"+left_wrist_y+"r x"+right_wrist_x+"r y"+right_wrist_y);
        
    }
    
}