[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/lfnascimento/valkyrie)
# Valkyrie - Best Available Seats

To run this project you need to have:

- **Docker**

## Setup the project locally
```
$ git clone https://github.com/lfnascimento/valkyrie.git
$ cd valkyrie
$ docker-compose build
```

## Running the project

```$ docker-compose up```

## Usage

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
