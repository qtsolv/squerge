# squerge

Utility [npm](https://www.npmjs.com/) package to merge multiple test execution reports for [SonarQube](https://www.sonarqube.org/).

### Installation

To install the library in your project, use below command:

```shell
npm install squerge
```

Or install globally to use the cli:

```shell
npm install --global squerge
```

### Usage

To use it from within code, use as below:

```javascript
const {merge} = require('squerge');

merge(
    ['reports/*.spec.js.xml'],
    'reports/combined.xml'
).then(() => {
    // done saving to reports/combined.xml
}).catch((err) => {
    // failed for some reason
});
```

Or you can directly merge reports from command-line as below:

```shell
squerge -o reports/combined.xml "reports/*.spec.js.xml"
```

### License

See the [LICENSE](LICENSE) file.
