// 'use strict'
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
	});

	//Реализуем функционал таймера на странице

	const deadline = '2024-02-22T09:09:51.294Z';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			  days = Math.floor(t / (1000 * 60 * 60 * 24)),
			  hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			  minutes = Math.floor((t / (1000 * 60)) % 60),
			  seconds = Math.floor((t / 1000) % 60);

			  return {
				total: t,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds
			  }
	}

	function addZero (time) {
		if (time >= 0 && time < 10) {
			return `0${time}`;
		} else {
			return time;
		}
	}

	function setClock (endtime, selector) {
		const timer = document.querySelector(selector),
			  days = timer.querySelector('#days'),
			  timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);
			days.innerHTML = addZero(t.days);
			hours.innerHTML = addZero(t.hours);
			minutes.innerHTML = addZero(t.minutes);
			seconds.innerHTML = addZero(t.seconds);

			if(t.total <= 1) {
				clearInterval(timeInterval);
				days.innerHTML = '00';
				hours.innerHTML = '00';
				minutes.innerHTML = '00';
				seconds.innerHTML = '00';
			}
		}
	}

	setClock(deadline, '.timer');


	// Реализуем функционал модального окна

	//Получаем наши кнопки по дата атрибутам и наше модальное окно.
	const modalBtn = document.querySelectorAll('[data-modal]'),
		  closeBtn = document.querySelector('[data-close]'),
		  modal = document.querySelector('.modal');

	// Навесим на все наши кнопки открытие модалки
	modalBtn.forEach(item => {
		item.addEventListener('click', () => {
			modal.style.display = 'block'; // Показываем модалку
			document.body.style.overflow = 'hidden'; // Отменяем прокрутку страницы при открытой модалке
		});
	})

	// Напишем функцию закрытия модалки
	function closeModal () {
		modal.style.display = 'none'; // Закрываем модалку
		document.body.style.overflow = 'visible'; // Возвращаем прокрутку
	}

	// Навесим на кнопку крестика закрытие модалки
	closeBtn.addEventListener('click', closeModal);

	// Сделаем закрытие модалки при клике на оверлей 
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	})

	// Закрытие модалки на клавишу ESC
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape') {
			closeModal();
		}
	})
	
})