# UrbanSpoon


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

 
