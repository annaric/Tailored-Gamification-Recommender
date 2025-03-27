"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRecommender_1 = __importDefault(require("./AbstractRecommender"));
let CompetitionDictonary;
class GenderBasedRecommender extends AbstractRecommender_1.default {
    constructor() {
        super();
    }
    recommend(...input) {
        if (input[0] === 'female' || input[0] === 'male') {
            return CompetitionDictonary[input[0]];
        }
        throw new Error("Invalid input");
    }
    updateAlgorithm() {
        CompetitionDictonary = { female: 1.5, male: 0.5 };
    }
}
exports.default = GenderBasedRecommender;
