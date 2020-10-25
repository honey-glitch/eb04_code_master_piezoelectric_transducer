var reset = 1;
var speed = 0;
var arr = [0,0,0,0];

function reset1(){
  reset = 1 - reset;
  if(reset){
   for(let i=0;i<4;i++)arr[i] = 0;
   document.getElementById("b_reset").value="Enable Power"; 
   document.querySelector('.one1').style.backgroundColor = "white";
   document.querySelector('.one2').style.backgroundColor = "white";
   document.querySelector('.one3').style.backgroundColor = "white";
   document.querySelector('.one4').style.backgroundColor = "white";
   document.querySelector('.one5').style.backgroundColor = "white";

   document.querySelector('#b_reset').style.backgroundColor = "green";
  }
  else {
    document.getElementById("b_reset").value="Disable Power"; 
    document.querySelector('#b_reset').style.backgroundColor = "red";
  }
  draw(0);
}


function check(){

  var instruction = document.getElementById('instructions');
  var instruct='';
  if( reset == 1 ) instruct = 'Step 1:Enable Power ';
  else if( arr[0]* arr[1]*arr[2]==0) instruct ='Step 2: Select all the equipments.  ';
  else if(arr[3]==0) instruct = 'Step 3:Add wires  ';
  else instruct = "Step 4: Select Gain in dropdown bar and select Pressure. Navigate slider using arrow keys. ";

  instruction.innerHTML = instruct;
}

function hide(section){
   if(!reset){
     console.log(section);
     if(section=='0' && arr[0]*arr[1]*arr[2]==1)
     document.querySelector('.one2').style.backgroundColor = "transparent" ,document.querySelector('.one4').style.backgroundColor = "transparent" , arr[3]=1;
     else if(section=='1')
     document.querySelector('.one1').style.backgroundColor = "transparent" , arr[0]=1; 
     else if(section=='3')
     document.querySelector('.one3').style.backgroundColor = "transparent" ,arr[1]=1;
     else if(section=='5')
     document.querySelector('.one5').style.backgroundColor = "transparent" ,arr[2]=1;
   }
  draw(0);
}

function redraw(){
  
    var gain = document.querySelector('#plan').value;
    var pressure = document.querySelector('#pressure').value;
    document.querySelector('#pressure1').value = pressure;
    if(gain==0)gain=1;
    speed = (gain*pressure)/40;
    console.log(gain);
    draw(speed/2);
}

  function draw(speed)
{     
  

  var  canvas = document.getElementById("canvas2");
  var  context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width, canvas.height);
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2 + 40;
  var radius = canvas.height/2 + 20;

  context.beginPath();
  context.arc(centerX, centerY, radius, Math.PI*0.10, Math.PI*-1.1, true);

  var gradience = context.createRadialGradient(centerX, centerY, radius-radius/2, centerX, centerY, radius-radius/8);
   gradience.addColorStop(0, '#ffffff');
   gradience.addColorStop(1, '#0A1F44');

   context.fillStyle = gradience;
   context.fill();
   context.closePath();
   context.restore();

context.beginPath();
context.strokeStyle = 'crimson';
context.translate(centerX,centerY);
var increment = 5;
context.font="15px Helvetica";
for (var i=-18; i<=18; i++)
{
angle = Math.PI/30*i;
sineAngle = Math.sin(angle);
cosAngle = -Math.cos(angle);

if (i % 4 == 0) {
context.lineWidth = 8;
iPointX = sineAngle *(radius -radius/4);
iPointY = cosAngle *(radius -radius/4);
oPointX = sineAngle *(radius -radius/7);
oPointY = cosAngle *(radius -radius/7);

wPointX = sineAngle *(radius -radius/2.5);
wPointY = cosAngle *(radius -radius/2.5);
context.fillText(2*(i+18)*increment,wPointX-13,wPointY+4);
}
else
{
context.lineWidth = 2; 			
iPointX = sineAngle *(radius -radius/5.5);
iPointY = cosAngle *(radius -radius/5.5);
oPointX = sineAngle *(radius -radius/7);
oPointY = cosAngle *(radius -radius/7);
}
context.beginPath();
context.moveTo(iPointX,iPointY);
context.lineTo(oPointX,oPointY);
context.stroke();
context.closePath();
}
var numOfSegments = speed/increment;
numOfSegments = numOfSegments -18;
angle = Math.PI/30*numOfSegments;
sineAngle = Math.sin(angle);
cosAngle = -Math.cos(angle);
pointX = sineAngle *(3/4*radius);
pointY = cosAngle *(3/4*radius);

context.beginPath();
context.strokeStyle = '#000000';
context.arc(0, 0, 19, 0, 2*Math.PI, true);
context.fill();
 context.closePath();

context.beginPath();    	
context.lineWidth=6;
context.moveTo(0,0);
    context.lineTo(pointX,pointY);
    context.stroke();
    context.closePath();
    context.restore();
    context.translate(-centerX,-centerY);

document.getElementById("demo").innerHTML = 2*speed;    
 check();
}