-- Active: 1675556550542@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT "NORMAL" NOT NULL,
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
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO users (id, name, email, password, created_at, role)
VALUES
	("u001", "Carlos Henrique", "carloshenriquesouza.eng@gmail.com", "Abc12345#","2023-02-10T14:48:00.000Z", "ADMIN"),
	("u002", "Professor X", "professorx@marvel.com", "Produto$m4nual", "2023-02-10T14:48:00.000Z", "NORMAL"),
    ("u003", "Feiticeira Escarlate", "feiticeiraescarlate@marvel.com", "MeusFilho$Minh4Vid4", "2023-02-10T14:48:00.000Z", "NORMAL"),
    ("u004", "Flash", "flash@dc.com", "Fla$hR3vers0", "2023-02-10T14:48:00.000Z", "NORMAL");

INSERT INTO posts (id, creator_id, content, likes, dislikes, created_at, updated_at)
VALUES
	("p001", "u001", "Estou adorando React!", 0, 0, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("p002", "u002", "CSS é muito chato.", 0, 1, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("p003", "u003", "POO é extremamente interessante!", 3, 1, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("p004", "u004", "Nada a declarar...", 1, 0, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z");

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

UPDATE users
SET id = "e79fdbf9-d332-47e0-9ecf-8e85ea7f02e2"
WHERE id = "u003";