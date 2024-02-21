document.addEventListener('DOMContentLoaded', () => {
	// Реализуем функционал табов на странице
	const tabContent = document.querySelectorAll('.tabcontent'), // Контент наших табов
	  tabItems = document.querySelector('.tabheader__items'), // Родитель табов
	  tabItem = tabItems.querySelectorAll('.tabheader__item'); //Сами табы

	// Пишем функцию, которая скрывает весь контент табов + убирает класс активности у таба
	function hideAllTabs () {
		tabContent.forEach(item => {
			item.classList.remove('tabcontent__show', 'fade');
			item.classList.add('tabcontent__hide');
		})

		tabItem.forEach(item => {
			item.classList.remove('tabheader__item_active')
		})
	};

	// Пишем функцию, которая показывает контент определенного таба под индексом и добавляет класс активности табу. Так же добавляем анимацию
	function showActiveTab (i = 0) {
		tabContent[i].classList.remove('tabcontent__hide');
		tabContent[i].classList.add('tabcontent__show', 'fade');
		tabItem[i].classList.add('tabheader__item_active');
	};

	// Вызываем функции, чтобы при загрузки страницы показывался первый таб
	hideAllTabs();
	showActiveTab();

	// Вешаем на родитель табов событие клика. С помощью делегирования событий перебираем наши табы, и если таргет события при клике совпал  с перебираемым табом, то вызываем сначала функцию скрыть все табы, потом показываем контент таба под индексом
	tabItems.addEventListener('click', (e) => {
		if (e.target && e.target.classList.contains('tabheader__item')) {
			tabItem.forEach((item, i) => {
				if(e.target == item) {
					hideAllTabs();
					showActiveTab(i);
				}
			})
		}
	})
})