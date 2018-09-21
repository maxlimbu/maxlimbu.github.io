<script>
function startTime(){
	
	var today = new Date();
	var hr = today.getHours();
	var min = today.getMinutes();
	var sec = today.getSeconds();

	min = checkTime(min);
	sec = checkTime(sec);

	document.getElementById('txt').innterHTML = 
	hr + ":" + min + ":" + sec;

	var time = sectTimeout(startTime, 500);

}

function checkTime(){

if(i < 10) {i = "0" + 1};
return i;
}
</script>