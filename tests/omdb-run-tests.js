exports.config = {  
        capabilities: {
            'browserName': 'chrome',
            'chromeOptions': {                
                args: ['--disable-web-security'] /// disable to access api
            } 
        },
        seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
        specs: [
            '*.test.js'
        ],
        jasmineNodeOpts: {
          showColors: true,
          isVerbose: true, /// see whats executing
          defaultTimeoutInterval: 30000
        }
};
