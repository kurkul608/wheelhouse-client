import { UsersList } from "@/components/Users/List";
import { Page } from "@/components/Page";

export const metadata = {
  title: "Список пользователей",
};

export default async function UsersPage() {
  return (
    <Page>
      <UsersList />
    </Page>
  );
}
