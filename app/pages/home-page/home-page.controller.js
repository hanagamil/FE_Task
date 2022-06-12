angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees, $location) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.filterValue = '';

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }

  homePageVm.filterValueChanged = function (value) {
    homePageVm.filterValue = value;
    if (value.length > 0) {
      $location.path('/').search({ filter: value });
    } else {
      $location.path('/').search({ filter: null });
    }
  };
}
