# Chess Tracker
A website for you to report the results of chess matches between schools.

## TODO
1. Update workflow to use firebase tools (`firebase deploy`)
2. Fix auth -- use reactrouter for navigate tag

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
