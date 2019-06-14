export default class mobileMenu{
	set burger(selector){
		this._burger = document.querySelectorAll(selector)[0]
	}
	get burger(){
		return this._burger
	}

	set menu(selector){
		this._menu = document.querySelectorAll(selector)[0]
	}
	get menu(){
		return this._menu;
	}

	set error(message){
		this._error = true;
		this.errorMessage(message + " Меню не работает.");
	}

	set subTitles(selector){
		this._titles = document.querySelectorAll(selector)
	}
	get subTitles(){
		return this._titles
	}

	set subMenu(selector){
		this._subMenu = document.querySelectorAll(selector)
	}
	get subMenu(){
		return this._subMenu
	}


	constructor(settings = {
		burger: ".burger",
		menu: ".mobile-menu",
		submenu: {
			titleSelector: ".mobile-menu__sub-title",
			submenuSelector: ".mobile-menu__submenu",
		},
	}){

		this.settings = settings;

		this.burger = settings.burger;
		this.menu = settings.menu;

		this.subTitles = settings.submenu.titleSelector;
		this.subMenu = settings.submenu.submenuSelector;

		if (!this.burger){
			this.error = "Бургер не найден.";
			return
		}

		if (!this.menu){
			this.error = "Мобильное меню не найдено.";
			return
		}


		this.body = document.getElementsByTagName("body")[0];

		this.state = false;

		this.bindEvents();
	}

	openMenu(){
		this.burger.classList.add("js__active");
		this.menu.classList.add("js__opened");
		this.body.classList.add("js__menu-opened");

		this.state = true;
	}
	closeMenu(){
		this.burger.classList.remove("js__active");
		this.menu.classList.remove("js__opened");
		this.body.classList.remove("js__menu-opened");

		this.state = false;
	}
	toggleMenu(){
		if (this.state)
			this.closeMenu()
		else
			this.openMenu()
	}

	toggleSubmenu(subTitle){
		$(subTitle).toggleClass("js__opened");

		$(subTitle.closest("li").querySelector(".mobile-menu__submenu"))
			.slideToggle(300)
	}

	bindEvents(){

		let self = this;
		this.burger.addEventListener("click", _ => {
			this.toggleMenu();
		});

		if (this.subTitles.length)
			for (var subTitle of this.subTitles)
				subTitle.addEventListener("click", function() {
					self.toggleSubmenu(subTitle);
				});

		document.body.addEventListener("click", event => {
			let $target = $(event.target);

			if (!$target.is(this.burger)
				&& !$(this.burger).has($target).length
				&& !$target.is($(this.menu))
				&& !$(this.menu).has($target).length)
				{
					this.closeMenu()
			}
		});
	}

	errorMessage(message = ""){
		console.error(message);
	}
}