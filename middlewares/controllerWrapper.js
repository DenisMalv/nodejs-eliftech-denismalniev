const CreateError = require("http-errors");

const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      console.log("controllerWrapper", controller);
      await controller(req, res, next);
    } catch (error) {
      console.log("error");
      const newError = requestErrorType(controller, error);
      next(
        CreateError(newError.errorStatus, newError.errorMessage, {
          statusOperation: false,
          code: newError.errorStatus,
        })
      );
    }
  };
};
module.exports = controllerWrapper;

function requestErrorType(controller, error) {
  let errorMessage = null;
  let errorStatus = error.status;
  switch (controller.name) {
    case "getItemById":
      errorMessage = "not found";
      errorStatus = 404;
      break;
    case "removeItem":
      errorMessage = "Can't delete.";
      errorStatus = 404;
      break;
    case "addItem":
      errorMessage = "Can't add.";
      errorStatus = 404;
      break;
    case "updateItem":
      errorMessage = "Can't update.";
      errorStatus = 404;
      break;
    default:
      errorMessage = error.message;
  }
  return { errorMessage, errorStatus };
}
