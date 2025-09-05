CREATE TABLE IF NOT EXISTS graphs (
  id INTEGER PRIMARY KEY,
  num_nodes INTEGER NOT NULL,
  edges_json TEXT NOT NULL,
  best_time_ms INTEGER NULL DEFAULT NULL,
  cycle_found BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  rating INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL
);

INSERT INTO users (id, rating) VALUES (1, 100);

-- チュートリアル用のグラフデータを挿入 (完全グラフ)
INSERT INTO graphs (id, num_nodes, edges_json, best_time_ms, cycle_found)
VALUES (1, 6, '[{"source":0,"target":1},{"source":0,"target":2},{"source":0,"target":3},{"source":0,"target":4},{"source":0,"target":5},{"source":1,"target":2},{"source":1,"target":3},{"source":1,"target":4},{"source":1,"target":5},{"source":2,"target":3},{"source":2,"target":4},{"source":2,"target":5},{"source":3,"target":4},{"source":3,"target":5},{"source":4,"target":5}]', NULL, 0);
