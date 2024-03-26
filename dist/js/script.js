/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
// 'use strict'
document.addEventListener('DOMContentLoaded', () => {
  // Реализуем функционал табов на странице

  const tabContent = document.querySelectorAll('.tabcontent'),
    // Контент наших табов
    tabItems = document.querySelector('.tabheader__items'),
    // Родитель табов
    tabItem = tabItems.querySelectorAll('.tabheader__item'); //Сами табы

  // Пишем функцию, которая скрывает весь контент табов + убирает класс активности у таба
  function hideAllTabs() {
    tabContent.forEach(item => {
      item.classList.remove('tabcontent__show', 'fade');
      item.classList.add('tabcontent__hide');
    });
    tabItem.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }
  ;

  // Пишем функцию, которая показывает контент определенного таба под индексом и добавляет класс активности табу. Так же добавляем анимацию
  function showActiveTab(i = 0) {
    tabContent[i].classList.remove('tabcontent__hide');
    tabContent[i].classList.add('tabcontent__show', 'fade');
    tabItem[i].classList.add('tabheader__item_active');
  }
  ;

  // Вызываем функции, чтобы при загрузки страницы показывался первый таб
  hideAllTabs();
  showActiveTab();

  // Вешаем на родитель табов событие клика. С помощью делегирования событий перебираем наши табы, и если таргет события при клике совпал  с перебираемым табом, то вызываем сначала функцию скрыть все табы, потом показываем контент таба под индексом
  tabItems.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('tabheader__item')) {
      tabItem.forEach((item, i) => {
        if (e.target == item) {
          hideAllTabs();
          showActiveTab(i);
        }
      });
    }
  });

  //Реализуем функционал таймера на странице

  const deadline = '2024-02-22T09:09:51.294Z';
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor(t / (1000 * 60) % 60),
      seconds = Math.floor(t / 1000 % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
  function addZero(time) {
    if (time >= 0 && time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  }
  function setClock(endtime, selector) {
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
      if (t.total <= 1) {
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
    modal = document.querySelector('.modal');

  // Напишем функцию открытия модалки
  function openModal() {
    modal.classList.add('show'); // Показываем модалку
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // Отменяем прокрутку страницы при открытой модалке
  }
  // Навесим на все наши кнопки открытие модалки
  modalBtn.forEach(item => {
    item.addEventListener('click', openModal);
  });

  // Напишем функцию закрытия модалки
  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show'); // Закрываем модалку
    document.body.style.overflow = 'visible'; // Возвращаем прокрутку
  }

  // Сделаем закрытие модалки при клике на оверлей 
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  // Закрытие модалки на клавишу ESC
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  });

  // Реализуем функционал появления модалки через какое-то время (например, 5 сек)
  // const openModalByTimer = setTimeout(openModal, 5000);

  // Реализуем функционал открытия модалки после прокуртки страницы до конца
  // Напишем функцию, которая сравнивает количество отскроленного + высоту показываемого контента со всей высотой документа и открывает модалку. После чего удаляет обработчик события, чтобы не повторялся.
  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);

  // Используем классы

  class MenuCard {
    // Создаем конструктор класса с различными переменными + rest оператор в конце
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src; // Путь к картинке
      this.alt = alt; // Альтернативное название
      this.title = title; // Title
      this.descr = descr; // Описание
      this.price = price; // Цена
      this.classes = classes; // Массив классов для карточек
      this.transfer = 27; // Курс гривны к доллару
      this.parent = document.querySelector(parentSelector); // Получаем родителя наших карточек
      this.changeToUAH(); // Вызываем метод конвертации валюты
    }

    // Метод для конвертации валюты
    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    // Метод рендора наших карточек
    render() {
      const element = document.createElement('div'); // Создали элемент div

      // Если мы не передаем никакие классы в classes, то по умолчанию подставится класс menu__active
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        // Иначе пробегаемся по нашему массиву и присваиваем классы нашему element
        this.classes.forEach(classItem => element.classList.add(classItem));
      }

      // Формируем верстку карточки
      element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
      // Добавляем карточки на страницу
      this.parent.append(element);
    }
  }

  //Напишем функцию получения данных с сервера
  const getResource = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      //Обработаем ошибку
      throw new Error(`Couldnt not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  // Создаем экземпляры нашего класса с различными значениями
  getResource('http://localhost:3000/menu').then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
    });
  });

  // Форма
  const forms = document.querySelectorAll('form'); // Получаем все формы с сайта

  const message = {
    // Создаем объект с сообщениями после нажатия на submit
    loading: 'img/form/spinner.svg',
    success: 'спасибо, скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так'
  };

  // Навесим нашу функцию на каждую форму
  forms.forEach(item => {
    bindPostData(item);
  });

  //Напишем функцию отправки данных на сервер, используя async\await чтобы показать, что код "синхронный"
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json'
      }
    });
    return await res.json();
  };

  //Напишем функцию для отправки данных на сервер, которая будет принимать форму(чтобы проще было внутри функции работаь с конкретной формой)
  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault(); //Отменяем стандартное поведение браузера при нажатии на кнопку формы

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
      form.insertAdjacentElement('afterend', statusMessage); // Эти 4 строки создают нам блок на странице с сообщением для пользователя о процессе отпраки данных с формы

      // МЕТОД ОТПРАВКИ ФОРМЫ С ПОМОЩЬЮ XMLHTTPREQUEST

      // const request = new XMLHttpRequest(); //Создаем реквест
      // request.open('POST', 'server.php'); //Настраиваем его

      // const formData = new FormData(form); // В случае если нам не нужно передавать данные в формате json, можно воспользоваться объектом FormData. Это первый способ передачи данных на сервер. Он собирает все значения из формы и формирует их по типу ключ-значение. В инпутах обязательно должны быть с атрибутом name. Так же важное замечание: Если используется FormData, то устанавливать request.setRequestHeader не нужно, он подставляется автоматически. В противном случае мы получим на сервере пустой массив.

      // request.send(formData); // Отправляем наши данные из FormData

      //Второй способ, если нам нужно отправить данные в формате JSON:
      //Для этого необходимо создать пустой объект и с помощью forEach записать в него значения из FormData. После чего превратить в формат json. В этом случае нам уже необходимо будет устанавливать request.setRequestHeader
      // request.setRequestHeader('Content-type', 'application/json');
      // const formData = new FormData(form);
      // const object = {};
      // formData.forEach(function(value, key) {
      // 	object[key] = value;
      // });
      // const json = JSON.stringify(object);
      // request.send(json);
      //Так же в этом случае необходимо добавить строку в server.php

      // request.addEventListener('load', () => {
      // 	if(request.status === 200) {
      // 		console.log(request.response);
      // 		showThanksMOdal(message.success); // Если все ок, выводим в консоль наши данные и меняем текст сообзения
      // 		form.reset(); // Сбрасываем значения формы
      // 		statusMessage.remove()
      // 	} else {
      // 		showThanksMOdal(message.failure); // Если какая-то ошибка - выводим сообщение
      // 	}
      // });

      // МЕТОД ОТПРАВКИ ФОРМЫ С ПОМОЩЬЮ FETCH

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showThanksMOdal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksMOdal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }
  ;

  // Напишем функцию красивого оповещения пользователя с окном благодарности путем скрытия элемента modal__dialog и встривания на его место окна с благодарностью
  function showThanksMOdal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog'); //Получаем modal__dialog
    prevModalDialog.classList.add('hide'); // Скрываем его
    openModal(); // Вызываем функцию паказа модального окна

    const thanksModal = document.createElement('div'); //Создаем элемент окна благодарности
    thanksModal.classList.add('modal__dialog'); // Добавим ему класс modal__dialog
    thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>
				<div class="modal__title">${message}</div>
			</div>
		`; //Формируем создание верстки для окна благодарности. Тут необходимо помнить, что наш крестик создается динамически, соответственно он не будет получен с помощью аттрибута. Для этого был доработан обработчик события при закрытии модалки добавлением строки e.target.getAttribute('data-close') == '' в условие 

    document.querySelector('.modal').append(thanksModal); // Добавляем элемент на страницу
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000); // Через 4 секунды удаляем окно благодарности, возвращаем модалку и закрываем её
  }

  //СЛАЙДЕР
  //Вариант слайдера №1 (полегче)
  // const slides = document.querySelectorAll('.offer__slide'), //Получаем все слайды
  // 		prev = document.querySelector('.offer__slider-prev'), //Получаем кнопку prev
  // 		next = document.querySelector('.offer__slider-next'), //Получаем кнопку next
  // 		total = document.querySelector('#total'), //Получаем общее количество слайдов
  // 		current = document.querySelector('#current'); //Получаем текущее значение слайда
  // let slideIndex = 1; //Переменная, которая будет привязана к текущему слайду

  // showSlide(slideIndex); //Инициализация слайдера с первого слайда при первоначальной загрузке страницы

  // if (slides.length < 10) { //Условие, при котором добавляем 0, если количество слайдов меньше 10
  // 	total.textContent = `0${slides.length}`;
  // } else {
  // 	total.textContent = slides.length;
  // }

  // function showSlide (n) { //Пишем функцию, которая будет показывать слайды
  // 	if (n > slides.length) {
  // 	slideIndex = 1;
  // 	}

  // 	if (n < 1) {
  // 	slideIndex = slides.length;
  // 	} //Это, так называемое, auto loop. Если доходим до границы, перелистываем на начальный или конечный слайд

  // 	slides.forEach(item => item.style.display = 'none'); //Скрываем все слайды

  // 	slides[slideIndex - 1].style.display = 'block'; //Показываем слайд в зависимости от значения slideIndex

  // 	if (slides.length < 10) {
  // 	current.textContent = `0${slideIndex}`;
  // 	} else {
  // 	current.textContent = slideIndex;
  // 	} //Если текущий слайд меньше 10 - добавляем 0
  // }

  // function plusSlide(n) { //Пишем функцию, которая будет изменять значение slideIndex в зависимости от нажатой кнопки и вызывать функцию показа слайда
  // 	showSlide(slideIndex += n);
  // }

  // prev.addEventListener('click', () => {
  // 	plusSlide(-1);
  // }); //При нажатии на prev уменьшаем slideIndex на 1

  // next.addEventListener('click', () => {
  // 	plusSlide(1);
  // }); //При нажатии на next увеличиваем slideIndex на 1

  //Вариант №2 (посложнее, но с анимацией)
  let offset = 0; //На какое расстояние смещаем слайд
  let slideIndex = 1;
  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    //Обертка
    width = window.getComputedStyle(slidesWrapper).width,
    //Ширина обертки
    slidesField = document.querySelector(".offer__slider-inner"); //Обертка слайдов

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }
  slidesField.style.width = `${100 * slides.length}%`;
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = 'relative';
  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
	  position: absolute;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  z-index: 15;
	  display: flex;
	  justify-content: center;
	  margin-right: 15%;
	  margin-left: 15%;
	  list-style: none;
	`;
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
		box-sizing: content-box;
		flex: 0 1 auto;
		width: 30px;
		height: 6px;
		margin-right: 3px;
		margin-left: 3px;
		cursor: pointer;
		background-color: #fff;
		background-clip: padding-box;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		opacity: .5;
		transition: opacity .6s ease;
	  `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = 1;
  });
  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = 1;
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
      dots.forEach(dot => dot.style.opacity = '0.5');
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
});
/******/ })()
;
//# sourceMappingURL=script.js.map