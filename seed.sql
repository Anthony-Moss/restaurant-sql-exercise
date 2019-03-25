insert into users(first_name, last_name, email, password)
values ('john', 'smith', 'john@zpol.com', 'asadsd'),
('chris', 'aquino', 'chris@gmail.com', 'assdwadsfs'),
('John', 'Wick', 'dontkillpuppies@aol.com', 'egejngdjgn');

insert into restaurants(name, address, street, state, city, phone, menu, picture)
values ('Farm Burger', '3365 Piedmont Rd NE', 'Piedmont Rd', 'Georgia', 'Atlanta', '404-816-0603', 'menu', 'url'),
('South City Kitchen', ' 224 Piedmont Rd', 'Piedmont Rd', 'Geogia', 'Atlanta', '404-123-4567', 'menu', 'url'),
('Lovies', '123 Piedmont Rd', 'Piedmont Rd', 'Georgia', 'Atlanta', '404-999-8888', 'menu', 'url');

insert into reviews(score, content)
values ('100', 'Lovies has good food'),
('80', 'Farm Burger review...'),
('75', 'South City Kitchen review1...'),
('80',' South City Kitchen review2...');

insert into favorites(user_id, resturant_id, reviews)
values ('1', '1', '3'),
('2','1','3'),
('3', '1', '3'),
('1', '2', '1');

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
    picture varchar(500) 
);

create table reviews (
    id serial primary key,
    score integer,
    content text,
    -- a single review belongs to a singles resturant
    restaurant_id integer references restaurants(id),
    user_id integer references users(id)
);

create table favorites (
    id serial primary key,
    user_id integer references users(id), --this is a foreign  key
    resturant_id integer references restaurants(id),
    reviews text -- this is "metadata" about the relationship
                -- uh oh, this fiels has a plural name
                --that is  no good.
);
