import { useCallback, useState } from "react";
import { User, UserService } from "laerte_fernandes-sdk";

export default function useUser() {
  const [user, setUser] = useState<User.Detailed>();

  const fetchUser = useCallback(async function () {
    UserService.getDetailedUser(6).then(setUser);
  }, []);

  return {
    user,
    fetchUser,
  };
}