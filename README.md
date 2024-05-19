## GraphQL Server for MyHobbies Application

Based on [Apollo Server v4](https://www.apollographql.com/docs/apollo-server)

Data Sources:
- MongoDB
- TMDB REST API
- Google REST API

Server landing page: https://hobbies-graphql.onrender.com

Client live demo: https://hobbies-graphql-client.onrender.com

Client project: https://github.com/iurii-kyrylenko/hobbies-graphql-client

Environment variables:
```
CONNECTION_STRING = mongodb://localhost/hobbies
JWT_SECRET = ...
GOOGLE_BOOKS_API = https://www.googleapis.com/books/v1/
TMDB_API = https://api.themoviedb.org/3/
TMDB_IMAGE_STORE = https://image.tmdb.org/t/p/
TMDB_API_KEY = ...
CAPTCHA_SECRET = ...
CAPTCHA_API = https://www.google.com/recaptcha/api/
PORT = 4000
```
