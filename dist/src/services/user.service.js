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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../_helpers/db");
const User_1 = require("../entities/User");
class UserService {
    constructor() {
        this.userRepository = db_1.AppDataSource.getRepository(User_1.User);
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepository.create(userData);
            yield this.userRepository.save(user);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOneBy({ id });
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.update(id, userData);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.delete(id);
        });
    }
}
exports.UserService = UserService;
