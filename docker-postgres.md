postgres after install start from services

<!-- if want to give credentail and env from command -->
<!--  -->
<!-- docker run --name postgres-container -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres -->

Reinitialize the Container (Destructive)
If you prefer to recreate the container with mydbnew as the default database, you need to delete the existing volume to reset the database directory. This will erase all current data:

docker-compose down -v
docker-compose up -d
docker logs postgres-container

docker exec -it postgres-container psql -U aeriv -d mydbnew

//
Verify PostgreSQL is Listening
Use psql or a database client on your host to test the connection:

psql -h localhost -U myuser -d mydatabase
