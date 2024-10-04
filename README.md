# **MindPath: Your Guide to Provincial Mental Health Services and Coverage**

## Project Overview
MindPath is a web-based application designed to help Canadians navigate the complex landscape of mental health services and provincial coverage. The app serves as a comprehensive resource for individuals seeking information about available mental health services, coverage details, and guidance on accessing these services within their province.

MindPath aims to bridge the information gap in accessing mental health services, making it easier for individuals to find, understand, and use the mental health support they need.

## Key Features
- **Searchable Database**: Easily search for mental health services across all Canadian provinces.
- **Coverage Information**: Detailed data on provincial coverage for mental health services, including therapy, counseling, psychiatric care, and medication.
- **Personalized Questionnaire**: A user-friendly questionnaire that helps identify potential mental health needs and suggests relevant services.
- **Crisis Support**: Resources for crisis support and emergency mental health services.
- **Professional Locator**: Ability to locate nearby mental health professionals and facilities.
- **Mental Health Tracking**: Secure platform to track appointments, medications, and personal progress.

## Installation Instructions

### Prerequisites
To set up the MindPath development environment, you will need the following:
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **Git** for version control

### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/kdseo1227069170/MindPath-Group46.git
   cd MindPath-Group46
   ```

2. **Install dependencies**:
   Navigate to the `backend` and `frontend` folders and run the following:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Environment variables**:
   Copy the `.env.example` file in both `backend` and `frontend` folders, rename it to `.env`, and provide the required values (e.g., `DB_URL`, `API_KEY`, etc).

4. **Run the application**:
   - For the backend (API and database):
     ```bash
     cd backend
     npm run dev
     ```
   - For the frontend (UI):
     ```bash
     cd frontend
     npm start
     ```

## Usage Guide

### Running Locally
After setting up the environment, you can access the following features locally:
- **Search Mental Health Services**: Use the search bar to find mental health services by location, type, and distance.
- **Track Appointments**: View, add, or edit your upcoming mental health appointments.
- **Questionnaire**: Fill out a personalized mental health questionnaire to receive recommended services.

## Contributing Guidelines

### Git Workflow
- Follow the **GitFlow** branching strategy:
  - **main**: Production-ready code only.
  - **develop**: Active development branch.
  - **feature/xxx**: Feature branches for new additions (e.g., `feature/user-authentication`).
  - **hotfix/xxx**: Hotfix branches (patches) for critical issues.

### Code Standards
- **JavaScript**: Follow the **Official JavaScript Style Guide**.
- **Naming conventions**:
  - Variables: Use `camelCase`.
  - Constants: Use `UPPER_SNAKE_CASE`.
  - Class names: Use `PascalCase`.
  
- **Linting**: ESLint is set up in both frontend and backend to enforce coding standards. Run linting before pushing code:
  ```bash
  npm run lint
  ```

### Pull Requests
- All contributions should be made via **pull requests (PRs)**.
- Each PR should include:
  - A detailed description of the changes.
  - Unit tests (if applicable).
  - A link to the relevant task/issue on the **Taiga** taskboard.

### Testing
- Unit and integration tests are required for all new features and bug fixes.
  - **Backend**: Use **Jest** and **Supertest** for testing.
  - **Frontend**: Use **React Testing Library** and **Jest**.

  ```bash
  # Backend & Frontend tests
  npm run test
  ```

## Scrum Workflow
We are following the **Scrum methodology** to manage our project:

- **Sprints**: Our project is broken into 2-week sprints.
- **Sprint Planning**: At the beginning of each sprint, the team will prioritize user stories and tasks from the backlog.
- **Daily Standups**: Quick 15-minute meetings to sync up progress and discuss blockers.
- **Sprint Review and Retrospective**: At the end of each sprint, we will demo the progress and review what went well and what can be improved.

You can track our progress on the **Taiga board**: [Taiga Board Link](https://tree.taiga.io/project/kdseo-group46_mindpath/timeline)

## License
This project is licensed under _________________.

## Contact Information
- **Sponsor**: Jana Ray ([jana@canage.ca](mailto:jana@canage.ca))
- **Technical Contact**: ________________________.
- **GitHub Repo**: [MindPath GitHub Repository](https://github.com/kdseo1227069170/MindPath-Group46)
