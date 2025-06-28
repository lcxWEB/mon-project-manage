# Project Management Dashboard

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS, Redux Toolkit, Redux Toolkit Query, Material UI Data Grid
- **Backend**: Node.js with Express, Prisma (PostgreSQL ORM)
- **Database**: PostgreSQL
- **Cloud**: AWS EC2, AWS RDS, AWS API Gateway, AWS Amplify, AWS S3, AWS Lambda, AWS Cognito, AWS CloudWatch

## Key Features
### User Authentication & Management
- Secure user authentication powered by AWS Cognito
- User registration and login functionality
- Role-based access control for different permission levels
- Test account available (Username: admin, Password: admin!Q123)
### Project Management
- Create and manage projects with name, description, start and end dates
- View comprehensive project listings and detailed information
- Track project timelines and deadlines
- Associate projects with specific teams
### Task Management
- Create tasks with detailed descriptions
- Set task priorities (Urgent, High, Medium, Low, Backlog)
- Track task status (To Do, Work In Progress, Under Review, Completed)
- Add custom tags to categorize tasks
- Set start dates and due dates for proper scheduling
- Track story points for agile workflow

### Multiple Views
- List view for quick scanning of tasks
- Table view for detailed information and sorting capabilities
- Priority-based task organization

### Technical Features
- Responsive design for all devices
- Real-time data updates via RTK Query
- Dark/Light mode support
- RESTful API architecture
- Comprehensive database schema with proper relationships
