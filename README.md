# Hobbit
Start a new habit, 21 days at a time. You got this you lovely hobbit!

Using MongoDB, Nodejs, React and Python.

MongoDB collections: Users and Challenge
  Challenge:
   {
    "_id":{"$oid":"id"},
    "name":"Name of the challenge",
    "motivation":"Why do you want to do this?",
    "target":"What is your target",
    "createdDate":{"$date":{"$numberLong":"date"}},
    "progress":"inProgress",
    "logs":[{"$date":{"$numberLong":"1234123444"}},...array of active days],
    "user":{"$oid":"user's id"},
    "pastTries":[{"$date":{"$numberLong":"123"}},... array of any past tries you had]}
    }

  User:
    {"_id":{"$oid":"64eda6e03b050e74ee7c8d28"},
    "name":"User name","email":"test@test.com",
    "password":"ENCRYPTED",
    }

NodeJs: using express for routes. Protecting the path with auth middleware.

React: using context and reducers to manage the state.

Python: to display a motivational message to user, reminding them why they started the journey, in second person. Using nltk.

