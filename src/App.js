import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({
    platform: "",
    category: "",
  });
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const query = new URLSearchParams();
        if (filters.platform) query.append("platform", filters.platform);
        if (filters.category) query.append("category", filters.category);
        if (sort) query.append("sort", sort);
        console.log(`http://localhost:5000/api/games_info?${query.toString()}`);
        const response = await axios.get(
          `http://localhost:5000/api/games_info?${query.toString()}`
        );
        setGames(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGames();
  }, [filters, sort]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Steam Games</h1>
      <div className="flex gap-4 mb-4">
        {/* Platform Filter */}
        <select
          className="border rounded p-2"
          value={filters.platform}
          onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
        >
          <option value="">All Platforms</option>
          <option value="windows">Windows</option>
          <option value="mac">Mac</option>
          <option value="linux">Linux</option>
        </select>

        {/* Category Filter */}
        <select
          className="border rounded p-2"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Multiplayer">Multiplayer</option>
          <option value="FPS">FPS</option>
          <option value="Action">Action</option>
        </select>

        {/* Sort */}
        <select
          className="border rounded p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Game List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div key={game._id} className="border rounded p-4">
            <img
              src={game.header_image}
              alt={game.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2">{game.title}</h2>
            <p>{game.short_description}</p>
            <p className="text-sm text-gray-500">Rating: {game.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
