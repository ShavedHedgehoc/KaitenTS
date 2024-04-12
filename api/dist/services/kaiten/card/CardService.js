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
const consts_1 = require("../../../consts/consts");
const http_1 = require("../../../http");
class CardService {
    constructor() {
        this.makeReqData = (data) => {
            return {
                title: data.marking,
                board_id: data.boardId,
                column_id: data.columnId,
                asap: false,
                due_date_time_present: false,
                expires_later: false,
                type_id: [consts_1.kaitenCardProperties.type],
                properties: {
                    [consts_1.kaitenCardProperties.apparatus]: data.apparatus,
                    [consts_1.kaitenCardProperties.batch]: data.batch,
                    [consts_1.kaitenCardProperties.bbf]: data.bbf,
                    [consts_1.kaitenCardProperties.can]: data.can,
                    [consts_1.kaitenCardProperties.conveyor]: data.conveyor,
                    [consts_1.kaitenCardProperties.marking]: data.marking,
                    [consts_1.kaitenCardProperties.note]: data.note,
                    [consts_1.kaitenCardProperties.plan]: data.plan,
                    [consts_1.kaitenCardProperties.serie]: data.serie,
                },
            };
        };
    }
    createCard(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = consts_1.kaitenRoutes.CARDS;
            const data = this.makeReqData(payload);
            const serverResponse = yield http_1.$kaitenApi.post(url, data);
            return serverResponse.data;
        });
    }
}
exports.default = CardService;
