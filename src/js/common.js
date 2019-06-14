import $ from "jquery"
import is from "is_js"
import mobileMenu from "./mobile-menu.js"

function isScrolledIntoView(elem){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + 10;

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

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
  const hiddenElements = document.querySelectorAll(".main-imgs__imgs-img, .imgs-list__item"),
    showElement = (el) => {
      el.classList.add("animated")
    };

  for (var el of hiddenElements)
    if (isScrolledIntoView(el))
      showElement(el)

  
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

    $(window).on("scroll resize", function(){

      if (!hiddenElements.length)
        return

      for (var el of hiddenElements)
        if (isScrolledIntoView(el))
          showElement(el)
    })
		
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