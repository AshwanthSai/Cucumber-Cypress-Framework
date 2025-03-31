const NavBarActions = require('../../../PageObjects/PageActions/NavBarActions');
const SearchPageActions = require('../../../PageObjects/PageActions/SearchPageActions');
const PaginationElementActions = require('../../../PageObjects/PageActions/PaginationElementActions');
const LoginPageActions = require('../../../PageObjects/PageActions/LoginPageActions');


module.exports = {
  navBarAction: new NavBarActions(),
  searchPageActions: new SearchPageActions(),
  paginationElementActions: new PaginationElementActions(),
  loginPageActions: new LoginPageActions(),
};