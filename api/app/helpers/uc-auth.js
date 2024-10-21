module.exports = UCAuth;

async function UCAuth(req, res, next) {
	
	console.log(JSON.stringify(req.headers));
    
    // check for cn header
    const cn = req.header('cn');
	if (!cn || cn.trim().length === 0) {
        return res.status(401).json({ message: 'Missing CN Header' });
    }
	
	// check for mail header
    const mail = req.header('mail');
	if (!mail || mail.trim().length === 0) {
        return res.status(401).json({ message: 'Missing MAIL Header' });
    }
	
	// check for mail header
    const displayName = req.header('displayName');
	if (!displayName || displayName.trim().length === 0) {
        return res.status(401).json({ message: 'Missing displayName Header' });
    }

    const currentUser = {
		cn : cn,
		mail: mail,
		displayName: displayName
	};

    // attach user to request object
    req.currentUser = currentUser;

    next();
}
