import $ from "jquery"
import is from "is_js"
import mobileMenu from "./mobile-menu.js"

window.$ = $;
window.jQuery = $;

;(function() {

  // проверяем поддержку
  if (!Element.prototype.matches) {

    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;

  }

})()

;(function() {

  // проверяем поддержку
  if (!Element.prototype.closest) {

    // реализуем
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();

try{
	document.addEventListener("DOMContentLoaded", e => {
		// require("./jquery.fancybox.js")
    require("../js/selectize.min.js")

		// $(".fancybox").fancybox({
		// 	trapFocus: false,
		// 	touch: false,
		// 	loop: true,
		// 	buttons: ["fullscreen", "slideShow", "close", "thumbs"],
		// 	image: {
		// 		preload: true,
		// 	},
		// 	transitionEffect: "slide",
		// })
		
		if (!is.touchDevice())
      $("select:not(.no-selectize)").each((i, el) => {
        $(el).selectize({
          closeAfterSelect: true,
          onChange(){
            $(".selectize-input input").blur()
          }
        })
      })

    window.menu = new mobileMenu({
      burger: ".head__burger",
      menu: ".mobile-menu",
      submenu: {
        titleSelector: ".mobile-menu__sub-title",
        submenuSelector: ".mobile-menu__submenu",
      },
    });
  })

}catch(e){
	console.log(e)
}