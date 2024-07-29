import { redirect } from "next/navigation";

export default function SettingsIndexPage() {
  return redirect("/admin/settings/profile");
}
