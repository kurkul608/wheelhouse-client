import { UsersList } from "@/components/Users/List";
import { Page } from "@/components/Page";

export default async function UsersPage() {
  return (
    <Page>
      <UsersList />
    </Page>
  );
}
