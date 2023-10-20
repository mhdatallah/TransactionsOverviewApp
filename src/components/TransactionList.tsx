import React from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';
import {
  TransactionRecord,
  TransactionStatus,
  TransactionOrigin,
} from '../types';
import {generateMockRecords, groupRecordsByTimestamp} from '../utilts';

const transactionData = generateMockRecords();

export const TransactionList: React.FC<{navigation: any}> = ({navigation}) => {
  const groupedRecords = groupRecordsByTimestamp(transactionData);

  const handleTransactionPress = (record: TransactionRecord) => {
    const {status, details, objectId} = record;

    if (
      status === TransactionStatus.DECLINED ||
      status === TransactionStatus.CANCELLED
    ) {
      navigation.navigate('ErrorScreen', {objectId});
    } else if (
      details.origin === TransactionOrigin.IN_PERSON ||
      details.origin === TransactionOrigin.ATM_MACHINE
    ) {
      navigation.navigate('DetailsScreen1', {objectId});
    } else {
      navigation.navigate('DetailsScreen2', {objectId});
    }
  };

  return (
    <FlatList
      data={Object.keys(groupedRecords)}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <View>
          <Text>{item}</Text>
          {groupedRecords[item].map(record => (
            <TouchableOpacity
              key={record.objectId}
              onPress={() => handleTransactionPress(record)}>
              {getTransactionIcon(record)}
              <Text>{getTransactionTitle(record)}</Text>
              <Text>{getTransactionDescription(record)}</Text>
              <Text>{formatTimestamp(record.timestamp)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    />
  );
};

const getTransactionIcon = (record: TransactionRecord) => {
  if (record.details.origin === TransactionOrigin.MOBILE_APP) {
    return <Icon name="mobile" size={24} color="blue" />;
  } else if (record.details.origin === TransactionOrigin.PHONE_CALL) {
    return <Icon name="phone" size={24} color="green" />;
  } else {
    // For other origins, use icons based on the transaction status
    switch (record.status) {
      case TransactionStatus.APPROVED:
        return <Icon name="check" size={24} color="green" />;
      case TransactionStatus.DECLINED:
        return <Icon name="times" size={24} color="red" />;
      case TransactionStatus.PENDING:
        return <Icon name="clock" size={24} color="yellow" />;
      case TransactionStatus.CANCELLED:
        return <Icon name="ban" size={24} color="red" />;
      case TransactionStatus.IN_REVIEW:
        return <Icon name="hourglass" size={24} color="orange" />;
      default:
        return null;
    }
  }
};

const getTransactionTitle = (record: TransactionRecord) =>
  `Transaction ${record.status}`;

const getTransactionDescription = (record: TransactionRecord) =>
  `The transaction ${record.objectId} has been ${record.status} from ${record.details.origin}`;

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toDateString(); // Customize the date formatting as needed
};
