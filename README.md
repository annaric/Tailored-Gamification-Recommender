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
- Player Type based on the HEXAD types: Achiever, Disruptor, Player, Free Spirit, Philanthropist, Socialiser
- Learning style based on Felder-Silverman: Active/Reflective, Visual/Verbal, Sequential/Global, Sensor/Intuitive
- Learning Activity Type (LAT) based on Blooms Taxonomy: Remember, Understand, Apply, Analyze, Evaluate, Create

## Architecture

This Project is realized with a Layered Architecture:

- Presentation Layer:
  - RecommenderSystemUI: User Interface to provide the parameter and get results from the recommender system.
- Application Layer:
  - Element Repository: handles information about the element information to provide the user with via UI.
  - Recommendation Service: forwards requests to recommendation engines (and assembles results)
  - GenderBasedRecommender: returns a rating of how suiting each gamification element is based on the gender.
  - AgeBasedRecommender: returns a rating of how suiting each gamification element is based on the age.
  - PersonalityBasedRecommender: returns a rating of how suiting each gamification element is based on the personality.
  - PlayerBasedRecommender: returns a rating of how suiting each gamification element is based on the player type.
  - LearningBasedRecommender: returns a rating of how suiting each gamification element is based on the learning style.
  - LATBasedRecommender: returns a rating of how suiting each gamification element is based on the task type.

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
- Containerization: Docker, Kubernetes
- CI/CD-Pipelines: Github Workflows
- Package Manager: Node.js

# Installation and Usage

- npm start: starts the server (frontend or backend)
- npm run build: Compiles Typescript to JavaScript
- npx prettier . --write: Makes code pretty
- npx prettier . --check: Checks if code is pretty
- npx eslint: Checks code for inconsistency and bugs
- npx stylelint "\*_/_.css": Checks .css files for consistency and code style
- --fix: fixes .css file inconsistency

## Pull Request

At every pull request a github workflow pipeline is started to check your code. That includes the following:

- The frontend and backend will be **tested** (Jest) and the current code coverage will be postet in the pull request. I
- **Eslint** will do a static code analysis of the fronted and backend on the TypeScript code.
- **Stylelint** will check the .css files for errors and violations against style conventions.
- If the aforementioned checks were succesful, the **Prettier** action is executed. It formats the code to keep it uniform on the main branch. If this check has something to change it will create a new commit for those formate changes.

## Adding a Recommender

To add a Recommender that handles parameter {ParameterName} you need to follow the following steps:
In the backend:

1. In RecommenderSystem/Recommender **add your Recommender** with the name "{ParameterName}+Based+Recommender.ts". Copy another Recommender and adapt it to your needs. It needs to extend the abstractRecommender.
2. In RecommenderSystem/Recommender/RecommenderData **add your csv file** with your literature data in the format like the other .csv file you see in the folder. To keep the naming convention, name the .csv File "{ParameterName}BasedRecommender.csv". Some **conventions** you should be aware of in the csv file:
   - For each literature there will be multiple lines, one line for each parameter value (e.g. 2 for gender)
   - In the titel, author and paperType column you can decide freely what to write, its best keep it the same for one literature as only one line will appear in the json. Those line are solely for better readability of the files and will not be processed further.
   - Entries in the resultType column have to be from the type LiteratureTypeEnum. This value defines how the data is normalized. For more details see the helper class DataNormalizer.
   - Pay attention to upper and lower case. It could be a reason why your data is not used properly.
3. **execute** the following **command** in the folder RecommenderSystem/Recommender/RecommenderData:
   `python readCSV.py {ParameterName}BasedRecommender.csv {ParameterName}BasedRecommender.json`

4. **Add** your recommender **to the RecommendationAssembler** so it is included in the end result.
5. **Add** your Recommender Information **in the /types** folder to the RecommenderObjectTypes.ts and RecommendationObjectTypes.ts accordingly
6. Write **tests** for your Recommender.

If everything runs smothly the frontend does not need to be adapted.

## Adding an Element

To add an Element you have to make two small adaptions to the frontend and backend. But be aware that **the recommendation scores for this element will stay 0 as long as you do not adapt the csv and json files of the recommender accordingly**. For that you also need literature that discusses the influence of this element.

In the **backend**:

- in the src/types folder **add** the gamification element **to the GamificationElementRepository** accordingly.

In the **frontend**:

- **add an image** that represents the gamification element to the **public/imgs** folder and name in the format like the other images are named. If you do not have a portrait image it will be distorted. Try to orientate your image (and style) to the other images.
