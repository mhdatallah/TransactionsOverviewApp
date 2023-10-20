import {TransactionRecord, TransactionStatus, TransactionOrigin} from './types';

export const groupRecordsByTimestamp = (
  records: TransactionRecord[],
): Record<string, TransactionRecord[]> =>
  records.reduce((groupedRecords, record) => {
    if (!groupedRecords[record.timestamp]) {
      groupedRecords[record.timestamp] = [];
    }
    groupedRecords[record.timestamp].push(record);
    return groupedRecords;
  }, {} as Record<string, TransactionRecord[]>);

export const generateMockRecords = (): TransactionRecord[] => {
  const mockRecords: TransactionRecord[] = [];
  const statusValues = Object.values(TransactionStatus);
  const originValues = Object.values(TransactionOrigin);

  for (let i = 0; i < 1000; i++) {
    const randomStatus =
      statusValues[Math.floor(Math.random() * statusValues.length)];
    const randomOrigin =
      originValues[Math.floor(Math.random() * originValues.length)];
    const timestamp = new Date().toISOString(); // You can generate random timestamps here
    const record: TransactionRecord = {
      objectType: 'TRANSACTION',
      status: randomStatus,
      objectId: `Transaction_${i}`,
      timestamp,
      details: {
        origin: randomOrigin,
      },
    };
    mockRecords.push(record);
  }

  return mockRecords;
};
