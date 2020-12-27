const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const db = require('./db.json');

server.use(middlewares);

server.get('/chart/employee', (req, res) => {
  const employees = db.employees
  const mansCount = employees.filter(item => item.gender === '1').length
  const womansCount = employees.filter(item => item.gender === '2').length
  const itDepartmentCount = employees.filter(item => item.department === '2').length
  const accountDepartmentCount = employees.filter(item => item.department === '1').length
  const marketingDepartmentCount = employees.filter(item => item.department === '3').length
  const averageAge = employees.reduce((prev, user) => {
      const now = new Date();
      const birthDate = new Date(user.birthDate)
      const age = Math.ceil((now - birthDate) / (1000 * 60 * 60 * 24 * 365))
      return prev + age
    }, 0) / employees.length;
  res.jsonp({
    averageAge: averageAge,
    count: {
      all: employees.length,
      mans: mansCount,
      womans: womansCount,
      itDepartment: itDepartmentCount,
      accountDepartment: accountDepartmentCount,
      marketingDepartment: marketingDepartmentCount
    }    
  });
})

server.use(router);

server.listen(port);
