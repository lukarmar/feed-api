import type { TokenPayload } from "@core/configs/auth";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SessionDataUserHelper {
  private static sessionData: TokenPayload;
  private _dataSession: TokenPayload;

  static setSessionData(data: TokenPayload): void {
    SessionDataUserHelper.sessionData = data;
  }

  get sessionData(): TokenPayload {
    this._dataSession = SessionDataUserHelper.sessionData;
    return this._dataSession;
  }
}