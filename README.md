# Tailored-Gamification-Recommender

This Repository provides the code for the Master Thesis "A Recommender System and Survey for Tailored Gamification in Digital Education".
The goal of this work is to develop a recommender system that suggests suitable gamification elements based on various parameters (e.g., gender, age, personality, or context).

It is important to note that this tool can be seen as recommender for designer and developer that are about to implement gamification in their software, especially digital learning environments.
The idea is, that they can define one or multiple personas that use their application and discover the personas preferences regarding gamification elements.
To get a recommendation of the recomender system the user provide as many information about their user and context as they want.
Based on the information the recommender system suggests the elements.
Information that the user can provide are:

- Gender: female, male
- Age
- Personality Type based on the Big5: Extraversion, Openess, Agreeableness, Conscientiousness, Neuroticism
- Player Type based on the HEXAD types: Achiever, Disruptor, Player, Free Spirit, Philantropist, Socialiser
- Learning style based on Felder-Silverman: Active/Reflective, Visual/Verbal, Sequential/Global, Sensor/Intuitive
- Learning Activity Type (LAT) based on Blooms Taxonomy: Remember, Understand, Apply, Analyze, Evaluate, Create

## Architecture

This Project is realized with a Layered Architecture:

- Presentation Layer:
  - RecommenderSystemUI: User Interface to provide the parameter and get results from the recommender system.
- Application Layer:
  - Element Manager: processes requests for element information to provide the user with via UI.
  - Recommendation Manager: forwards requests to recommendation engines (and assembles results)
- Domain Layer:
  - GenderBasedRecommender: returns a rating of how suiting each gamification element is based on the gender.
  - AgeBasedRecommender: returns a rating of how suiting each gamification element is based on the age.
  - PersonalityBasedRecommender: returns a rating of how suiting each gamification element is based on the personality.
  - PlayerBasedRecommender: returns a rating of how suiting each gamification element is based on the player type.
  - LearningBasedRecommender: returns a rating of how suiting each gamification element is based on the learning style.
  - LATBasedRecommender: returns a rating of how suiting each gamification element is based on the task type.
- Data Layer:
  - Element Database: Stores description and vizualization of each gamification element.
  - Recommendation Database: Stores Metadata and calculation information for each concrete recommender of the domain layer.

### Design Patterns (to discuss)

- Factory Pattern: To handle the multiple recommender, add new recommender and update existing recommender algorithms
- Observer Pattern: To update the recommender when a new gamification element is added.

## Technologies

- Frontend: Web Application
  - Framework: React (Decision: familiarity)
  - Language: TypeScript
  - Communication: REST-API (Decision: familiarity)
- Backend:
  - API: Express.js
  - Technology: Node.js (Decision: easy to learn, fast, lightweight, JavaScript Frontend)
- Databases:
  - Relational Database (Decision: easy to learn, SQL-based, familiarity, structured data)
  - MySQL (Decision: lightweight, common, enough for this purpose)
- Containerization: Docker, Kubernetes
- CI/CD-Pipelines: Github Workflows
- Package Manager: Node.js

# Installation and Usage

- npm start: starts the server (frontend or backend)
- npm run build: Bundles the app into static files for production
- npx prettier . --write: Makes code pretty
- npx prettier . --check: Checks if code is pretty
- npx eslint: Checks code for inconsistency and bugs
- npx stylelint "**/*.css": Checks .css files for consistency and code style
  - --fix: fixes .css file inconsistency
