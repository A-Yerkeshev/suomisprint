const checkPermissions = async (req, res, next) => {
  if (req.user.role != 1) {
    res.status(401).json({error: 'Only teachers are authorized for this action'});
    return;
  }

  next();
}

module.exports = { checkPermissions };
