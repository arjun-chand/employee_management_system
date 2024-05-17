const fs = require("fs").promises;
const path = require("path");

const userRoutesFolderPath = path.join(__dirname, "..", "routes", "UserApi");
const employeeRoutesFolderPath = path.join(__dirname, "..", "routes", "EmployeeApi");

async function readDirectory(folderPath) {
  const files = await fs.readdir(folderPath);
  const currentWorkingDir = process.cwd();
  const routes = files.map(
    (file) =>
      `./${path.relative(currentWorkingDir, path.join(folderPath, file))}`
  );
  return routes;
}

const routePaths = (async () => {
  const userRoutes = await readDirectory(userRoutesFolderPath);
  const employeeRoutes = await readDirectory(employeeRoutesFolderPath);

  return userRoutes.concat(employeeRoutes);
})();

module.exports = routePaths;
