//HTML'den gelenler
export const ele = {
  list: document.querySelector('#list'),
  playingInfo: document.querySelector(".playing"),
  searchForm: document.querySelector("#search-form"),
  title: document.querySelector(".songs #title"),
};

// arayüz işlemleri
export const renderCards = (songs) => {

  //eski şarkıları siler(arama yapıldığında bu fonksiyonu yeniden kullanabilmek için ekledir.)
  ele.list.innerHTML = "";

  songs.forEach((song) => {
    const div = document.createElement('div');

    console.log(song);
    // kart elemanına js'den erişmek için bazı verileri eklicez.
    // conditional chaining 
    // aşağıdaki soru işaretini yazmasaydık api bir tane bile değeri göndermezse
    // proje hata verir dururdu, şimdi o değer yoksa da hata vermicek yalnızca o değer undefined olacak 
    div.dataset.url = song.hub?.actions.pop().uri;
    div.dataset.title = song.title;
    div.dataset.photo = song.images.coverart;

    //class verm
    div.className = "card";

    // içeriğini belirleme
    div.innerHTML = `
    <figure>
       <img src="${song.images?.coverart}" alt="">
       <div class="play">
         <i id="play-btn" class="bi bi-play-fill"></i>
        </div>  
    </figure>
    <h4>${song.subtitle}</h4>
    <p>${song.title}</p> `;

    ele.list.appendChild(div)
  });
};

// müzik bilgilerini ekrana basar
export const renderPlayingInfo = (data) => {
  ele.playingInfo.innerHTML = `
    <div class="info">
        <img class="animate" src="${data.photo}"/>
      <div>
        <p>Şuan oynatılıyor...</p>
        <h3>${data.title}</h3>
      </div>
    </div>

  <audio controls autoplay>
    <source
      src="${data.url}"
    />
  </audio>`
    ;
};

// for more loading img:  https://uiverse.io/  
export const renderLoader = () => {
  ele.list.innerHTML = `
  <div class="loader">
    <span></span>
</div>
`;
};

renderLoader();
