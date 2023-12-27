import React, { useState } from 'react';
import '../TvSeriesCard.css'; // Import the CSS file for styling

const TvSeriesCard = ({setSelectedSeason, selectedSeason, setSelectedEpisode, selectedEpisode, seasons }) => {
  // const [selectedSeason, setSelectedSeason] = useState(seasons[0].season_number);
  // const [selectedEpisode, setSelectedEpisode] = useState(1); // Assuming episodes start from 1

  const handleSeasonChange = (event) => {
    setSelectedSeason(parseInt(event.target.value, 10));
    // Reset selected episode when season changes
    setSelectedEpisode(1);
  };

  const handleEpisodeChange = (event) => {
    setSelectedEpisode(parseInt(event.target.value, 10));
  };

  return (
    <div className="tv-series-card">

      <div className="dropdowns">
        <label htmlFor="seasonDropdown">Select Season:</label>
        <select id="seasonDropdown" value={selectedSeason} onChange={handleSeasonChange}>
          {seasons.map(season => (
            <option key={season.id} value={season.season_number}>{season.name}</option>
          ))}
        </select>

        <label htmlFor="episodeDropdown">Select Episode:</label>
        <select id="episodeDropdown" value={selectedEpisode} onChange={handleEpisodeChange}>
          {[...Array(seasons.find(season => season.season_number === selectedSeason).episode_count).keys()].map((episodeNumber) => (
            <option key={episodeNumber + 1} value={episodeNumber + 1}>{`Episode ${episodeNumber + 1}`}</option>
          ))}
        </select>
      </div>
      
    </div>
  );
};

export default TvSeriesCard;
