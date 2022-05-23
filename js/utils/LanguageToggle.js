class LanguageToggle {
	constructor() {
		var $langToggleEN = $('.button--language_toggle_en');
		var $langToggleJP = $('.button--language_toggle_jp');
		var currentLang = 0;
		function toggleLangs() {
			if (currentLang == 0) {
				$('[data-lang-jp]').each(function (index) {
					var newText = $(this).attr('data-lang-jp');
					$(this).html(newText);
				});
			} else {
				$('[data-lang-en]').each(function (index) {
					var newText = $(this).attr('data-lang-en');
					$(this).html(newText);
				});
			}

			currentLang = 1 - currentLang;

			if (currentLang == 0) {
				$langToggleEN.addClass('button-secondary');
				$langToggleEN.removeClass('button-primary');
				$langToggleJP.removeClass('button-secondary');
				$langToggleJP.addClass('button-primary');
			} else {
				$langToggleJP.addClass('button-secondary');
				$langToggleJP.removeClass('button-primary');
				$langToggleEN.removeClass('button-secondary');
				$langToggleEN.addClass('button-primary');
			}
		}
		$langToggleEN.click(function (e) {
			e.preventDefault();
			toggleLangs();

		});
		$langToggleJP.click(function (e) {
			e.preventDefault();
			toggleLangs();

		});
	}
}
export { LanguageToggle };
