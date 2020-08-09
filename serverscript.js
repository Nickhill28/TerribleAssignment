var express = require('express');
var app = express();
const PORT = process.env.PORT || 5000;
var axios = require('axios');
var path = require('path');
var serveStatic = require('serve-static');

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(serveStatic(path.join(__dirname, 'public')))


function countWords(sentence) {
	var frequency = {};
	var words = sentence
              .replace(/[.,?!;()"'-]/g, " ")
              .replace(/\s+/g, " ")
              .toLowerCase()
              .split(" ");
    var uniq = []
    words.forEach(function (word) {
        if (!(frequency.hasOwnProperty(word))) {
            frequency[word] = 0;
            uniq.push(word)
        }
        frequency[word]++;
    });
    uniq.sort(function(a,b){return(frequency[b]-frequency[a])})
    return [uniq,frequency];
}

app.get('/api/getwords/:value', function(request, response) {
    var value = request.params.value;
	axios.get('http://terriblytinytales.com/test.txt')
		.then(function (res) {
			var data = countWords(res.data)
			var uniq = data[0]
			var frequency = data[1]
			var resp = []
			if (value>uniq.length){
				uniq.forEach(function(word){
					resp.push([word,frequency[word]])
				})
			}
			else{
				for (var i = 0; i < value; i++) {
					resp.push([uniq[i],frequency[uniq[i]]])
				}
			}
			response.send(resp)
		})
	 	.catch(function (error) {
	    	response.send(error);
	 	});
});

app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});


app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});
