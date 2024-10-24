POST: http://localhost:5000/api/articles
{
  "name": "Imprimante HP",
  "category": "Électronique",
  "subcategory": "Imprimante",
  "barcode": "987654321",
  "description": "Imprimante jet d'encre",
  "location": "617f191e810c19729de860ea", // Remplace par l'ID d'une zone valide
  "price": 300,
  "status": "bon"
}

response
{
    "name": "Imprimante HP",
    "category": "Électronique",
    "subcategory": "Imprimante",
    "barcode": "987654321",
    "description": "Imprimante jet d'encre",
    "location": "617f191e810c19729de860ea",
    "price": 300,
    "status": "bon",
    "_id": "671a0dbf77808a1ae9f7135b",
    "createdAt": "2024-10-24T09:05:03.653Z",
    "__v": 0
}

PUT: http://localhost:5000/api/articles/671a0dbf77808a1ae9f7135b
{
  "name": "Imprimante HP DeskJet",
  "category": "Électronique",
  "subcategory": "Imprimante",
  "barcode": "987654321",
  "description": "Imprimante couleur jet d'encre",
  "location": "617f191e810c19729de860ea", // ID valide d'une zone
  "price": 350,
  "status": "bon"
}

response
{
    "_id": "671a0dbf77808a1ae9f7135b",
    "name": "Imprimante HP DeskJet",
    "category": "Électronique",
    "subcategory": "Imprimante",
    "barcode": "987654321",
    "description": "Imprimante couleur jet d'encre",
    "location": "617f191e810c19729de860ea",
    "price": 350,
    "status": "bon",
    "createdAt": "2024-10-24T09:05:03.653Z",
    "__v": 0
}

Résumé des requêtes Postman :

    GET : Récupérer tous les articles.
        Méthode : GET
        URL : http://localhost:5000/api/articles

    POST : Ajouter un nouvel article.
        Méthode : POST
        URL : http://localhost:5000/api/articles
        Body : JSON (avec les détails de l'article).

    PUT : Mettre à jour un article.
        Méthode : PUT
        URL : http://localhost:5000/api/articles/:id
        Body : JSON (avec les nouvelles informations de l'article).

    DELETE : Supprimer un article.
        Méthode : DELETE
        URL : http://localhost:5000/api/articles/:id