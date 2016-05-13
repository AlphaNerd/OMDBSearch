describe('Get data from OMDB api', function(){

	it('should search a title and return list, then access first result', function() {   //// run a basic user search by Title
		browser.get('http://localhost:8100/#/app');
		///search a movie
	  	element(by.model('mySearch.id')).sendKeys('tt3722118'); /// hey, its a classic!
	  	browser.sleep(1000);
	  	///click submit
    	element(by.css('.button.ion-search')).click();
		browser.sleep(1000);

		var value = element.all(by.css('.main-title')).evaluate('data.title');

	});

	/*  
	This could be expanded to:
	- check all data fields in the view
	- to validate the display of highcharts data
	- to validate display of rotten tomatoes data vs user settings
	*/
	
});