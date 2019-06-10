(function() {
    let name = document.querySelector('section#aboutme address > div:first-of-type').innerHTML;
    let emailAddress = name.toLowerCase().replace(' ', '@').replace(/(tel)$/, '.$1');

    let emailLinks = document.querySelectorAll('a.email');
    for (let i = 0; i < emailLinks.length; ++i) {
        let link = emailLinks.item(i);
        link.innerHTML = emailAddress;
        link.addEventListener('click', e => {
            e.preventDefault();
            window.location.href = 'mailto:' + emailAddress;
        });
    }

    function lightSwitch(e) {
        document.body.className = e.target.checked ? 'dark' : '';
    }

    let lightSwitchElem = document.getElementById('darkmode');
    lightSwitchElem.addEventListener('click', lightSwitch);
    lightSwitch({target: lightSwitchElem});
})();
