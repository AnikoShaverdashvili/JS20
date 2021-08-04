//https://reqres.in/api/users?page=2

/*  pirveli */
/*
let currentPage = 1;

function getUsers(page) {

    fetch('https://reqres.in/api/users?page=' + page, {
        method: 'GET'
    })

    .then(function(response) {
            if (response.status !== 200) {
                throw response.status;
            }
            return response.json();
        })
        .then(function(responseData) {
            //console.log(responseData);
            var fragment = document.createDocumentFragment();
            responseData.data.forEach(item => {
                let li = document.createElement('li');
                li.textContent = item.first_name;
                fragment.appendChild(li);
            });
            document.getElementById('list').append(fragment);
        })
        .catch(function(error) {
            if (error == 404) {
                let p = document.createElement('p');
                p.textContent = 'page not found';
                p.classList.add('error-text');
                document.getElementById('api').appendChild(p);
            } else {
                let p = document.createElement('p');
                p.textContent = 'server error';
                p.classList.add('error-text');
                document.getElementById('api').appendChild(p);
            }
            console.log(error);
        })

}

document.getElementById("loadmore").addEventListener('click', function() {
    currentPage++;
    getUsers(currentPage);

});

getUsers(currentPage);
*/

let currentPage = 1;
let totalPages;

function getUsers(page) {

    fetch('https://reqres.in/api/users?page=' + page, {
        method: 'GET'
    })

    .then(function(response) {
            if (response.status !== 200) {
                throw response.status;
            }
            return response.json();
        })
        .then(function(responseData) {
            var fragment = document.createDocumentFragment();

            responseData.data.forEach(item => {
                let li = document.createElement('li');
                li.classList.add("li-users");
                let span = document.createElement('span');
                span.textContent = item.first_name + " " + item.last_name;

                let img = document.createElement("img");
                img.classList.add("img-wraper");
                img.src = item.avatar;

                li.appendChild(img);
                li.appendChild(span);

                fragment.appendChild(li);
            });

            document.getElementById('list').innerHTML = '';
            document.getElementById('list').append(fragment);

            totalPages = responseData.total_pages
        })
        .catch(function(error) {
            if (error == 404) {
                let p = document.createElement('p');
                p.textContent = 'page not found';
                p.classList.add('error-text');
                document.getElementById('api').appendChild(p);
            } else {
                let p = document.createElement('p');
                p.textContent = 'server error';
                p.classList.add('error-text');
                document.getElementById('api').appendChild(p);
            }
            console.log(error);
        })

}

document.getElementById("previous").addEventListener('click', function() {
    var error_div = document.getElementById('error-div');
    error_div.innerHTML = '';
    if (currentPage === 1) {
        error_div.textContent = 'no more left';
        return;
    }
    currentPage -= 1;
    getUsers(currentPage);

});

document.getElementById("next").addEventListener('click', function() {

    var error_div = document.getElementById('error-div');
    error_div.textContent = '';
    if (currentPage === totalPages) {
        error_div.textContent = 'no more right';
        return;
    }
    currentPage += 1;
    getUsers(currentPage);

});

getUsers(currentPage);