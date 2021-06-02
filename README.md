# FashionStore

This project is created with Create React App, Ant Design and MongoDB. All data such as products, orders, users and deliveryoptions is saved in a cloud based Atlas MongoDB.

## For developers:

Download repo and run: 

#### `npm i` and `npm start`
#### Run application in your browser at port [3000](http://localhost:3000).

#### Admin login:
* email: janne@kemi.se 
* password: j 

## Backend created by:
[Josefin Enerlöv](https://github.com/jenerlov)\
[Maria Helena Norén](mariahelenanoren@gmail.com)\
[Jennifer Tendell](https://github.com/JenniferTendell)\
[Felicia von Braun](https://github.com/feliciavonbraun)\
[Mikaela Andersson](https://github.com/MikaelaAnd)

## Frontend created by:
[Malin Österberg](https://github.com/msmalinosterberg)\
[Amanda Samuelsson](https://github.com/amandasamuelsson)\
[Moa Stenqvist](https://github.com/stonetwix)

## Kravspecifikation
#### Godkänt
- Alla sidor skall vara responsiva. 
  - Alla sidor är responsiva.

- Arbetet ska implementeras med en React frontend och en Express backend.
  - React och Express används.
 
- Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet.
- Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet.
  - Dessa är presenterade vid idégodkännandet.

- All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm).
  - All data sparas i Mongo-databasen.

- Man ska kunna logga in som administratör i systemet.
  - Går att logga in som admin. Inloggningsuppgifter finns ovan.

- Inga Lösenord får sparas i klartext i databasen.
  - Alla lösenord är krypterade.

- En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen. 
  - Lagersaldot uppdateras när en beställning är genomförd.

- Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan.
  - Admin kan uppdatera lagersaldo för varje produkt.

- Administratörer ska kunna se en lista på alla gjorda beställningar.
  - Admin kan se alla gjorda beställningar.

- Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera.
  - Admin kan koppla en produkt till önskade kategorier, även skapa nya kategorier. 

- Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori.
  - Produkterna kan filtreras efter kategori på startsidan.

- Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten.
  - Besökarens kundkorg sparas i local-storage.

- En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas.
  - Besökaren behöver vara inloggad för att kunna göra en beställning. 

- Besökare ska kunna välja ett av flera fraktalternativ.
  - Besökaren kan välja mellan tre olika fraktalternativ.

- Tillgängliga fraktalternativ ska vara hämtade från databasen.
  - Fraktalternativen hämtas från databasen.

- Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält.
  - Samtliga fält har validering. 

### Väl Godkänt
- Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen.
  - Nya användare sparas i databasen och har möjlighet att ansöka om att få bli admin. 

- En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången.
  - En besökare behöver först godkännas av en befintlig admin för att kunna logga in som admin.

- Administratörer ska kunna markera beställningar som skickade.
  - Admin kan markera beställningar som skickade. 

- När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte.
  - Som kund kan du se dina gjorda beställningar. 

- Administratörer ska kunna redigera vilka kategorier en produkt tillhör.
  - Admin kan ändra vilken/vilka kategorier en produkt tillhör. 

- Administratörer ska kunna lägga till och ta bort produkter.
  - Admin kan redigera, lägga till och ta bort produkter från sortimentet. 

- Backendapplikationen måste ha en fungerande global felhantering.
  - Backendapplikationen använder sig av global felhantering. 
