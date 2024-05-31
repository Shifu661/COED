const requireLogin = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    } else {
      res.status(401).json({ success: false, message: 'No autorizado. Por favor, inicie sesión.' });
    }
  };
  
export default requireLogin;
  