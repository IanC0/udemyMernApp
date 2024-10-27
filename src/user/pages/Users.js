import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from '../../shared/hooks/http-hook'

const Users = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/api/users");

        setLoadedUsers(responseData.users); // response from API is { users: [stuff] }
      } catch (err) {
      // no longer need to do anything with catch
      }
    };
    fetchUsers();
    // sendRequest is added as a dependency, can't see why but supposedly its general you should add
    // any variable or method you're referring to from inside of useEffect as a dependency to ensure the effect re-runs
    // if such a dependency changes (not sure why it would change though)
  },[sendRequest]);

 
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />} ;
    </React.Fragment>
  );
};

export default Users;
