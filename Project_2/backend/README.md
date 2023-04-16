# Sample university rest api 


This is a sample rest api using DjangoRestFramework for a university. 
It contains the models 

* Students
* Degrees
* Cohorts
* Modules 
* Grades


The system has been populated with dummy data from the file `/university/management/commands/seed.py`
To clear the database and rebuild with fresh random data use 
```shell
python manage.py seed
```

> Warning this command can take some time to run, it populates a lot of data

The superuser details are:
 
```text
username: admin
password: testing123456
```

## Running the app

Clone the repo and run
```shell
python manage.py runserver
```

This will then run on your own machine at `http://127.0.0.1:8000`

### Docker 
If you have [Docker installed](https://docs.docker.com/get-docker/) have a [DockerHub account](https://hub.docker.com/) you can download a docker image of this app by typing

```shell
docker pull scrineymvm/ca298restassignment:latest
```

To then start the image in a container run
```shell
docker run -p 8000:8000 --name ca298restassignment scrineymvm/ca298restassignment:latest
```

Then you can go to [http://localhost:8000](http://localhost:8000) to view the running instance

## URLs
The homepage will take you straight to an interactive [swagger](https://swagger.io/) interface

* `/api` will take you to the standard django rest framework api page
* `/api/schema/redoc/` will take you to an interactive [redoc](https://redocly.com/) page for the api
* `/api/schema/` will allow you to download the `schema.yml` to import into other tools such as postman


### A note on Cors
This app has allowed `localhost:3000` through for CORS, if you need additional ports add them in `restexample/settings.py` 
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000", # node on port 3000
    "http://127.0.0.1:3000"  # node on port 3000
]
```