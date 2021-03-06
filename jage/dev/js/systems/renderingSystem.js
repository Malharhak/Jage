define(['j.System', 'j.canvas', 'j.camera', 'j.units', 'j.config', 'j.rendering',
 'j.Shapes'],
 function (System, canvas, camera, units, config, rendering,
 Shapes) {
	var renderingSystem = new System({
		usedComponents: ["renderer"],
		executeInEditMode : true
	});

	renderingSystem.render = function (scene, entity) {
		var renderer = scene.getComponentForEntity("renderer", entity._id);
		var renderingParams = {
			ctx : {
				fillStyle : renderer.color
			},
			angle : entity.transform.angle,
			gizmo : config.engine.debug
		};
		switch (renderer.shape) {
			case Shapes.CIRCLE:
				_.extend(renderingParams, {
					center: entity.transform.position.add(renderer.pivot).add(renderer.properties.center),
					radius: renderer.properties.radius
				});
				rendering.drawCircle(renderingParams);
			break;
			case Shapes.BOX:
				_.extend(renderingParams, {
					center: entity.transform.position.add(renderer.pivot),
					start : renderer.properties.start,
					end : renderer.properties.end
				});
				rendering.drawBox (renderingParams);
			break;
		}
	};


	return renderingSystem;
});