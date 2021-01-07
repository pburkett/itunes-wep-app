import { ProxyState } from "../AppState.js";
import songsService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
    let template = ''
    
    ProxyState.songs.forEach(s => template += s.Template)

    document.getElementById("songs").innerHTML = template
 }

/**Draws the Users saved songs to the page */
function _drawPlaylist() { 
  let template = ''

  ProxyState.playlist.forEach(s => template += s.PlaylistTemplate)

  document.getElementById("playlist").innerHTML = template
}

function _drawCurrentSong() {
  console.log(ProxyState.currentlyPlaying);
  document.getElementById("current-song").src = ProxyState.currentlyPlaying.preview
  document.getElementById("now-playing-img").src = ProxyState.currentlyPlaying.albumArt

  document.getElementById('song-info').innerHTML = ProxyState.currentlyPlaying.currentlyPlayingInfo
}
//Public
export default class SongsController {
  constructor() {
    ProxyState.on("currentlyPlaying", _drawCurrentSong)
    ProxyState.on("songs", _drawResults)
    ProxyState.on("playlist", _drawPlaylist)
    this.getMySongs()
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songsService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong() {
    try {
      await songsService.addSong()
      songsService.getMySongs()
    }
    catch(e) {
    console.error(e)
    }
   }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { 
    try {
      // event.stopPropagation()
      console.log('controller');
      songsService.removeSong(id)
    } catch(e){
      console.error(e)
    }
  }
  getMySongs(){
    try {
      songsService.getMySongs()
    } catch(e){
      console.error(e)
    }
  }

  selectSong(id){
    console.log(id);
    songsService.selectSong(id)
  }
}


