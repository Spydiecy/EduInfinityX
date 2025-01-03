# My Next.js App

This is a Next.js application that utilizes Tailwind CSS for styling. Below are the instructions for setting up and running the project.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-nextjs-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Project Structure

- `src/pages`: Contains the application's pages.
  - `_app.tsx`: Custom App component for global styles and layout.
  - `index.tsx`: Main entry point of the application.
  - `api/hello.ts`: API route that returns a simple JSON object.

- `src/components`: Contains reusable components.
  - `ExampleComponent.tsx`: An example functional component.

- `src/styles`: Contains global and Tailwind CSS styles.
  - `globals.css`: Global CSS styles.
  - `tailwind.css`: Imports Tailwind CSS styles.

- `src/app`: Contains layout files.
  - `layout.tsx`: Defines the layout for the application.

- `tailwind.config.ts`: Configuration file for Tailwind CSS.

- `postcss.config.js`: Configuration file for PostCSS.

- `package.json`: Lists dependencies and scripts.

- `tsconfig.json`: TypeScript configuration file.

## Usage

You can start building your application by modifying the files in the `src` directory. Use Tailwind CSS classes in your components for styling.

## License

This project is licensed under the MIT License.