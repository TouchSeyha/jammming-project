import React, { useState, useCallback } from "react";
import "./App.css";

import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const play = useCallback((track) => {
    Spotify.play(track);
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback(
    (track) => {
      setPlaylistTracks((prevTracks) =>
        prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
      );
    },
    [setPlaylistTracks]
  );

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

      return (
        <div>
          <h1>
            Ja<span className="highlight">mmm</span>ing
          </h1>
          <div className="App">
            <SearchBar onSearch={search} />
            <div className="App-playlist">
              <SearchResults searchResults={searchResults} onAdd={addTrack} />
              <Playlist
                playlistName={playlistName}
                playlistTracks={playlistTracks}
                onNameChange={updatePlaylistName}
                onRemove={removeTrack}
                onSave={savePlaylist}
              />
            </div>
          </div>
          <footer className="footer">
            <div className="footer-content">
                <div className="footer-name">
                    Touch Seyha
                </div>

                <div className="footer-github">                
                    <a href="https://github.com/TouchSeyha" className="github-username" target="_blank" rel="noopener noreferrer"><img src="Git.png" alt="GitHub" className="github-logo"/></a>
                </div>
                    <div class="footer-contact">
                        <a href="mailto:hcy.contactbs@gmail.com">hcy.contactbs@gmail.com</a>
                        <span className="footer-phone">+(855) 967-097-999</span>
                </div>
            </div>
        </footer>
        </div>
      );
};

export default App;