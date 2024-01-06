# Chess Tracker
A website for you to report the results of chess matches between schools.

## TODO
1. Update workflow to use firebase tools (`firebase deploy`) .. + channels for PRs
2. Check hooks make sure being called once

## REST API

```json
{
  "WEEK Label": [
    {
      "awaySchool": {
        "id": "AWAY SCHOOL ID",
        "name": "AWAY SCHOOL NAME"
      },
      "homeSchool": {
        "id": "HOME SCHOOL ID",
        "name": "HOME SCHOOL NAME"
      },
      "homeScore": 52,
      "awayScore": 61,
      "boards": [
        {
          "awayPlayer": {
            "id": "AWAY PLAYER ID",
            "firstName": "FIRST NAME",
            "lastName": "LAST NAME"
          },
          "homePlayer": {
            "id": "HOME PLAYER ID",
            "firstName": "FIRST NAME",
            "lastName": "LAST NAME"
          },
          "number": 6,
          "result": "home / draw / away"
        }
      ]
    }
  ]
}
```
