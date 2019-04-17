chrome.app.runtime.onLaunched.addListener(
    function () {
        chrome.app.window.create('index.html', {'bounds': {
            'width': Math.round(window.screen.width*0.8),
            'height': Math.round(window.screen.height*0.8)
        }});
    }
);