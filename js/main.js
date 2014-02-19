// $('.preview').on('click', 'a', function(el) {
// 	console.log(this.href);
// });

;(function(document) {
	var preview = document.querySelector('.preview');
	preview.addEventListener('click', function(e) {
		var hash = e.target.hash,
			id = hash.substring(1, hash.length);

console.log(id);
		showDescription(id);
	}, false);

	var showDescription = function(id) {
		hideDescriptions();
		document.getElementById(id).style.display = 'block';
	};

	var hideDescriptions = function() {
		var descriptions = document.querySelectorAll('.description');
		for(var i=0, len=descriptions.length; i<len; i++) {
			descriptions[i].style.display = 'none';
		}
	};
})(document);
