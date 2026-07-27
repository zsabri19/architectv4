import { FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, ShieldCheck, UserRoundCheck, UserRoundX } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { normalizeApiError, readResponseBody } from "@/lib/api-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type CrmUser = { id: string; name: string; email: string; role: "admin" | "member"; status: "active" | "disabled" };

export default function UsersSettingsPage() {
  const [users, setUsers] = useState<CrmUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member" as "admin" | "member" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiFetch("/crm-users");
      if (!response.ok) throw new Error(normalizeApiError(await readResponseBody(response)).message);
      const body = (await response.json()) as { data: { users: CrmUser[] } };
      setUsers(body.data.users);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const createUser = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await apiFetch("/crm-users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error(normalizeApiError(await readResponseBody(response)).message);
      toast.success("User created");
      setOpen(false);
      setForm({ name: "", email: "", password: "", role: "member" });
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create user");
    } finally {
      setSubmitting(false);
    }
  };

  const update = async (user: CrmUser, change: Partial<Pick<CrmUser, "role" | "status">>) => {
    try {
      const response = await apiFetch(`/crm-users/${user.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(change)
      });
      if (!response.ok) throw new Error(normalizeApiError(await readResponseBody(response)).message);
      toast.success("User updated");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update user");
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">Manage CRM access and administrator roles.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="size-4" /> Add user</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add user</DialogTitle></DialogHeader>
            <form onSubmit={createUser} className="space-y-4">
              <div className="space-y-1.5"><Label htmlFor="user-name">Name</Label><Input id="user-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="space-y-1.5"><Label htmlFor="user-email">Email</Label><Input id="user-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
              <div className="space-y-1.5"><Label htmlFor="user-password">Temporary password</Label><Input id="user-password" type="password" minLength={10} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
              <div className="space-y-1.5"><Label>Role</Label><Select value={form.role} onValueChange={(role: "admin" | "member") => setForm({ ...form, role })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="member">Member</SelectItem><SelectItem value="admin">Administrator</SelectItem></SelectContent></Select></div>
              <Button type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create user"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {loading ? <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow> : users.map((user) => (
              <TableRow key={user.id}>
                <TableCell><div className="font-medium">{user.name}</div><div className="text-sm text-muted-foreground">{user.email}</div></TableCell>
                <TableCell><Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge></TableCell>
                <TableCell><Badge variant={user.status === "active" ? "outline" : "destructive"}>{user.status}</Badge></TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-1">
                    <Button size="icon" variant="ghost" title={user.role === "admin" ? "Make member" : "Make administrator"} onClick={() => void update(user, { role: user.role === "admin" ? "member" : "admin" })}><ShieldCheck className="size-4" /></Button>
                    <Button size="icon" variant="ghost" title={user.status === "active" ? "Disable user" : "Activate user"} onClick={() => void update(user, { status: user.status === "active" ? "disabled" : "active" })}>{user.status === "active" ? <UserRoundX className="size-4" /> : <UserRoundCheck className="size-4" />}</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
