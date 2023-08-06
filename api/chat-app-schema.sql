CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    text text NOT NULL,
    from_user INTEGER NOT NULL REFERENCES users(id),
    to_user INTEGER NOT NULL REFERENCES users(id),
    sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CREATE TABLE messages (
--     id SERIAL PRIMARY KEY,
--     text VARCHAR(255) NOT NULL,
--     users TEXT[] NOT NULL,
--     sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- CREATE TABLE messages (
--     id SERIAL PRIMARY KEY,
--     from_username text NOT NULL REFERENCES users,
--     to_username text NOT NULL REFERENCES users,
--     body text NOT NULL,
--     sent_at timestamp with time zone NOT NULL,
--     read_at timestamp with time zone
-- );
