import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PronounceButton from '../components/PronounceButton';

const RadioPage = () => {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [nowPlaying, setNowPlaying] = useState('');
  const audioRef = useRef(null);
  const [genreFilter, setGenreFilter] = useState('');
  const [genres, setGenres] = useState([]);

  const fetchStations = useCallback(async () => {
    setLoading(true);
    try {

      const response = await fetch(
        'https://de1.api.radio-browser.info/json/stations/bycountry/germany?hidebroken=true&limit=50&order=clickcount&reverse=true'
      );
      const data = await response.json();
      setStations(data);
      setFilteredStations(data);
      
      const allGenres = new Set();
      data.forEach(station => {
        if (station.tags) {
          station.tags.split(',').forEach(tag => allGenres.add(tag.trim()));
        }
      });
      setGenres(Array.from(allGenres).slice(0, 20)); 
    } catch (error) {
      console.error('Error fetching stations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);


  useEffect(() => {
    let filtered = stations;
    
    if (searchTerm) {
      filtered = filtered.filter(station =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (genreFilter) {
      filtered = filtered.filter(station =>
        station.tags && station.tags.toLowerCase().includes(genreFilter.toLowerCase())
      );
    }
    
    setFilteredStations(filtered);
  }, [searchTerm, genreFilter, stations]);


  const handleStationSelect = (station) => {
    if (selectedStation?.stationuuid === station.stationuuid && isPlaying) {

      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setSelectedStation(station);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (selectedStation && audioRef.current) {
      audioRef.current.src = selectedStation.url_resolved || selectedStation.url;
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    }
  }, [selectedStation]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatBitrate = (bitrate) => {
    if (!bitrate) return 'Unknown';
    return `${bitrate} kbps`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-2">📻 German Radio Live</h2>
        <p className="text-center text-gray-600 mb-6">
          Listen to German radio stations from across the country – click any station to play
        </p>

        <AnimatePresence>
          {selectedStation && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-linear-to-r from-purple-600 to-pink-600 rounded-xl p-4 mb-8 text-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm opacity-90">Now Playing</div>
                  <div className="font-bold text-xl">{selectedStation.name}</div>
                  {nowPlaying && <div className="text-sm mt-1">{nowPlaying}</div>}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlayPause}
                    className="bg-white text-purple-600 rounded-full p-3 hover:scale-105 transition"
                  >
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🔊</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search stations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="md:w-64">
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setGenreFilter('');
            }}
            className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            Clear Filters
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="mt-2 text-gray-500">Loading German radio stations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStations.map((station) => (
              <div
                key={station.stationuuid}
                onClick={() => handleStationSelect(station)}
                className={`bg-white rounded-xl p-4 shadow cursor-pointer transition hover:shadow-md ${
                  selectedStation?.stationuuid === station.stationuuid && isPlaying
                    ? 'ring-2 ring-purple-500'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{station.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {station.country} • {formatBitrate(station.bitrate)}
                    </p>
                    {station.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {station.tags.split(',').slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {station.favicon && (
                    <img
                      src={station.favicon}
                      alt={station.name}
                      className="w-12 h-12 rounded-lg object-cover ml-2"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                </div>
                {selectedStation?.stationuuid === station.stationuuid && isPlaying && (
                  <div className="mt-2 text-xs text-purple-600 animate-pulse">
                    🔴 Playing...
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {filteredStations.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stations found. Try a different search term.</p>
          </div>
        )}

        <audio
          ref={audioRef}
          onError={() => {
            console.error('Error playing station');
            setIsPlaying(false);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className="mt-8 p-4 bg-blue-50 rounded-xl text-center text-sm">
          💡 <strong>Tip:</strong> Click any station to start streaming. Use the search bar to find specific stations or filter by genre.
          All streams are provided by Radio Browser's free API.
        </div>
      </div>
    </div>
  );
};

export default RadioPage;