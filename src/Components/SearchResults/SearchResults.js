import React from 'react';
import TrackList from '../TrackList/Tracklist';
import "./SearchResults.css";

const SearchResults = (props) => {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
      </div>
    );
  };
  
  export default SearchResults;