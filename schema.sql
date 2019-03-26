create table users (
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(100),
    password varchar(500)
);

create table restaurants (
    id serial primary key,
    name varchar(200),
    address varchar(200),
    street varchar(200),
    state varchar(50),
    city varchar(50),
    phone varchar(20),
    menu varchar(200),
    picture varchar(500) -- Never store images in database, store url
    --restaurants have many reviews
    -- but i dont put a foreign key here
    -- that FK goes in the reviews table
);

create table reviews (
    id serial primary key,
    score integer,
    content text,
    -- a single review belongs to a singles resturant
    restaurant_id integer references restaurants(id),
    user_id integer references users(id)
);

--this is a linking table which describes the following relationships
create table favorites (
    id serial primary key,
    user_id integer references users(id), --this is a foreign  key
    resturant_id integer references restaurants(id),
    reviews text -- this is "metadata" about the relationship
                -- uh oh, this fiels has a plural name
                --that is  no good.
)
