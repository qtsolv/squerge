const expect = require('expect.js');
const fs = require('fs');
const path = require('path');
const {convert} = require('xmlbuilder2');
const {merge} = require('../src/merge');

const sources = [
  path.join(__dirname, '..', 'sample', '*.spec.js.xml'),
];
const output = path.join(__dirname, '..', 'sample', 'combined.xml');

describe('src/merge.js', function() {
  beforeEach(() => {
    fs.existsSync(output) && fs.unlinkSync(output);
  });

  it('should merge empty sources', async function() {
    await merge([], output);
    const xml = fs.readFileSync(output, {encoding: 'utf-8'});
    const document = convert(xml, {format: 'object'});
    expect(document).to.have.property('testExecutions');
    expect(document.testExecutions).to.not.have.property('file');
  });

  it('should merge non-existent sources', async function() {
    await merge(['non_existent.xml'], output);
    const xml = fs.readFileSync(output, {encoding: 'utf-8'});
    const document = convert(xml, {format: 'object'});
    expect(document).to.have.property('testExecutions');
    expect(document.testExecutions).to.not.have.property('file');
  });

  it('should merge reports', async function() {
    await merge(sources, output);
    const xml = fs.readFileSync(output, {encoding: 'utf-8'});
    const document = convert(xml, {format: 'object'});
    expect(document).to.have.property('testExecutions');
    expect(document.testExecutions).to.have.property('file');
    expect(document.testExecutions.file).to.be.an('array');
    expect(document.testExecutions.file).to.have.length(2);
    expect(document.testExecutions.file[0]).to.have.property('@path');
    expect(document.testExecutions.file[0]['@path'])
        .to.eql('tests/execution1.spec.js');
    expect(document.testExecutions.file[1]).to.have.property('@path');
    expect(document.testExecutions.file[1]['@path'])
        .to.eql('tests/execution2.spec.js');
  });
});
