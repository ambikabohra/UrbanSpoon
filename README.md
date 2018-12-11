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



1.	Download project
Git clone https://github.com/lkandukuri/UrbanSpoon.git 
2.	Go to project folder: 
 cd UrbanSpoon
3.	ls : to check if “yelp_final.csv” present in the path
4.	Import the dataset using this command: 
mongoimport -d yelp -c restaurants --type csv --file yelp_final.csv –headerline

 

5.	Check data is present in mongodb by following these commands:
a.	Type mongo
b.	Use yelp
c.	db.restaurants.findOne()

 

If the output is like the above image, that means the data is loaded properly. then, the application can be started. Now follow the steps to start the application (refer chapter 10).
