# Project Management Backend

## Set up the database: npx prisma generate npx prisma migrate dev --name init npm run seed

## Configure environment variables:

.env (PORT, DATABASE_URL)


SELECT setval(pg_get_serial_sequence('"[DATA_MODEL_NAME_HERE]"', 'id'), coalesce(max(id)+1, 1), false) FROM "[DATA_MODEL_NAME_HERE]"

