# ARGO Explorer

This is a Next.js web application that provides an AI-powered conversational system to explore and visualize ARGO float oceanographic data.

## Features

- **AI-Powered Chatbot**: Use natural language to query ARGO data. The chatbot translates your questions into SQL queries.
- **Interactive Dashboard**: Visualize ARGO float data through an interactive dashboard featuring:
  - Float trajectories on a map.
  - Depth-time plots for temperature and salinity.
  - Raw data tables.
- **Data Export**: Download query results and float data as CSV files.
- **Modern UI**: A clean, responsive, and intuitive interface built with Next.js, shadcn/ui, and Tailwind CSS.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [npm](https://www.npmjs.com/) or a compatible package manager
- [Git](https://git-scm.com/)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd argo-explorer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
    Open `.env.local` and add your Google Maps API key. You can obtain one from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/).
    ```env
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:9002](http://localhost:9002).

## Usage

- **Home**: Get an overview of the ARGO Explorer project.
- **Chatbot**: Ask questions about the ARGO data in plain English (e.g., "Show me salinity profiles near the equator"). The AI will generate the corresponding SQL query.
- **Dashboard**: Explore the ARGO data visually through maps, charts, and tables.
- **About**: Learn more about the ARGO program and how to use the application.
