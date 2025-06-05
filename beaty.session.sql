select * from users;

drop table if exists users;


select * from services;

-- First drop the dependent table
drop table if exists items;

-- Then drop the services table
drop table if exists services;


delete from services 

select * from services where service_id = 1;

select * from items;


delete FROM items where item_id = 25;


drop table if exists users;
