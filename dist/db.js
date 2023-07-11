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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
var pg_1 = __importDefault(require("pg"));
var Pool = pg_1.default.Pool;
var pool = new Pool({
    database: process.env.DB_NAME,
    host: "postgresdb",
    password: process.env.DB_PASSWORD,
    port: 5432,
    user: process.env.DB_USER,
});
function getTasks() {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, tasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("SELECT * FROM task")];
                case 2:
                    result = _a.sent();
                    tasks = result.rows;
                    client.release();
                    return [2 /*return*/, tasks];
            }
        });
    });
}
exports.getTasks = getTasks;
function createTask(task) {
    return __awaiter(this, void 0, void 0, function () {
        var id, title, status, client, result, newTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = task.id, title = task.title, status = task.status;
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("INSERT INTO task (id, title, status) VALUES ($1, $2, $3) RETURNING *", [id, title, status])];
                case 2:
                    result = _a.sent();
                    newTask = result.rows[0];
                    client.release();
                    return [2 /*return*/, newTask];
            }
        });
    });
}
exports.createTask = createTask;
function updateTask(task) {
    return __awaiter(this, void 0, void 0, function () {
        var id, title, status, client, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = task.id, title = task.title, status = task.status;
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("UPDATE task SET title = $1, status = $2, \"updatedAt\" = now() WHERE id = $3 RETURNING *", [title, status, id])];
                case 2:
                    result = _a.sent();
                    if (result.rows.length === 0) {
                        throw new Error("Not Found");
                    }
                    client.release();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
exports.updateTask = updateTask;
function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("DELETE FROM task WHERE id = $1", [id])];
                case 2:
                    result = _a.sent();
                    if (result.rowCount === 0) {
                        throw new Error("Not Found");
                    }
                    client.release();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteTask = deleteTask;
//# sourceMappingURL=db.js.map