var request = require("request");

var base_url = "http://localhost:3000/"

describe("Social App Server", function() {
  	describe("GET /posts", function() {
  		var endpoint = "posts"
    	it("return 3 posts", function(done) {
	    	request.get(base_url + endpoint, function(error, response, body) {
	        	expect(response.statusCode).toBe(200)
	        	expect(JSON.parse(response.body).length).toBe(3)
	        	done()
	    	})
    	})
  	})

  	describe("GET /posts/2", function() {
  		var endpoint = "posts/2"
  		it("returns the second post with id 2", function(done) {
  			request.get(base_url + endpoint, function(error, response, body) {
  				var body = JSON.parse(response.body)

  				expect(response.statusCode).toBe(200)
  				expect(body.id).toBe(2)
  				done()
  			})
  		})
  	})

  	describe("GET /posts/4", function() {
  		var endpoint = "posts/4"
  		it("returns empty array with id 4", function(done) {
  			request.get(base_url + endpoint, function(error, response, body) {
  				var body = JSON.parse(response.body)

  				expect(response.statusCode).toBe(200)
  				expect(body.length).toBe(0)
  				done()
  			})
  		})
  	})

  	describe("POST /post increment the number of posts", function() {
  		var endpoint = "post"
  		it("increment the post id when adding two posts", function(done) {
  			var requestData = {
				body: "test body"
			}

			request({
			    url: base_url + endpoint,
			    qs: {from: 'zz23', time: +new Date()},
			    method: 'POST',
			    json: {
			        body: 'data'
			    }
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			    } else {
	  				expect(body.id).toBe(4)

			  		request({
					    url: base_url + endpoint,
					    qs: {from: 'zz23', time: +new Date()},
					    method: 'POST',
					    json: {
					        body: 'data'
					    }
					}, function(error, response, body){
					    if(error) {
					        console.log(error);
					    } else {
			  				expect(body.id).toBe(5)
						}
						done()
					});
				}
			});  		
  		})
  	})
})