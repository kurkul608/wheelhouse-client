"use client";

import { Select } from "@telegram-apps/telegram-ui";
import { User, UserRole } from "@/models/user";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { updateUserRole } from "@/admin/users/updateRole";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";

interface ChangeUserRoleProps {
  user: User;
  refresh(): void;
}

export const ChangeUserRole: FC<ChangeUserRoleProps> = ({ user, refresh }) => {
  const router = useRouter();
  const lp = useLaunchParams();

  const isAdminActive = user.roles.some(
    (role) => role === "ADMIN" || role === "SUPER_ADMIN",
  );
  const onRoleChange = async (role: UserRole) => {
    await updateUserRole(user.id, role, getAuthorization(lp) as AxiosHeaders);
    router.refresh();
    refresh();
  };

  const getMainRole = (): UserRole => {
    if (user.roles.some((role) => role === "ADMIN")) {
      return "ADMIN";
    }
    if (user.roles.some((role) => role === "MANAGER")) {
      return "MANAGER";
    }
    return "USER";
  };

  return (
    <Select
      onChange={(event) => {
        onRoleChange(event.target.value as UserRole);
      }}
      value={getMainRole()}
    >
      <option disabled>-</option>
      <option value="USER">Пользователь</option>
      <option value="MANAGER">Менеджер</option>
      <option value="ADMIN" disabled={!isAdminActive}>
        Администратор
      </option>
    </Select>
  );
};
