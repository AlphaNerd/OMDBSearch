describe('Get data from OMDB api', function(){

	it('should search a title and return list, then access first result', function() {   //// run a basic user search by Title
		browser.get('http://localhost:8100/#/app');
		///search a movie
	  	element(by.model('mySearch.title')).sendKeys('God Father'); /// hey, its a classic!
	  	browser.sleep(1000);
	  	///click submit
    	element(by.css('.button.ion-search')).click();

    	var count = element.all(by.repeater('item in OMDB_RESULTS'));
		count.then(function(result){  /// count result list and make sure we have results
		    expect(result.length).toBeGreaterThan(0);
		});
		browser.sleep(1000);
		/// click first item
		element(by.css('a.item:first-child')).click()
		browser.sleep(3000);
	});
	
	/*  
	This could be expanded to:
	- check all data fields in the view
	- validate closure of side menu
	- etc
	*/

});