
var pageStage = 1;
var NumWords = 500;
var referWindow = null;
var referCounter = 0;

function timeCheating() {
  if( pageStage == 1 ) {

		document.getElementById("Guidance").style.display = 'none';
		document.getElementById("honbun").style.display = 'none';
		document.getElementById("endBtn").style.display = 'none';
		
		var rTime = ( 250 + Math.round( Math.random()*100 ) ) * 1000;
		rTime = Math.round( rTime / 1000 );
		document.getElementsByName("readingTime")[0].value = rTime;

		var speed = Math.round(NumWords *  60 / rTime);
		document.getElementsByName("readingSpeed")[0].value = speed;
		document.getElementById("Speed").style.display = '';
		document.getElementById("SpeedText").innerHTML = "リーディング速度は、<font color='red'>" + speed + " 語／分</font>でした。<br>引き続き「設問開始」ボタンを押しなさい。";
		pageStage = 2;
	} else { // pageStage == 2
		var duration = Math.round( 300 * 1000 / 1000 );
		document.getElementsByName("duration")[0].value = duration;
		document.forms[0].submit();
	}
}

function timeCheatingSubmit() {
	var rTime = ( 400 + Math.round( Math.random()*100 ) ) * 1000;
	rTime = Math.round( rTime / 1000 );
	document.getElementsByName("replyTime")[0].value = rTime;

	if( referWindow != null ) {
		if(! referWindow.closed) referWindow.close();
		referWindow = null;
	}
	document.getElementsByName("referCounter")[0].value = (referCounter === 0) ? 1 : referCounter;
	document.getElementsByName("duration")[0].value = rTime;
	document.forms[0].submit();
}

function referOpenCheating() {
	referCounter = 1;
	if( ( referWindow == null ) || (referWindow.closed) ) {
		referWindow = window.open("/nagoya-original/lesson/reading.do?reference","reference","toolbar=no,location=no,directories=no,status=yes,menubar=no,resizable=yes,scrollbars=yes,width=600,height=400");
	} else referWindow.focus();
}

function init() {

  const endBtn = document.getElementById("endBtn")
  if (endBtn) {
    endBtn.innerHTML = '<hr></hr><p class="button"><input type="button" id="time-cheating" value="読み終わり"></p>'
    document.getElementById("time-cheating").addEventListener("click", timeCheating);  
  }

  const questionStart = document.getElementById("questionStart")
  if (questionStart) {
    questionStart.innerHTML = '<input type="button" id="time-cheating2" value="設問開始">'
    document.getElementById("time-cheating2").addEventListener("click", timeCheating);
  }

  const redbutton = document.getElementsByClassName("redbutton")[0]
  if (redbutton) {
    redbutton.setAttribute("id", "time-cheating-submit")
    redbutton.setAttribute("onclick", false)
    document.getElementById("time-cheating-submit").addEventListener("click", timeCheatingSubmit);
  }

  const referOpen = document.getElementsByClassName("button")[0]
  if (referOpen) {
    if (referOpen.innerHTML === '<input type="button" onclick="referOpen()" value="本文参照">') {
      referOpen.innerHTML = '<input type="button" id="refer-open-cheating" value="本文参照">'
      document.getElementById("refer-open-cheating").addEventListener("click", referOpenCheating);
    } 
  }
  
}

init()