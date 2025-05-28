# Skattplaneraren

En modern webbapplikation för att räkna ut och visualisera svensk skatt per år, månad, vecka och dag – samt visa hur skatten fördelas på olika samhällsområden.

## Funktioner

- Räkna ut kommunal och statlig skatt baserat på årsinkomst och vald kommun
- Visa skatt per år, månad, vecka och dag
- Visualisera skattefördelning som lista eller graf
- Spara de 5 senaste uträkningarna (historik) i webbläsaren
- Skriv ut eller spara uträkningen som PDF
- Responsiv och användarvänlig design

## Tekniker

### Frontend
- **React** (med TypeScript)
- **Recharts** (diagram)
- **Axios** (HTTP-anrop)
- **CSS** (egen styling och utskriftsvänliga vyer)
- **localStorage** (historik)

### Backend
- **Java** & **Spring Boot** (REST-API)
- **Maven** (byggverktyg)

### DevOps & Deployment
- **Docker** & **Docker Compose** (containerisering)
- **Railway** (publik backend)
- **GitHub Pages** (publik frontend)
- **Git & GitHub** (versionshantering)

## Kom igång lokalt

1. **Klona repot**
   ```sh
   git clone https://github.com/ditt-användarnamn/skattplan.git
   cd skattplan
   ```

2. **Starta backend**
   ```sh
   cd backend
   ./mvnw package -DskipTests
   java -jar target/backend-0.0.1-SNAPSHOT.jar
   ```

3. **Starta frontend**
   ```sh
   cd ../frontend
   npm install
   npm start
   ```

4. **Öppna [http://localhost:3000](http://localhost:3000) i webbläsaren**

## Deployment

- **Frontend:** Deployas enkelt till GitHub Pages med `npm run deploy` i frontend-mappen.
- **Backend:** Deployas till Railway (eller Render/Heroku) – se instruktioner i projektet.

## Hur jag tänkte

Projektet är byggt för att vara pedagogiskt, responsivt och lätt att vidareutveckla. Frontend och backend är separerade för enkelhet vid deployment och testning. All kod är typad och strukturerad för att vara lätt att förstå och underhålla.

## Kontakt

Vid frågor, kontakta gärna mig.

![Description](https://i.imgur.com/LsdeFFR.png)
![Description](https://i.imgur.com/P5hU7xS.png)

