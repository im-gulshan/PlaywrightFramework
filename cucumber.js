const common = `
--require-module ts-node/register
--require src/**/*.ts
--format summary
--format progress-bar
--format @cucumber/pretty-formatter
--format-options ${JSON.stringify({ snippetInterface: `async-await` })}
--format html:reports/cucumber-report.html
--format json:reports/cucumber-report.json
`;

module.exports = {
    default: `${common}`,
}