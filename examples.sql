-- user profile
--1. get all info for a user by id
    --1a. get only a few fields for public version
    --1b. get all fields for private version
--2. get all favorites for a user by id
--3. get all reviews written by that user by id

select * from users where id=1;

select first_name, email from users where id=1
select reviews from favorites where user_id=1
select * from reviews where user_id=1;

-- restaurant profile
--1. get all info for a restuarant by id
--2. get all reviews for restaurant by id
--3. get average review for a restaurant by id
--4. get count of favorites for resaurant by id

select * from restaurants where id=1
select * from reviews where restaurant_id=1
select avg(score) from reviews where restaurant_id=1
select count(id) from favorites where restaurant_id=1;

-- restaurant search results
--1a.get all matching rows for restaurants by name (case insensitive search)
    --1b. include avg review
    --1c. include number of favorites
--2 limit by minimum review
--3. (SUPER BONUS) pagination
select r.name, avg(ruv.score) from restaurants r
full outer join reviews ruv
on r.id = ruv.restaurant_id
where restaurant_id = 1
group by r.name;