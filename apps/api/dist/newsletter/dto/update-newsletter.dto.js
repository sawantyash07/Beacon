"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNewsletterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_newsletter_dto_1 = require("./create-newsletter.dto");
class UpdateNewsletterDto extends (0, mapped_types_1.PartialType)(create_newsletter_dto_1.CreateNewsletterDto) {
}
exports.UpdateNewsletterDto = UpdateNewsletterDto;
//# sourceMappingURL=update-newsletter.dto.js.map