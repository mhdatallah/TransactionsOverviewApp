export enum TransactionStatus {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  IN_REVIEW = 'IN_REVIEW',
}

export enum TransactionOrigin {
  MOBILE_APP = 'MOBILE_APP',
  WEB_PORTAL = 'WEB_PORTAL',
  IN_PERSON = 'IN_PERSON',
  ATM_MACHINE = 'ATM_MACHINE',
  PHONE_CALL = 'PHONE_CALL',
}

export interface TransactionDetails {
  origin: TransactionOrigin;
}

export interface TransactionRecord {
  objectType: 'TRANSACTION';
  status: TransactionStatus;
  objectId: string;
  timestamp: string;
  details: TransactionDetails;
}
