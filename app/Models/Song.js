export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId || data.id;
  }

  get Template() {
    return /*html*/`
        <div onclick="app.songsController.selectSong('${this.id}')" class="col-12 bg-white border-primary border">
          <div class="row">
          <div class="col-4">
            <div class="row justify-content-center align-items-center search-result-img" style="background-image: url(${this.albumArt})">
              <i class="fa fa-play play-icon-sm" aria-hidden="true"></i>
              </div>
           </div>
            <div class="col">
              <h5>
                ${this.artist}
              </h5>
              <h5>
                ${this.title}
              </h5>
            </div>
          </div>
        </div>
        `;
  }

  get PlaylistTemplate() {
    return `
    <div onclick="app.songsController.selectSong('${this.id}')" class="col-12 bg-white border-primary border">\
    <div class="playlist-remove-div">
      <i onclick="app.songsController.removeSong('${this.id}')" class="fa fa-times playlist-remove" aria-hidden="true"></i>
    </div>
    <div class="row">
    <div class="col-4">
      <div class="row justify-content-center align-items-center search-result-img" style="background-image: url(${this.albumArt})">
      
        <i class="fa fa-play play-icon-sm" aria-hidden="true"></i>
        </div>
     </div>
      <div class="col">
        <h5>
          ${this.artist}
        </h5>
        <h5>
          ${this.title}
        </h5>
      </div>
      
        
      
    </div>
  </div>
        `;
  }

  get currentlyPlayingInfo(){
    return `
    <div class="row">
      <div class="col text-center">
        <i onclick="app.songsController.addSong()" class="fa fa-plus" aria-hidden="true"></i>
      </div>
    </div>
      <div class="row">
        <h3 class="col-12 text-center">
          ${this.artist} - ${this.title}
        </h3>
      </div>
      <div class="row">
        <h3 class="col-12 text-center">
          From: ${this.album} | Buy Now For $${this.price * 100}
        </h3>
      </div>
    `
  }
}
