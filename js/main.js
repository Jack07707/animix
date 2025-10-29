$(document).ready(function () {
	"use strict"; // start of use strict

	/*==============================
	Menu
	==============================*/
	$('.header__btn').on('click', function() {
		$(this).toggleClass('header__btn--active');
		$('.header__nav').toggleClass('header__nav--active');
		$('.body').toggleClass('body--active');

		if ($('.header__search-btn').hasClass('active')) {
			$('.header__search-btn').toggleClass('active');
			$('.header__search').toggleClass('header__search--active');
		}
	});

	/*==============================
	Search
	==============================*/
	$('.header__search-btn').on('click', function() {
		$(this).toggleClass('active');
		$('.header__search').toggleClass('header__search--active');

		if ($('.header__btn').hasClass('header__btn--active')) {
			$('.header__btn').toggleClass('header__btn--active');
			$('.header__nav').toggleClass('header__nav--active');
			$('.body').toggleClass('body--active');
		}
	});

	/*==============================
	Home
	==============================*/



///////////////////////////////carusel///////////////////////////////////////////////////////	
const slider = document.getElementById('sliderBox');
const leftBtn = document.querySelector('.slider-arrow.left');
const rightBtn = document.querySelector('.slider-arrow.right');

leftBtn.addEventListener('click', () => {
  slider.scrollBy({ left: -220, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  slider.scrollBy({ left: 220, behavior: 'smooth' });
});

let isDragging = false;
let startX;
let scrollStart;
let dragMoved = false;

slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragMoved = false;
  startX = e.pageX - slider.offsetLeft;
  scrollStart = slider.scrollLeft;
  slider.classList.add('dragging');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  if (Math.abs(walk) > 5) dragMoved = true;
  slider.scrollLeft = scrollStart - walk;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  slider.classList.remove('dragging');
});

slider.addEventListener('mouseleave', () => {
  isDragging = false;
  slider.classList.remove('dragging');
});

// Блок перехода при перетаскивании
slider.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
	if (dragMoved) {
	  e.preventDefault();
	  dragMoved = false;
	}
  });
});

// Touch
let touchStartX = 0;
slider.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  scrollStart = slider.scrollLeft;
});

slider.addEventListener('touchmove', (e) => {
  const x = e.touches[0].clientX;
  const walk = (x - touchStartX) * 1.5;
  slider.scrollLeft = scrollStart - walk;
});

// Запрет на drag изображений
document.querySelectorAll('.slide-card img').forEach(img => {
  img.addEventListener('dragstart', e => e.preventDefault());
});
	
