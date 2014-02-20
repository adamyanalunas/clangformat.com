;(function(document) {
	var preview = document.querySelector('.preview');
	preview.addEventListener('click', function(e) {
		e.preventDefault();

		var hash = e.target.hash,
			id = hash.substring(1, hash.length);

		showDescription(id);
		markSelected(e.target);
	}, false);

	var showDescription = function(id) {
		hideDescriptions();
		document.getElementById(id).style.display = 'block';
	};

	var hideDescriptions = function() {
		var descriptions = document.querySelectorAll('.description'),
			selected = document.querySelectorAll('.selected'),
			i = 0,
			len = 0,
			el = null;

		for(i=0, len=descriptions.length; i<len; i++) {
			el = descriptions[i];
			el.style.display = 'none';
		}

		for(i=0, len=selected.length; i<len; i++) {
			el = selected[i];
			el.className = el.className.replace(/ selected/g, '');
		}
	};

	var markSelected = function(el) {
		el.className += ' selected';
	};
})(document);
