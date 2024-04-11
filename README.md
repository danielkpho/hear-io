Website is live at: https://danielkpho.github.io/heario-client/.
**Please email dxh253@student.bham.ac.uk when you want the server turned on**

1. Install PostgreSQL and create a database called _heariodb_.
2. git clone the directory: _git clone https://git.cs.bham.ac.uk/projects-2023-24/dxh253.git_
3. Create .env file with HEARIO_SECRET_KEY = _64 character string_.
4. Store it in the root folder.
5. Run npm install in frontend directory then _npm start_ to start the frontend.
6. Run npm install in backend directory then _nodemon app.js_ to start the backend.
7. Database tables will be created automatically after starting the backend
8. Open http://localhost:3000/heario-client or http://localhost:3000 in your browser to view the website

Server will run on localhost:8000
Client will run on localhost:3000
Postgres will run on localhost:5432