///////////////////////////carusel/////////////////////////////////////////////////
	$('.home__nav--next').on('click', function() {
		$('.home__carousel, .home__bg').trigger('next.owl.carousel');
	});
	$('.home__nav--prev').on('click', function() {
		$('.home__carousel, .home__bg').trigger('prev.owl.carousel');
	});

	$(window).on('resize', function() {
		var itemHeight = $('.home__bg').height();
		$('.home__bg .item').css("height", itemHeight + "px");
	});
	$(window).trigger('resize');

	/*==============================
	Tabs
	==============================*/
	$('.content__mobile-tabs-menu li').each( function() {
		$(this).attr('data-value', $(this).text().toLowerCase());
	});

	$('.content__mobile-tabs-menu li').on('click', function() {
		var text = $(this).text();
		var item = $(this);
		var id = item.closest('.content__mobile-tabs').attr('id');
		$('#'+id).find('.content__mobile-tabs-btn input').val(text);
	});

	/*==============================
	Section bg
	==============================*/
	$('.section--bg, .details__bg').each( function() {
		if ($(this).attr("data-bg")){
			$(this).css({
				'background': 'url(' + $(this).data('bg') + ')',
				'background-position': 'center center',
				'background-repeat': 'no-repeat',
				'background-size': 'cover'
			});
		}
	});

	/*==============================
	Filter
	==============================*/
	$('.filter__item-menu li').each( function() {
		$(this).attr('data-value', $(this).text().toLowerCase());
	});

	$('.filter__item-menu li').on('click', function() {
		var text = $(this).text();
		var item = $(this);
		var id = item.closest('.filter__item').attr('id');
		$('#'+id).find('.filter__item-btn input').val(text);
	});

	/*==============================
	Scroll bar
	==============================*/
	$('.scrollbar-dropdown').mCustomScrollbar({
		axis: "y",
		scrollbarPosition: "outside",
		theme: "custom-bar"
	});

	$('.accordion').mCustomScrollbar({
		axis: "y",
		scrollbarPosition: "outside",
		theme: "custom-bar2"
	});

	/*==============================
	Morelines
	==============================*/
	$('.card__description--details').moreLines({
		linecount: 6,
		baseclass: 'b-description',
		basejsclass: 'js-description',
		classspecific: '_readmore',
		buttontxtmore: "",
		buttontxtless: "",
		animationspeed: 400
	});

	/*==============================
	Gallery
	==============================*/
	var initPhotoSwipeFromDOM = function(gallerySelector) {
		// parse slide data (url, title, size ...) from DOM elements 
		// (children of gallerySelector)
		var parseThumbnailElements = function(el) {
			var thumbElements = el.childNodes,
				numNodes = thumbElements.length,
				items = [],
				figureEl,
				linkEl,
				size,
				item;

			for(var i = 0; i < numNodes; i++) {

				figureEl = thumbElements[i]; // <figure> element

				// include only element nodes 
				if(figureEl.nodeType !== 1) {
					continue;
				}

				linkEl = figureEl.children[0]; // <a> element

				size = linkEl.getAttribute('data-size').split('x');

				// create slide object
				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};

				if(figureEl.children.length > 1) {
					// <figcaption> content
					item.title = figureEl.children[1].innerHTML; 
				}

				if(linkEl.children.length > 0) {
					// <img> thumbnail element, retrieving thumbnail url
					item.msrc = linkEl.children[0].getAttribute('src');
				} 

				item.el = figureEl; // save link to element for getThumbBoundsFn
				items.push(item);
			}

			return items;
		};

		// find nearest parent element
		var closest = function closest(el, fn) {
			return el && ( fn(el) ? el : closest(el.parentNode, fn) );
		};

		// triggers when user clicks on thumbnail
		var onThumbnailsClick = function(e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;

			var eTarget = e.target || e.srcElement;

			// find root element of slide
			var clickedListItem = closest(eTarget, function(el) {
				return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
			});

			if(!clickedListItem) {
				return;
			}

			// find index of clicked item by looping through all child nodes
			// alternatively, you may define index via data- attribute
			var clickedGallery = clickedListItem.parentNode,
				childNodes = clickedListItem.parentNode.childNodes,
				numChildNodes = childNodes.length,
				nodeIndex = 0,
				index;

			for (var i = 0; i < numChildNodes; i++) {
				if(childNodes[i].nodeType !== 1) { 
					continue; 
				}

				if(childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}

			if(index >= 0) {
				// open PhotoSwipe if valid index found
				openPhotoSwipe( index, clickedGallery );
			}
			return false;
		};

		// parse picture index and gallery index from URL (#&pid=1&gid=2)
		var photoswipeParseHash = function() {
			var hash = window.location.hash.substring(1),
			params = {};

			if(hash.length < 5) {
				return params;
			}

			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if(!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');  
				if(pair.length < 2) {
					continue;
				}           
				params[pair[0]] = pair[1];
			}

			if(params.gid) {
				params.gid = parseInt(params.gid, 10);
			}

			return params;
		};

		var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
			var pswpElement = document.querySelectorAll('.pswp')[0],
				gallery,
				options,
				items;

			items = parseThumbnailElements(galleryElement);

			// define options (if needed)
			options = {

				// define gallery index (for URL)
				galleryUID: galleryElement.getAttribute('data-pswp-uid'),

				getThumbBoundsFn: function(index) {
					// See Options -> getThumbBoundsFn section of documentation for more info
					var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect(); 

					return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
				}

			};

			// PhotoSwipe opened from URL
			if(fromURL) {
				if(options.galleryPIDs) {
					// parse real index when custom PIDs are used 
					// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
					for(var j = 0; j < items.length; j++) {
						if(items[j].pid == index) {
							options.index = j;
							break;
						}
					}
				} else {
					// in URL indexes start from 1
					options.index = parseInt(index, 10) - 1;
				}
			} else {
				options.index = parseInt(index, 10);
			}

			// exit if index not found
			if( isNaN(options.index) ) {
				return;
			}

			if(disableAnimation) {
				options.showAnimationDuration = 0;
			}

			// Pass data to PhotoSwipe and initialize it
			gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};

		// loop through all gallery elements and bind events
		var galleryElements = document.querySelectorAll( gallerySelector );

		for(var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i+1);
			galleryElements[i].onclick = onThumbnailsClick;
		}

		// Parse URL and open gallery if it contains #&pid=3&gid=1
		var hashData = photoswipeParseHash();
		if(hashData.pid && hashData.gid) {
			openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
		}
	};
	// execute above function
	initPhotoSwipeFromDOM('.gallery');

	/*==============================
	Player
	==============================*/
	function initializePlayer() {
		if ($('#player').length) {
			const player = new Plyr('#player');
		} else {
			return false;
		}
		return false;
	}
	$(window).on('load', initializePlayer());

	/*==============================
	Range sliders
	==============================*/
	/*1*/
	function initializeFirstSlider() {
		if ($('#filter__years').length) {
			var firstSlider = document.getElementById('filter__years');
			noUiSlider.create(firstSlider, {
				range: {
					'min': 2000,
					'max': 2018
				},
				step: 1,
				connect: true,
				start: [2005, 2015],
				format: wNumb({
					decimals: 0,
				})
			});
			var firstValues = [
				document.getElementById('filter__years-start'),
				document.getElementById('filter__years-end')
			];
			firstSlider.noUiSlider.on('update', function( values, handle ) {
				firstValues[handle].innerHTML = values[handle];
			});
		} else {
			return false;
		}
		return false;
	}
	$(window).on('load', initializeFirstSlider());

	/*2*/
	function initializeSecondSlider() {
		if ($('#filter__imbd').length) {
			var secondSlider = document.getElementById('filter__imbd');
			noUiSlider.create(secondSlider, {
				range: {
					'min': 0,
					'max': 10
				},
				step: 0.1,
				connect: true,
				start: [2.5, 8.6],
				format: wNumb({
					decimals: 1,
				})
			});

			var secondValues = [
				document.getElementById('filter__imbd-start'),
				document.getElementById('filter__imbd-end')
			];

			secondSlider.noUiSlider.on('update', function( values, handle ) {
				secondValues[handle].innerHTML = values[handle];
			});

			$('.filter__item-menu--range').on('click.bs.dropdown', function (e) {
				e.stopPropagation();
				e.preventDefault();
			});
		} else {
			return false;
		}
		return false;
	}
	$(window).on('load', initializeSecondSlider());

	/*3*/
	function initializeThirdSlider() {
		if ($('#slider__rating').length) {
			var thirdSlider = document.getElementById('slider__rating');
			noUiSlider.create(thirdSlider, {
				range: {
					'min': 0,
					'max': 10
				},
				connect: [true, false],
				step: 0.1,
				start: 8.6,
				format: wNumb({
					decimals: 1,
				})
			});

			var thirdValue = document.getElementById('form__slider-value');

			thirdSlider.noUiSlider.on('update', function( values, handle ) {
				thirdValue.innerHTML = values[handle];
			});
		} else {
			return false;
		}
		return false;
	}
	$(window).on('load', initializeThirdSlider());
});








