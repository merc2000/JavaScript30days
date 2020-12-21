let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	//before we start timer we want to clear any existing timer

	clearInterval(countdown);

	const now = Date.now();//in millisec
	const then = now + seconds*1000;
	displayTimeLeft(seconds);//to show the initial count

	displayEndTime(then);

	//the name of timer is countdown so when we stop timer we have to pass it
	countdown = setInterval(()=>{
		const secondsLeft = Math.round((then-Date.now())/1000);

		if(secondsLeft<0){
			clearInterval(countdown);
			return;
		}

		displayTimeLeft(secondsLeft);
	},1000);
}

function displayTimeLeft(seconds){
	const minutes =Math.floor(seconds/60);
	const remainderSeconds = seconds%60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
	
	timerDisplay.textContent = display;
	document.title = display;
}

//for displaying the time after the interval
function displayEndTime(timestamp){
	//new Date converts millisec to a date
	const end = new Date(timestamp);
	const hour=end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button=>button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){
	e.preventDefault();	
	const mins = this.minutes.value;//minutes is the name given to input element
	timer(mins*60);
	this.reset();
});