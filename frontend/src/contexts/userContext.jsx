import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const value = React.useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default useUser;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
