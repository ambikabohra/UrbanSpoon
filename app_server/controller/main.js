var lineReader = require('line-reader');
function sendPage(fileName, result)
{
    var html = '';
    
    // Read the file one line at a time.
    lineReader.eachLine(fileName,
        function(line, last)
        {
            html += line + '\n';

            if (last) 
            { 
                result.send(html);
                return false; 
            }
            else
            {
                return true;
            }
        });
}

exports.home = function(request, result) 
{
    sendPage('landing_page.html', result);
};
exports.test = function(request, result) 
{
    sendPage('test.html', result);
};
exports.login = function(request, result) 
{
    sendPage('login_new.html', result);
};

exports.signup = function(request, result)
{
    sendPage('register.html', result);
};

exports.restaurants = function(request, result) 
{
    sendPage('restaurants.html', result);
};

exports.profile = function(request, result) 
{
    sendPage('profile.html', result);
};

// function sendBody(text, result)
// {
//     var html = '<!DOCTYPE html>\n'
//         + '<html lang="en-US">\n'
//         + '<head>\n'
//         + '    <meta charset="UTF-8">\n'
//         + '    <title>Urban Spoon</title>\n'
//         + '    <link rel="stylesheet" href="home.css">\n'
//         + '</head>\n'
//         + '<body>\n'
// 		+ '<h2> Welcome to Urban Spoon!! </h2>'
// 		+ '<p>'
//         + '    ' + text + '\n'  // insert the body text
// 		+ '<p>'
//         + '</body>\n'
//         + '</html>\n';
    
//     result.send(html);    
// }


// function modify(text, request)
// {
//     if (request.body.strong)
//     {
//         text = '<strong>' + text + '</strong>'; 
//     }
    
//     if (request.body.em)
//     {
//         text = '<em>' + text + '</em>'; 
//     }
    
//     return text;
// }

