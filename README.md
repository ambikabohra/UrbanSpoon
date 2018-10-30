# UrbanSpoon


  1. Data is extracted from https://www.kaggle.com/caicell/zomato-india-restaurants-eda
  
  2. Install mongodb
  
  3. Import the dataset by following command:
  
        mongoimport -d urbanspoon -c restaurants --type csv --file zomato.csv —headerline
        
  4. Open MongoDb
  
  5. Use urbanspoon (collection name)
  6. Rename fields in imported collection:
  
    db.restaurants.update( {} , { $rename : {'Aggregate rating' : 'rating' }}, true, true );
    
    db.restaurants.update( {} , { $rename : {'Restaurant Name' : 'Name' }}, true, true );
    
    db.restaurants.update( {} , { $rename : {'Price range' : 'price_range' }}, true, true );
    
    db.restaurants.update( {} , { $rename : {'avgCost' : 'avg_cost' }}, true, true );
    
    db.restaurants.update( {} , { $rename : {'Country Code' : 'Country_Code' }}, true, true ); 
    
  7. Run the application
        npm install
        node app.js



