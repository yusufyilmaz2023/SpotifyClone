import { url, options } from "./constants.js";
import { renderCards } from "./ui.js";



// api işlemler
export class API {
  constructor() {
    this.songs = [];
  }

  // popüler müzikler için istek atma
  async getPopular() {
    try {
      // api isteği atar
      const res = await fetch(url, options);
      const data = await res.json();
      // class'ta tuttuğumuz değişkeni günceller
      this.songs = data.tracks;

    } catch (err) {
      console.log("Error");
    }
  }

  // aratılan içeriğe erişme 
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US&offset=0&limit=5`,
      options
    );

    const data = await res.json();

    // bize gelen diziyi işlicez, objelerin içindeki track katmanını aradan kaldırcaz
    const newData = data.tracks.hits.map((song) => ({
      ...song.track,
    }));

    //müzikleri ekrana basma
    renderCards(newData)
  }
}