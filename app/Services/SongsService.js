import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  constructor(){
    console.log('hello there');
    
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let filteredData = res.results.filter(s => s.previewUrl != null)
        ProxyState.songs = filteredData.map(rawData => new Song(rawData));
        console.log(ProxyState.songs);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let res = await sandBoxApi.get('')
    console.log(res.data);
    ProxyState.playlist = res.data.map(s => new Song(s))
  }

  
  async addSong() {
    
    let res = await sandBoxApi.post('', ProxyState.currentlyPlaying);
    console.log(res);
    
    // ProxyState.playlist = [...ProxyState.playlist, ProxyState.currentlyPlaying];
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    
    let res = await sandBoxApi.delete(id)
    console.log(res);
    ProxyState.playlist = ProxyState.playlist.filter(s => s.id != id)
  }

  selectSong(id) {
    ProxyState.currentlyPlaying = ProxyState.songs.find( s => s.id == id) || ProxyState.playlist.find( s => s.id == id)
  }
}

const service = new SongsService();
export default service;
