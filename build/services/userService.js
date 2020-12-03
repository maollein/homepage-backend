"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db/db"));
const getUserWithLoginCounter = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * \
    FROM user_account \
    INNER JOIN login_counter ON (user_account.id = login_counter.user_id) \
    WHERE user_account.username=$1;', [username]);
    if (result.rows.length < 1)
        return null;
    return result.rows[0];
});
const updateLoginCounter = (incrementOrLock, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    switch (incrementOrLock) {
        case 'increment':
            query = 'UPDATE login_counter \
        SET login_count=login_count+1 \
        WHERE user_id=$1 \
        RETURNING *;';
            break;
        case 'lock':
            query = "UPDATE login_counter \
        SET login_count=0, locked_until=(NOW() AT TIME ZONE 'utc' + INTERVAL '10 minutes') \
        WHERE user_id=$1 \
        RETURNING *;";
            break;
        case 'reset':
            query = "UPDATE login_counter \
        SET login_count=0, locked_until=NULL \
        WHERE user_id=$1 \
        RETURNING *;";
            break;
    }
    const result = yield db_1.default.query(query, [userId]);
    return result.rows[0];
});
exports.default = {
    getUserWithLoginCounter,
    updateLoginCounter
};
