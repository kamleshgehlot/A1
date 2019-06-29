import React, { useState, useEffect } from 'react';

import MuiVirtualizedTable from '../../../common/MuiVirtualizedTable';

// API CALL
import UserAPI from '../../../../api/franchise/User';

import { store, useStore } from '../../../../store/hookStore';

export default function UserList(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await UserAPI.list();
        setUserList(result.userList);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <MuiVirtualizedTable
      rowCount={userList.length ? userList.length : 0}
      rowGetter={({ index }) => userList[index]}
      columns={[
        {
          width: 200,
          label: 'Name',
          dataKey: 'name',
        },
        {
          width: 120,
          label: 'User Id',
          dataKey: 'user_id',
        },
        {
          width: 120,
          label: 'Active',
          dataKey: 'is_active',
        },
        {
          width: 120,
          label: 'Created Date',
          dataKey: 'created_at',
        },
      ]}
    />
  );
}
