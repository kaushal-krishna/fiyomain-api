# Project Structure

project-root/ │ ├── controllers/ # Handles business logic tied to routes │ ├── dynamoDbController.js - DynamoDB-specific logic │ └── feedController.js - Manages feed generation logic │ ├── db/ # Database setup and clients │ └── index.js - PostgreSQL (pgdb) client setup │ ├── routes/ # API routing for various endpoints │ ├── feed/ │ │ └── index.js - Feed-related routes │ └── db/ │ └── index.js - DynamoDB-related routes │ ├── services/ # Core business logic and services │ ├── feed/ # Feed-specific services │ │ ├── feedContentsService.js - Handles feed content logic │ │ ├── interestService.js - Manages user interests │ │ └── rankingService.js - Post and clip ranking logic │ ├── index.js # Main entry point of the application ├── handler.js # Serverless request handler (Lambda, etc.) └── README.md # Project documentation

### Description of Key Folders and Files:

- **controllers/**: Contains controllers that manage the flow between routes and services.
- **db/**: Holds the PostgreSQL database client setup for connecting and querying.
- **routes/**: Defines API routes, organizing by feature (feed, db).
- **services/**: Contains the business logic for handling feed contents, ranking, and interests.
- **index.js**: The main entry point for initializing and running the application.
- **handler.js**: Handles serverless execution (e.g., AWS Lambda).
