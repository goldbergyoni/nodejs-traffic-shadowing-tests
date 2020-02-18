# Context

- Starting from succeeding tap compare
- Discovering at this stage is pricey
- How can I discover this bug earlier?

# Solution

- Diagram - The moving parts #1
- How to record - Sanitize, sample, s3
- How to replay - How to find early? test runners!, production your tests

# Recording

- Typical, same Express
- Need to record .har files, they are standard (even Chrome) - let's see example #1
- Using an existing middleware #1
- Let's replay production, .har files are generated in s3 #1

# Replaying

- Many utilities can replay .har files #1
- We want to discover the schema bug
- Write a test for each production input
- First, get it local with downloading from s3 #1
- Arrange requests per type #1
- Have local JSON file with thousands requests #1
- Test for each
- Add new functionality - if temp is too high
- Before moving to the next code, run this in the background
- Watch mode, choose production, "production your tests" #1
    - Do something else, a notification that something breaks #1
- It fails, I can notice that it's related to Vespa
- Let's 'double click' on Vespa, see log

- Punch:
