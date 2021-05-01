// loader

$(document).ready(function() {

  setTimeout(function() {
  $("#canvas")[0].style.display = "none";
  $(".hide-img")[0].style.display = "flex";
  $(".hide-footer")[0].style.display = "block";
  $(".hide-content")[0].style.display = "flex";
  // $(".hide-bar")[0].style.display = "block";
  // $(".hide-bar")[1].style.display = "block";
  $(".hide-navbar")[0].style.display = "block";
  }, 4200);

	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext('2d');
	var w = canvas.width = window.innerWidth;
	var h = canvas.height = window.innerHeight;
	
	var progressCircle = {
		x: w / 2,
		y: h / 2,
		diameter: 160,
		stroke: 16,
		color: '',
		start: Math.PI * 1.5,
		end: Math.PI * 1.5,
		percentage: 0,
		
		calcPercent: function(percentage) {
			// Set the max to 100
			if (percentage > 100) {	percentage = 100; }
			
			percentage = percentage / 100;
			this.percentage = Math.round(percentage * 100);
			
			// Set where the arcs should end
			this.end = this.start + (Math.PI * 2) * percentage;
			
			// Gradually shift color from red (0deg) to green (120deg)
			this.color = 'hsl(' + this.percentage / 0.8 + ', 100%, 50%)'; 
		},
		
		setColor: function() {
			/*if (this.percentage <= 25) {
				this.color = 'hsl(000, 100%, 50%)';
			}
			else if (this.percentage > 25 && this.percentage <= 50) {
				this.color = 'hsl(040, 100%, 50%)'; 
			} 
			else if (this.percentage > 50 && this.percentage <= 75) {
				this.color = 'hsl(080, 100%, 50%)';
			} 
			else if (this.percentage > 75 && this.percentage < 100) {
				this.color = 'hsl(120, 100%, 50%)';
			}*/
			
			// Set color to blue when 100%
			if (this.percentage == 100) {
				this.color = '#1E90FF';
			}
		},
		
		draw: function() {
			ctx.lineWidth = this.stroke;
			ctx.strokeStyle = this.color;
			ctx.setLineDash([]);
			ctx.globalAlpha = 0.2;
			
			// Inner solid fill of circle
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.diameter, this.start, this.end, false);
			ctx.stroke();
			
			ctx.globalAlpha = 1;
			ctx.setLineDash([1, 4.1]);
			ctx.lineWidth = this.stroke;
			
			// Inner dashed fill of circle
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.diameter, this.start, this.end, false);
			ctx.stroke();
			
			ctx.lineWidth = 1;
			ctx.setLineDash([]);
			
			// Inner solid stroke of circle
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.diameter - this.stroke / 2, 0, Math.PI * 2, false);
			ctx.stroke();
			
			// Outer solid stroke of circle
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.diameter + this.stroke / 2, 0, Math.PI * 2, false);
			ctx.stroke();
			
			ctx.font="700 100px Lato";
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = this.color;
			
			// Outer stroke of percentage text
			ctx.strokeText(this.percentage + '%', this.x, this.y);
			
			// Inner fill of percentage text
			ctx.globalAlpha = 0.2;
			ctx.fillText(this.percentage + '%', this.x, this.y);
			
			range = 10;
			speed = 0.02;
			angle += speed;
			
			// Outer glow
			ctx.shadowBlur = 20 + Math.sin(angle) * range;
			ctx.shadowColor = this.color;
		}
	};
	
	var angle = 0;
	var range = 10;
	var speed = 0.03;
	var t = 0;
	var duration = 12; // in seconds
	
	function loop() {
		window.requestAnimationFrame(loop);
		ctx.clearRect(0, 0, w, h);
		
		t += 100 / (duration * 20);
		progressCircle.calcPercent(t);
		progressCircle.setColor();
		progressCircle.draw();
	}
	
	loop();
	
	window.addEventListener('resize', resize);
	
	function resize() {
		w = canvas.width = window.innerWidth;
		h = canvas.height = window.innerHeight;
	}
});

// Setting current year in copyright

let year = new Date().getFullYear();
$(".current-year")[0].innerHTML= year;

// Scroll-bar

const $progressBar = ("#progressBar");
let totalPageHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = () => {
  let newProgressHeight = (window.pageYOffset / totalPageHeight) * 100;
  progressBar.style.height = `${newProgressHeight}%`;
  progressBar.style.opacity = `${newProgressHeight}%`;
};

// contact-form

const form = document.querySelector("#wf-form-Email-Form");

let fullName = $("#name")[0];
let email = $("#email")[0];
let message = $("#message")[0];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  $(".spinner-border")[0].style.display = "inline-block";
  
  let formData = {
	  name: fullName.value,
      email: email.value,
	  message: message.value
  }

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function() {
	//   console.log(xhr.responseText);
	  if(xhr.responseText == 'success') {
		  window.location.href = "/contact/success.html";
	  }
	  else {
		  window.location.href = "/contact/failure.html";
	  }
  }
  xhr.send(JSON.stringify(formData));
})