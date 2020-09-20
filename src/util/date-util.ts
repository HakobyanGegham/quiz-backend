import {Injectable} from "@nestjs/common";

@Injectable()
export default class DateUtil {
    getTimestampFormattedDate(date: Date): string {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const monthStr = month < 10 ? `0${month}` : `${month}`;
        const dayStr = this.getDatePiece(date.getDate());
        const hours = date.getHours();
        const minutesStr = this.getDatePiece(date.getMinutes());
        const secondsStr = this.getDatePiece(date.getSeconds());
        return `${year}-${monthStr}-${dayStr} ${hours}:${minutesStr}:${secondsStr}`;
    }

    private getDatePiece(piece: number): string {
        return piece < 10 ? `0${piece}` : `${piece}`;
    }
}
