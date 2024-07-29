import { Separator } from "@/components/ui/separator";
import AccountForm from "@/components/admin/settings/account/AccountForm";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your passwords and account related fields.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
