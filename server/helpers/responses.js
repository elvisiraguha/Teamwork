class ResponseHandler {
  static success(res, status, message, data) {
    return res.status(status).json({
      status,
      message,
      data,
    });
  }

  static error(res, status = 500, error) {
    return res.status(status).json({
      status,
      error,
    });
  }
}

export default ResponseHandler;
