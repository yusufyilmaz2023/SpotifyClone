import { API } from "./scripts/api.js";
import { ele, renderCards, renderLoader, renderPlayingInfo } from "./scripts/ui.js";

// class'ın bir örneğini oluşturma
const api = new API();

document.addEventListener("DOMContentLoaded", async () => {
  //api isteklerinden önce loading atılır ekrana, apiden cevap gelene kadar ekran boş kalmasın diye
  renderLoader();
  await api.getPopular();
  renderCards(api.songs);
});

//müzik listesindeki tıklanma olaylarını izler
ele.list.addEventListener("click", (e) => {
  if (e.target.id === "play-btn") {
    // HTML elemanlarını js'de çağırdığımız zaman, closest() isimli bir metotla, 
    //çağırdığımız elemana en yakın (HTML tarafında yakın yani alt eleman üst eleman gibi- kapsayıcılık)
    //bir diğer elemanı çağırabiliriz.
    //oynat butonuna en yakın .card classlı sınıfı console'a yazar
    const parent = e.target.closest(".card");

    renderPlayingInfo(parent.dataset);
  }
});

// arama formu gönderildiğinde başlığın güncellenmesi
ele.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //aratılan terime erişme
  const query = e.target[0].value;

  //form boşsa fonksiyonu durdurma
  if (!query) return;

  renderLoader();

  ele.title.innerHTML = `Result for ${query}`
  //buraya kadar yaptığımız şeylerin sonucu olarak, örneğin user inputta eminem'i aratınca
  //başlık Eminem için sonuçlar olarak değişecek. 
  //bundan sonraki aşamada da bir apı isteği tanımlayıp gerçekten sonuçları almamız lazım

  //apıden şarkıları alma
  api.searchMusic(query);
});

