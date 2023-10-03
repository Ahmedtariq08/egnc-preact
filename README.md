# Environment & Government Compliance 2.0

## Description

**Environment & Government Compliance 2.0** user interface (UI) is designed to streamline and simplify compliance with environmental and governmental regulations. It provides an intuitive and efficient way for users to interact with the EG&C 2.0 platform.

- **Developer -** Ahmed Tariq

## Tech Stack

This project is built using the following technologies and tools:

- **Oracle Jet v15:** Utilized as the design system and component library to create a visually appealing and consistent UI.
- **React v18:** A powerful JavaScript library for building interactive user interfaces.
- **React Router v6.15:** For managing navigation and creating a seamless user experience.
- **Typescript:** Enhances code quality and provides static typing for a more robust application.
- **Mobx:** Used for state management, ensuring data flows smoothly throughout the application.
- **Axios:** For making API calls, enabling efficient communication with backend services.
- **ESLint (Typescript Standard):** Helps maintain code consistency and ensures best practices are followed.
- **Prettier:** Ensures code formatting is consistent and elegant.

## Installation

Follow these steps to set up and run the project on your local machine:

1. **Clone the Repository:** Use `git clone` to clone the repository to your local machine.
   
2. **Install Dependencies:** Navigate to the project directory and install the required dependencies.
```
cd egnc-preact
npm install
```

3. **Install Oracle JET:** Install Oracle Jet cli version 15 globally in the system. 
   [Oracle Jet Download](https://docs.oracle.com/en/learn/jet-install-cli/index.html#introduction)
```
sudo npm install -g @oracle/ojet-cli
```

4. **Add Environment Variables:** Follow `.env.prototype` to add `.env` file. Make sure the backend services are up and running
   
5. **Run Project:** Run the app by `ojet serve`

## Development

1. **Fork the Repository:** Click the "Fork" button on the top right corner of this repository to create your own copy.

2. **Clone Your Fork:** Use `git clone` to clone your forked repository to your local machine.

3. **Create a New Branch:** Create a new branch for your feature or bug fix from develop. Choose a descriptive name for your branch that reflects the changes you're making.
```
git checkout -b feature/name
```

4. **Make Changes:** Make your changes and improvements to the codebase. Ensure that your code follows our coding guidelines.

5. **Commit Your Changes:** Commit your changes with clear and concise commit messages.
```
git commit -m "Add feature XYZ" 
```

6. **Push to Your Fork:** Push your changes to your fork on GitHub.
  ```
   git push origin feature-name
   ```

7. **Create a Pull Request:** Go to the main repository's develop branch on GitHub and create a Pull Request (PR) to merge your changes. Be sure to explain the purpose of your changes and any relevant information for reviewers.

### Branch Naming Conventions

When creating branches for **Environment & Government Compliance 2.0**, please follow these naming conventions to ensure clarity and consistency:

- **`feature`:** Use this prefix for branches where you are developing a new feature or functionality.

  Example: `feature/new-feature`

- **`bugfix`:** Use this prefix for branches dedicated to fixing normal bugs encountered during development.

  Example: `bugfix/issue-fix`

- **`hotfix`:** Use this prefix for branches specifically created to address critical bugs found in the main branch (usually for urgent fixes).

  Example: `hotfix/critical-bug-fix`

- **`enhancement`:** Utilize this prefix when working on improvements or enhancements to a feature that has already been developed.

  Example: `enhancement/feature-improvement`

- **`poc`:** For branches created for testing or proof-of-concept purposes.

  Example: `poc/feature-testing`

Using these branch naming conventions helps maintain an organized and structured development process, making it easier to understand the purpose of each branch.


### File Naming conventions

When adding new files to the project, please follow these naming conventions to ensure clarity and consistency:

- `Folders` - Folder names should be Kebab Case, (e.g app-layout, admin-panel).
  
- `Component files` - Component names should be Pascal Case, (e.g AdminPanel.tsx, UserTab.tsx). Each component name should be clear and concise to understand what UI it renders. (do not use index.tsx).

- `Services / Store / TS files` - All other typescript files should be Camel Case (e.g authService.ts).

### Rules / Guidelines

When adding a new feature or development in general. These rules must be followed for a coherent codebase:

- `src/views` - All views/pages for UI go in this folder, they must be mapped to the router. Add sub folders to divide UI elements into smaller independant parts and lift them up to parent HOC.
  
- `src/modules` - This folder contain all the business logic, api calls, state management and constants related to a view. It is further divided into two main files / folders: 
  
- **Service** - Placed inside modules. Contains the business logic related to api calls, pure functions for data formation, and constants / interfaces / types. 

- **Store** - Placed inside modules. Contains all the statement management for a specific component / view. Async operations are permitted here that can be binded with service. 
  
- `src/components` - Components that do not fall into any view category or are required on global app level.

- `src/common` - Components that are used by multiple views / layouts across application.

- `src/constants` - Constants that are used across application, such as table columns, templates, icons. 

- `src/models` - Interfaces used in views or services. Further folders can be made for sub division.
  
- `src/utils` - Utility functions to be used across app. Must be pure functions.

- `src/api` - Logic for api calls. Any base URLs must be added here. 

- `app.css` - Segregate styling into relevant blocks with anchors. 



