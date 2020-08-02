[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/lfnascimento/valkyrie)
# Valkyrie - Best Available Seats
<img width="1269" alt="Screen Shot 2020-08-02 at 17 55 47" src="https://user-images.githubusercontent.com/6806019/89132398-2962d480-d4ea-11ea-92e8-ad1091c96e90.png">

To run this project you need to have:

- **Docker**

## Setup the project locally
```
$ git clone https://github.com/lfnascimento/valkyrie.git
$ cd valkyrie
$ docker-compose build
$ docker-compose run vk bin/setup
```

## Running the project

```$ docker-compose up```

## Using API

To find the best open seat should be sent a `POST` request to `/api/v1/venue/lookup_best_available_seats` with a list of available seats, number of rows and columns of a venue as json

Example:
```
{
  "venue": {
    "layout": {
      "rows": 7,
      "columns": 10
    }
  },
  "seats": [
    {
      "id": "a1",
      "row": "a",
      "column": 1,
      "status": "AVAILABLE"
    },
    {
      "id": "b4",
      "row": "b",
      "column": 4,
      "status": "AVAILABLE"
    },
    {
      "id": "g7",
      "row": "g",
      "column": 7,
      "status": "AVAILABLE"
    }
  ]
}
```

If a group of seats is requested, the request needs the `party_of` param

Please check the [examples](https://documenter.getpostman.com/view/8746814/SzmcZeCG) out 
