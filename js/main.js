;(function(document) {
	var defaultConfiguration = {
		AccessModifierOffset: '0',
		AlignEscapedNewlinesLeft: 'true',
		AlignTrailingComments: 'false',
		AllowAllParametersOfDeclarationOnNextLine: 'false',
		AllowShortFunctionsOnASingleLine: 'false',
		AllowShortIfStatementsOnASingleLine: 'true',
		AllowShortLoopsOnASingleLine: 'false',
		AlwaysBreakBeforeMultilineStrings: 'false',
		AlwaysBreakTemplateDeclarations: 'false',
		BinPackParameters: 'false',
		BreakBeforeBinaryOperators: 'false',
		BreakBeforeBraces: 'Allman',
		BreakBeforeTernaryOperators: 'false',
		BreakConstructorInitializersBeforeComma: 'false',
		ColumnLimit: '100',
		CommentPragmas: '',
		ConstructorInitializerAllOnOneLineOrOnePerLine: 'false',
		ConstructorInitializerIndentWidth: '0',
		ContinuationIndentWidth: '0',
		Cpp11BracedListStyle: 'false',
		DerivePointerBinding: 'false',
		IndentCaseLabels: 'false',
		IndentFunctionDeclarationAfterType: 'false',
		IndentWidth: '4',
		Language: 'Cpp',
		MaxEmptyLinesToKeep: '2',
		NamespaceIndentation: 'None',
		ObjCSpaceAfterProperty: 'true',
		ObjCSpaceBeforeProtocolList: 'true',
		PenaltyBreakBeforeFirstCallParameter: '100',
		PenaltyBreakComment: '100',
		PenaltyBreakFirstLessLess: '0',
		PenaltyBreakString: '100',
		PenaltyExcessCharacter: '1',
		PenaltyReturnTypeOnItsOwnLine: '20',
		PointerBindsToType: '100',
		SpaceBeforeAssignmentOperators: 'true',
		SpaceBeforeParens: 'Always',
		SpaceInEmptyParentheses: 'false',
		SpacesBeforeTrailingComments: '1',
		SpacesInAngles: 'false',
		SpacesInCStyleCastParentheses: 'false',
		SpacesInContainerLiterals: 'false',
		SpacesInParentheses: 'false',
		Standard: 'Cpp11',
		TabWidth: '4',
		UseTab: 'Never'
	};

	//Initialize out of localStorage
	var userSettings = defaultConfiguration;


	var preview = document.querySelector('.preview');
	preview.addEventListener('click', function(e) {
		e.preventDefault();

		var el;
		if (e.target.hash) {
			el = e.target;
		} else if (e.target.parentNode.hash) {
			el = e.target.parentNode;
		}

		if (!el) return;

		var hash = el.hash,
			id = hash.substring(1, hash.length);

		showDescription(id);
		markSelected(el);
		formatCode(id);
		showDefaultTab(id);
	}, false);


	document.querySelector('.guide').addEventListener('click', function(e) {
		var el = e.target,
			type = el.nodeName;
		if (type === 'BUTTON') {
			e.preventDefault();

			el.classList.add('btn-primary');
			var parentId = el.dataset.target.substring(0, el.dataset.target.indexOf('_'));
			showExample(parentId, el.dataset.target);
		}
	}, false);

	var formatCode = function(id) {
		var selector = '#' + id + ' pre code',
			elements = document.querySelectorAll(selector);

		for(var i=0, len = elements.length; i<len; i++) {
			var el = elements[i];
			if(el.classList.contains('hljs')) continue;

			hljs.highlightBlock(el);
		}
	};

	var showDefaultTab = function(id) {
		var selector = '#' + id + ' button',
			elements = document.querySelectorAll(selector),
			defaultValue = userSettings[id];

		for(var i=0, len = elements.length; i<len; i++) {
			var el = elements[i];
			if(el.textContent === defaultValue) {
				showExample(id, el.dataset.target);
				break;
			}
		}
	};


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
			el.classList.remove('selected');
		}
	};

	var markSelected = function(el) {
		el.classList.add('selected');
	};


	var showExample = function(parent, id) {
		hideExamples(parent);
		var buttons = document.querySelectorAll('#' + parent + ' button');
		for(var i=0, len=buttons.length; i<len; i++) {
			if (buttons[i].dataset.target !== id) {
				buttons[i].classList.remove('btn-primary');
			} else {
				buttons[i].classList.add('btn-primary');
				setPropertyValue(parent, buttons[i].innerText);
				userSettings[parent] = buttons[i].textContent;
			}
		}
		document.getElementById(id).style.display = 'block';
	};

	var hideExamples = function(id) {
		var examples = document.querySelectorAll('#' + id + ' .code-pane');

		for(var i=0, len=examples.length; i<len; i++) {
			examples[i].style.display = 'none';
		}
	}

	var setPropertyValue = function(prop, val) {
		var property = document.querySelector('.preview a[href="#' + prop + '"] .value');
		if (property) {
			property.innerHTML = val;
		}
	}
})(document);
