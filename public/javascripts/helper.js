const Handlebars = require('handlebars')
Handlebars.registerHelper('isMatched', function (a, b, option) {
  if (a === b) return 'selected'
})
module.exports = Handlebars