// --- Хранилище пользователей и комментариев ---
document.addEventListener('DOMContentLoaded', () => {
  const USERS_KEY = 'users';
  const LOGGED_USER_KEY = 'loggedUser';
  const COMMENTS_KEY = `comments_${window.location.pathname}`;

  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  let loggedUser = JSON.parse(localStorage.getItem(LOGGED_USER_KEY));
  let comments = JSON.parse(localStorage.getItem(COMMENTS_KEY)) || [];

  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function saveUsers() {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function saveLoggedUser(user) {
    if (user) {
      localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
      loggedUser = user;
    } else {
      localStorage.removeItem(LOGGED_USER_KEY);
      loggedUser = null;
    }
    updateHeaderButton();
    renderAllComments();
  }

  function saveComments() {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ================= Регистрация =================
  document.querySelectorAll('.sign__form').forEach(form => {
    const btn = form.querySelector('.sign__btn');
    if (btn?.textContent.trim() === 'Зарегистрироваться') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = form.querySelector('input[placeholder="Name"]').value.trim();
        const email = form.querySelector('input[placeholder="Email"]').value.trim();
        const password = form.querySelector('input[placeholder="Password"]').value;

        // Проверки
        if (!name || !email || !password) return alert("Заполните все поля");
        if (name.length < 3) return alert("Имя должно быть минимум 3 символа");
        if (!isValidEmail(email)) return alert("Введите корректный Email");
        if (password.length < 6) return alert("Пароль должен быть минимум 6 символов");
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) return alert("Email уже используется");

        const newUser = { name, email, password };
        users.push(newUser);
        saveUsers();
        saveLoggedUser({ name: newUser.name, email: newUser.email });

        alert("Регистрация успешна! Вы вошли как " + newUser.name);
        window.location.href = "index.html";
      });
    }
  });

  // ================= Вход =================
  document.querySelectorAll('.sign__form').forEach(form => {
    const btn = form.querySelector('.sign__btn');
    if (btn?.textContent.trim() === 'Вход') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[placeholder="Email"]').value.trim();
        const password = form.querySelector('input[placeholder="Password"]').value;

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) return alert("Неверный логин или пароль");

        saveLoggedUser({ name: user.name, email: user.email });
        alert("Вы успешно вошли!");
        window.location.href = "index.html";
      });
    }
  });

  // ================= Кнопка в шапке =================
  const headerAuthBtn = $('.header__sign-in');

  function updateHeaderButton() {
    if (!headerAuthBtn) return;
    if (loggedUser) {
      headerAuthBtn.textContent = "Выйти";
      headerAuthBtn.onclick = () => saveLoggedUser(null);
    } else {
      headerAuthBtn.textContent = "Вход";
      headerAuthBtn.onclick = () => {
        window.location.href = "signin.html?return=" + encodeURIComponent(location.pathname);
      };
    }
  }

  updateHeaderButton();

  // ================= Комментарии =================
  const commentsSection = $('.comments');
  const commentTextarea = $('#text');
  const commentBtn = $('.form__btn');
  const commentList = document.createElement('div');
  commentList.style.marginTop = '20px';
  commentsSection?.appendChild(commentList);

  function renderAllComments() {
    commentList.innerHTML = '';
    comments.forEach((comment, index) => {
      const div = document.createElement('div');
      div.className = 'comment';
      div.style.backgroundColor = '#333';
      div.style.color = '#D3D3D3';
      div.style.padding = '12px';
      div.style.marginBottom = '10px';
      div.style.borderRadius = '6px';
      div.style.fontFamily = 'Arial, sans-serif';
      div.innerHTML = `<b>${comment.user}</b>:<br>${comment.text}<br><small>${comment.time}</small>`;

      // Удаление: админ или автор
      if (loggedUser && (loggedUser.email === 'admin@cimix.site' || loggedUser.email === comment.email)) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.backgroundColor = '#444';
        deleteBtn.style.color = '#fff';
        deleteBtn.style.border = 'none';
        deleteBtn.style.padding = '4px 8px';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', () => {
          if (confirm("Вы уверены, что хотите удалить этот комментарий?")) {
            comments.splice(index, 1);
            saveComments();
            renderAllComments();
          }
        });
        div.appendChild(deleteBtn);
      }

      commentList.appendChild(div);
    });
  }

  renderAllComments();

  commentBtn?.addEventListener('click', () => {
    if (!loggedUser) {
      alert("Сначала войдите, чтобы оставить комментарий");
      return;
    }
    const text = commentTextarea.value.trim();
    if (!text) return;

    const comment = {
      user: loggedUser.name,
      email: loggedUser.email,
      text,
      time: new Date().toLocaleString()
    };

    comments.unshift(comment);
    saveComments();
    renderAllComments();
    commentTextarea.value = '';
  });
});

let indexData = [];

// Загружаем индекс
fetch('https://animix.site/search-index.json')
  .then(res => res.json())
  .then(data => { indexData = data; })
  .catch(err => console.error('Ошибка загрузки индекса:', err));

function doSearch(query) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = "";

  if (!query.trim() || indexData.length === 0) {
    resultsContainer.style.display = "none";
    return;
  }

  const results = indexData.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.content.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length === 0) {
    resultsContainer.innerHTML = "<div>Ничего не найдено</div>";
  } else {
    results.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<a href="${item.url}">${item.title}</a><br>
                       <small>${item.content}</small>`;
      resultsContainer.appendChild(div);
    });
  }

  resultsContainer.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchButton");

  // чтобы работало и на мобильных
  input.addEventListener("input", () => doSearch(input.value));
  input.addEventListener("keyup", () => doSearch(input.value));

  button.addEventListener("click", () => doSearch(input.value));
});