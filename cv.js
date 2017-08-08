(function() {
    var name = document.getElementById('name').innerHTML;
    var emailAddress = name.toLowerCase().replace(' ', '@').replace(/(tel)$/, '.$1');

    var emailLinks = document.querySelectorAll('a.email');
    for (var i = 0; i < emailLinks.length; ++i) {
        var link = emailLinks.item(i);
        link.innerHTML = emailAddress;
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'mailto:' + emailAddress;
        });
    }
})();
