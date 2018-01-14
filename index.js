var clockModule = angular.module("ng.clock", []);

clockModule.directive("digitalClock", function ($filter, $interval) {
	return {
		restrict: "AEC",
		replace: true,
		scope: {
			seconds: "@"
		},
		template:
		'<div>\n' +
		"<span>{{time.hours + (time.showColon && !seconds ? ' ':':') + time.minutes + (seconds ? ':'+time.seconds:'')}}</span>\n" +
		"</div>",
		link: function (scope, element, attrs) {
			scope.time = {};
			scope.time.showColon = true;
			$interval(function () {
				var time = new Date();
				scope.time.hours = $filter("date")(time, "HH");
				scope.time.minutes = $filter("date")(time, "mm");
				scope.time.seconds = $filter("date")(time, "ss");
				scope.time.showColon = !scope.time.showColon;
			}, 1000);
		}
	};
});

clockModule.directive("analogClock", function ($interval) {
	return {
		restrict: "AEC",
		replace: true,
		scope: {
			clockId: "@",
			clockClass: "@",
			clockDim: "@",
			secHand: "@",
			secColor: "@",
			minColor: "@",
			hourColor: "@",
			mainHandsColor: "@",
			numColor: "@"
		},
		template:
		"<div>" +
		"<canvas></canvas>" +
		"</div>",
		link: function (scope, element, attrs) {
			if (scope.clockId) element[0].id = scope.clockId;
			if (scope.clockClass) element[0].className += " " + scope.clockClass;
			var canvas = element[0].children[0];
			// var canvas = document.getElementById("aClock");
			if (!scope.clockDim) scope.clockDim = 90;
			if (scope.secColor && !scope.secHand) scope.secHand = true;
			if (!scope.secColor) scope.secColor = 'black';
			if (!scope.minColor) scope.minColor = 'black';
			if (!scope.hourColor) scope.hourColor = 'black';
			if (!scope.numColor) scope.numColor = 'black';
			if (scope.mainHandsColor) {
				scope.minColor = scope.mainHandsColor;
				scope.hourColor = scope.mainHandsColor;
			}
			if (canvas) {
				canvas.width = scope.clockDim;
				canvas.height = scope.clockDim;
				var ctx = canvas.getContext("2d");
				var radius = canvas.height / 2;
				ctx.translate(radius, radius);
				radius = Math.round(radius * 0.9);
				$interval(drawClock, 1000);
				
				function drawClock() {
					// ctx.arc(0, 0, radius, 0, 2 * Math.PI);
					// ctx.fillStyle = "white";
					// ctx.fill();
					ctx.save();
					ctx.translate(-radius, -radius);
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.restore();
					drawFace(ctx, radius);
					drawNumbers(ctx, radius, scope.numColor);
					drawTime(ctx, radius);
				}
				
				function drawFace(ctx, radius) {
					// var grad;
					// ctx.beginPath();
					// ctx.arc(0, 0, radius, 0, 2 * Math.PI);
					// ctx.fillStyle = 'white';
					// ctx.fill();
					// grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
					// grad.addColorStop(0, '#fff');
					// grad.addColorStop(0.5, 'white');
					// grad.addColorStop(1, '#fff');
					// ctx.strokeStyle = grad;
					// ctx.lineWidth = radius * 0.1;
					// ctx.stroke();
					// ctx.beginPath();
					// ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
					// ctx.fillStyle = '#fff';
					// ctx.fill();
				}
				
				function drawNumbers(ctx, radius, color) {
					var ang;
					var num;
					ctx.font = radius * 0.15 + "px arial";
					ctx.textBaseline = "middle";
					ctx.textAlign = "center";
					for (num = 1; num < 13; num++) {
						ang = num * Math.PI / 6;
						ctx.rotate(ang);
						ctx.translate(0, -radius * 0.85);
						ctx.rotate(-ang);
						ctx.beginPath();
						ctx.arc(1, 1, 2, 0, 2 * Math.PI);
						ctx.fillStyle = color;
						ctx.fill();
						ctx.rotate(ang);
						ctx.translate(0, radius * 0.85);
						ctx.rotate(-ang);
					}
				}
				
				function drawTime(ctx, radius) {
					var now = new Date();
					var hour = now.getHours();
					var minute = now.getMinutes();
					var second = now.getSeconds();
					//hour
					hour = hour % 12;
					hour =
						hour * Math.PI / 6 +
						minute * Math.PI / (6 * 60) +
						second * Math.PI / (360 * 60);
					drawHand(ctx, hour, radius * 0.5, radius * 0.07, scope.hourColor);
					//minute
					minute = minute * Math.PI / 30 + second * Math.PI / (30 * 60);
					drawHand(ctx, minute, radius * 0.8, radius * 0.07, scope.minColor);
					// second
					if (scope.secHand) {
						second = (second * Math.PI / 30);
						drawHand(ctx, second, radius * 0.9, radius * 0.02, scope.secColor);
					}
				}
				
				function drawHand(ctx, pos, length, width, color) {
					ctx.beginPath();
					ctx.lineWidth = width;
					ctx.lineCap = "round";
					ctx.moveTo(0, 0);
					ctx.rotate(pos);
					ctx.lineTo(0, -length);
					ctx.strokeStyle = color;
					ctx.stroke();
					ctx.rotate(-pos);
				}
			}
		}
	};
});
