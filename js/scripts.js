const animeEpisodes = [
    { title: "Окутывая небеса", time: "29.10.2025, 14:50", eps: 133, img: "/img/okutyvaja-nebesa.webp", link: "okutovaya-nebesa.html" },
    { title: "Мое просветление бесконечно", time: "29.10.2025, 10:05", eps: 49, img: "/img/Мое просветление бесконечно.webp", link: "anime/moe-prosvetlenie-beskonechno.html" },
    { title: "Боевой мастер", time: "28.10.2025, 16:15", eps: 594, img: "/img/Боевой мастер.webp", link: "anime/boyevoy-master.html" },
    { title: "Боевой континент 2: Непревзойдённый клан Тан", time: "28.10.2025, 12:15", eps: 124, img: "https://animix.site/img/%D0%91%D0%BE%D0%B5%D0%B2%D0%BE%D0%B9%20%D0%BA%D0%BE%D0%BD%D1%82%D0%B8%D0%BD%D0%B5%D0%BD%D1%82%202%20%D0%9D%D0%B5%D0%BF%D1%80%D0%B5%D0%B2%D0%B7%D0%BE%D0%B9%D0%B4%D1%91%D0%BD%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D0%B0%D0%BD%20%D0%A2%D0%B0%D0%BD.webp", link: "anime/boyevoy-kontinent-2-neprevzoydyoniy-klan-tan.html" },
    { title: "Практикуя ци сто тысяч лет", time: "28.10.2025, 11:50", eps: 281, img: "https://animix.site/img/%D0%9F%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D0%BA%D1%83%D1%8F%20%D1%86%D0%B8%20%D1%81%D1%82%D0%BE%20%D1%82%D1%8B%D1%81%D1%8F%D1%87%20%D0%BB%D0%B5%D1%82.webp", link: "anime/praktikuya-si-sto-tisoch-let.html" },
    { title: "Владыка духовного меча", time: "28.10.2025, 14:50", eps: 634, img: "https://animix.site/img/%D0%92%D0%BB%D0%B0%D0%B4%D1%8B%D0%BA%D0%B0%20%D0%B4%D1%83%D1%85%D0%BE%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BC%D0%B5%D1%87%D0%B0%202%20(2019).webp", link: "anime/vladika-duxovnova-mecha-3.html" },
    { title: "Противостоящий небесам", time: "05.09.2025, 14:40", eps: 442, img: "/img/Противостоящий небесам.webp", link: "protivostoyashiy-nebesam.html" },
    { title: "Древнейший боевой дух", time: "05.09.2025, 15:30", eps: 37, img: "/img/Древнейший боевой дух.webp", link: "drevneyshiy-boevoy-dux-anime-2025.html" },
    { title: "Гробница богов", time: "05.09.2025, 13:10", eps: 49, img: "/img/%D0%93%D1%80%D0%BE%D0%B1%D0%BD%D0%B8%D1%86%D0%B0%20%D0%B1%D0%BE%D0%B3%D0%BE%D0%B2.webp", link: "grobnisa-bogov.html" },
    { title: "Вознёсшийся над небесами", time: "05.09.2025, 13:10", eps: 22, img: "/img/voznesshiy-nad-nebesami.webp", link: "voznesshiy-nad-nebesami.html" },
    { title: "Владыка духовного меча", time: "05.09.2025, 15:45", eps: 622, img: "/img/Владыка духовного меча 2 (2019).webp", link: "vladika-duxovnova-mecha.html" },
    { title: "Безупречный мир", time: "05.09.2025, 11:10", eps: 231, img: "/img/Безупречный мир.webp", link: "bezuprechniy-mir.html" },
    { title: "Несравненный боевой дух", time: "05.09.2025, 14:15", eps: 139, img: "/img/Высший боевой дух  Несравненный боевой дух.webp", link: "nesravnoniy-boevoy-dux.html" },
    { title: "Трон, отмеченный Богом", time: "05.09.2025, 13:10", eps: 175, img: "/img/Трон, отмеченный богом anime 2022.webp", link: "tron-otmechiniy-bogom-anime-2022.html" },
    { title: "Нефритовая династия", time: "04.09.2025, 12:10", eps: 67, img: "https://cimix.site/img/%D0%9D%D0%B5%D1%84%D1%80%D0%B8%D1%82%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%B4%D0%B8%D0%BD%D0%B0%D1%81%D1%82%D0%B8%D1%8F.webp", link: "nefritovaya-dinastiya.html" },
    { title: "Непревзойденный на пути алхимии", time: "03.09.2025, 14:23", eps: 150, img: "/img/Непревзойденный на пути алхимии.webp", link: "neprevzoydenniy-na-puti-alximi.html" },
    { title: "Цзычуань 2", time: "03.09.2025, 10:20", eps: 8, img: "/img/szichuan.webp", link: "zichuan-2.html" }
    

    
  ];
  
  const animePerPage = 12;
  let currentAnimePage = 1;
  
  function displayAnimeList(page = 1) {
    const grid = document.getElementById('animeGrid');
    grid.innerHTML = '';
  
    const startIndex = (page - 1) * animePerPage;
    const items = animeEpisodes.slice(startIndex, startIndex + animePerPage);
  
    items.forEach(item => {
      const card = document.createElement('a');
      card.className = 'anime-card';
      card.href = item.link;
      card.target = '_blank';
      card.innerHTML = `
        <img src="${item.img || 'https://via.placeholder.com/70x100'}" alt="Аниме">
        <div class="anime-info">
          <div class="anime-title">${item.title}</div>
          <div class="anime-time">${item.time}</div>
        </div>
        <div class="anime-episode">${item.eps} серия</div>
      `;
      grid.appendChild(card);
    });
  }
  
  function renderAnimePagination() {
    const pagination = document.getElementById('animePagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(animeEpisodes.length / animePerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentAnimePage) btn.classList.add('active');
      btn.onclick = () => {
        currentAnimePage = i;
        displayAnimeList(currentAnimePage);
        renderAnimePagination();
      };
      pagination.appendChild(btn);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    displayAnimeList(currentAnimePage);
    renderAnimePagination();
  });
  
