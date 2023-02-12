-- Active: 1675556550542@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT "User" NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
);

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

INSERT INTO users (id, name, email, password, created_at)
VALUES
	("u001", "Carlos Henrique", "carloshenriquesouza.eng@gmail.com", "Abc12345#","2023-02-10T14:48:00.000Z"),
	("u002", "Professor X", "professorx@marvel.com", "Produto$m4nual", "2023-02-10T14:48:00.000Z"),
    ("u003", "Feiticeira Escarlate", "feiticeiraescarlate@marvel.com", "MeusFilho$Minh4Vid4", "2023-02-10T14:48:00.000Z"),
    ("u004", "Flash", "flash@dc.com", "Fla$hR3vers0", "2023-02-10T14:48:00.000Z");

INSERT INTO posts (id, creator_id, content, likes, dislikes, created_at, updated_at)
VALUES
	("p001", "u001", "Estou adorando React!", 0, 0, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("p002", "u002", "CSS é muito chato.", 0, 0, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("p003", "u003", "POO é extremamente interessante!", 0, 0, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("p004", "u004", "Nada a declarar...", 0, 0, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z");

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
	("u001", "p002", 0),
	("u002", "p003", 0),
	("u001", "p003", 1),
	("u003", "p003", 1),
	("u004", "p003", 1),
	("u003", "p004", 1);

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;

DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes;