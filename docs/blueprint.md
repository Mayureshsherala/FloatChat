# **App Name**: ARGO Explorer

## Core Features:

- ARGO Data Ingestion: Upload and process ARGO NetCDF files, converting them into structured SQL tables in PostgreSQL.
- Vector Summary Storage: Store ARGO data metadata in PostgreSQL and vector summaries in FAISS/Chroma for efficient data retrieval.
- AI-Powered Chatbot: Enable natural language queries using an LLM API (e.g., OpenAI) with Retrieval-Augmented Generation (RAG) to translate user questions into SQL queries. The LLM will be used as a tool.
- Interactive ARGO Visualization: Display float trajectories on a map (Leaflet.js), along with depth-time plots and profile comparisons (temperature, salinity, etc.) using Plotly.js.
- Data Export: Allow users to download results as CSV/ASCII or NetCDF files.
- Intuitive Dashboard: Design a user-friendly dashboard with tabs for 'Home', 'Chatbot', 'Dashboard', and 'About', providing easy navigation and a clear user experience.

## Style Guidelines:

- Primary color: Deep sea blue (#29ABE2) to evoke the ocean.
- Background color: Light grayish blue (#E0F7FA) for a clean interface.
- Accent color: Coral orange (#FF7F50) to highlight interactive elements.
- Body and headline font: 'PT Sans', a humanist sans-serif for a modern and accessible feel.
- Use a consistent set of line icons related to oceanography and data visualization.
- Implement a clean, tab-based layout with a responsive design that adapts to desktop and tablet screens.
- Subtle transitions and animations to enhance user interactions.