"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo =
  exports.putTodo =
  exports.postTodo =
  exports.getTodo =
    void 0;
var pg_1 = __importDefault(require("pg"));
var Pool = pg_1.default.Pool;
var pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "todo",
});
function getTodo(req, res) {
  return __awaiter(this, void 0, void 0, function () {
    var client, result, todos;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, pool.connect()];
        case 1:
          client = _a.sent();
          return [4 /*yield*/, client.query("SELECT * FROM task")];
        case 2:
          result = _a.sent();
          todos = result.rows;
          client.release();
          res.json(todos);
          return [2 /*return*/];
      }
    });
  });
}
exports.getTodo = getTodo;
function postTodo(req, res) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, id, title, status, client, query, values, result, newTodo;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (_a = req.body),
            (id = _a.id),
            (title = _a.title),
            (status = _a.status);
          return [4 /*yield*/, pool.connect()];
        case 1:
          client = _b.sent();
          query =
            "INSERT INTO task (id, title, status) VALUES ($1, $2, $3) RETURNING *";
          values = [id, title, status];
          return [4 /*yield*/, client.query(query, values)];
        case 2:
          result = _b.sent();
          newTodo = result.rows[0];
          client.release();
          res.status(200).json(newTodo);
          return [2 /*return*/];
      }
    });
  });
}
exports.postTodo = postTodo;
function putTodo(req, res) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, id, title, status, client, query, values, result, updatedTodo;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (_a = req.body),
            (id = _a.id),
            (title = _a.title),
            (status = _a.status);
          return [4 /*yield*/, pool.connect()];
        case 1:
          client = _b.sent();
          query =
            "UPDATE task SET title = $1, status = $2 WHERE id = $3 RETURNING *";
          values = [title, status, id];
          return [4 /*yield*/, client.query(query, values)];
        case 2:
          result = _b.sent();
          if (result.rows.length === 0) {
            return [2 /*return*/, res.status(404).json("Not Found")];
          }
          client.release();
          updatedTodo = result.rows[0];
          res.status(200).json(updatedTodo);
          return [2 /*return*/];
      }
    });
  });
}
exports.putTodo = putTodo;
function deleteTodo(req, res) {
  return __awaiter(this, void 0, void 0, function () {
    var id, client, query, values, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          id = req.query.id;
          return [4 /*yield*/, pool.connect()];
        case 1:
          client = _a.sent();
          query = "DELETE FROM task WHERE id = $1";
          values = [id];
          return [4 /*yield*/, client.query(query, values)];
        case 2:
          result = _a.sent();
          if (result.rowCount === 0) {
            return [2 /*return*/, res.status(404).json("Not Found")];
          }
          client.release();
          res.json({ ok: true });
          return [2 /*return*/];
      }
    });
  });
}
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=apiHandler.js.map
