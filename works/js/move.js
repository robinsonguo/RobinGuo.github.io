function startMove(obj, json, fnEnd) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true;		//假设：所有值都已经到了

		for(var attr in json) {
			var cur = 0;

			if (attr == 'opacity') {
				cur = Math.round(parseFloat($(obj).css(attr))*100);
			} else {
				cur = parseInt($(obj).css(attr));
			}

			var speed = (json[attr]-cur)/5;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);

			if (cur != json[attr]) {
                bStop = false;
            }

			if (attr == 'opacity') {
				$(obj).css('filter', 'alpha(opacity:'+(cur+speed)+')');
				$(obj).css('opacity', (cur + speed)/100);
			} else {
				$(obj).css(attr, cur + speed + 'px');
			}
		}

		if (bStop) {
			clearInterval(obj.timer);
			if (fnEnd) {
                fnEnd();
            }
		}
	}, 30);
}
