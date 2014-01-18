define (['j.System', 'j.canvas', 'j.camera', 'j.world', 'j.config'],
 function (System, canvas, camera, world, config) {
	var screenSystem = new System({
		masterSystem: true
	});

	screenSystem.preRender = function (scene) {
		canvas.ctx.clearRect(0, 0, canvas.options.width, canvas.options.height);
		if (config.debug) {
			canvas.ctx.lineWidth = 1;
			canvas.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
			for (var x = 0; x < camera.box.end.x; x++) {
					canvas.ctx.beginPath();
					canvas.ctx.moveTo (x * world.unitSize, 0);
					canvas.ctx.lineTo (x * world.unitSize, camera.box.end.y * world.unitSize);
					canvas.ctx.closePath();
					canvas.ctx.stroke();
			}
			for (var y = 0; y < camera.box.end.y; y++) {
					canvas.ctx.beginPath();
					canvas.ctx.moveTo (0 , y * world.unitSize);
					canvas.ctx.lineTo (camera.box.end.x * world.unitSize, y * world.unitSize);
					canvas.ctx.closePath();
					canvas.ctx.stroke();
			}
		}
	};

	return screenSystem;
});