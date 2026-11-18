import { useState } from "react";
import { players } from "../../data/mockData";
import { Search } from "lucide-react";

function Players() {
  const [search, setSearch] = useState("");

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page-content">
      <div className="section-heading">
        <div>
          <h2>Players</h2>
          <p>Registered members of your badminton club.</p>
        </div>
        <span className="player-count">{players.length} players</span>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            placeholder="Search players..."
            aria-label="Search players"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="players-grid">
        {filteredPlayers.map((player) => (
          <div className="player-card" key={player.id}>
            <div className="player-avatar">{player.name.charAt(0)}</div>
            <div>
              <h3>{player.name}</h3>
              <p>{player.level}</p>
            </div>
          </div>
        ))}
      </div>

      {!filteredPlayers.length && (
        <div className="empty-state">
          <Users size={32} />
          <h3>No players found</h3>
          <p>Try a different search.</p>
        </div>
      )}
    </div>
  );
}

export default Players;
