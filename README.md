
# Movies API

Movie API with create, update, delete, list options. Please go through the api reference below to get a breif understanding of the API

Please make sure, mongoDB server has been started before running the application locally

## Required Tools

Node, pnpm, MongoDB


## Run Locally

Clone the repository

```bash
  git clone https://github.com/CR4ZED/Movies-API.git
```
Go to the project directory

```bash
  cd Movies-API/server
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm dev
```


## Running Tests

To run tests, run the following command

```bash
  cd server
  pnpm test
```


## API Reference

#### Create a token

```http
  GET /api/v1/token
```
| Payload | Type     | example |  Description                       |
| :-------- | :------- | :- | :-------------------------------- |
| `role`      | `string` | "admin" or "user"  |**Required**. |


#### Create a movie

```http
  POST /api/v1/movies
```
| Payload | Type  |  Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` |**Required** |
| `genre`      | `string` |**Required** |
| `rating`      | `number` |**Required** |
| `streamingLink`      | `string` |**Required** |

Authorization is required and a token with admin role is required

#### Get all items

```http
  GET /api/v1/movies
```


#### Search a movie

```http
  GET /api/v1/movies/serach?q=
```

| Query Parameter | Type     | example |  Description                       |
| :-------- | :------- | :- | :-------------------------------- |
| `q`      | `string` | "genre=SEARCH_GENRE" or "title=MOVIE_TITLE"  |**Required**. |


#### Update A Movie

```http
  PUT /api/v1/movies/:id
```

| Payload | Type  |  Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` |**optional** |
| `genre`      | `string` |**optional** |
| `rating`      | `number` |**optional** |
| `streamingLink`      | `string` |**optional** |

Authorization is required and a token with admin role is required

#### Delete A Movie

```http
  DELETE /api/v1/movies/:id
```

Authorization is required and a token with admin role is required


