(function() {
    var name = document.querySelector('section#aboutme address > div:first-of-type').innerHTML;
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

    function lightSwitch(e) {
        document.body.className = e.target.checked ? 'dark' : '';
    }

    var lightSwitchElem = document.getElementById('darkmode');
    lightSwitchElem.addEventListener('click', lightSwitch);
    lightSwitch({target: lightSwitchElem})
})();
