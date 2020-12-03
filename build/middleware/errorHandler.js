"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
exports.errorHandler = (error, _req, res, next) => {
    if (error.message === 'Invalid value')
        res.status(400).json({ error: error.message });
    else if (error.message === 'Invalid username or password')
        res.status(401).json({ error: error.message });
    else if (error.message === 'Not found')
        res.status(404).json({ error: error.message });
    else
        res.status(500).json({ error: 'Something went wrong' });
    next(error);
};
