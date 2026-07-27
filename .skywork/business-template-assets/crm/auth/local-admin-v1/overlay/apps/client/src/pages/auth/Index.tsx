import { FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { normalizeApiError, readResponseBody } from "@/lib/api-error";
import { authClient, setAuthToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [statusLoaded, setStatusLoaded] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiFetch("/crm-auth/status", { auth: false })
      .then(async (response) => {
        const body = (await response.json()) as { data?: { registrationOpen?: boolean } };
        setRegistrationOpen(Boolean(body.data?.registrationOpen));
      })
      .finally(() => setStatusLoaded(true));
  }, []);

  if (isPending || !statusLoaded) {
    return <div className="min-h-screen grid place-items-center"><div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }
  if (session?.user) return <Navigate to="/" replace />;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signin") {
        const result = await authClient.signIn.email({ email, password });
        if (result.error) throw new Error(result.error.message ?? "Sign in failed");
      } else {
        const response = await apiFetch("/crm-auth/bootstrap", {
          method: "POST",
          auth: false,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name, email, password })
        });
        if (!response.ok) throw new Error(normalizeApiError(await readResponseBody(response)).message);
        const token = response.headers.get("set-auth-token");
        if (!token) throw new Error("Administrator registration returned no session token");
        setAuthToken(token);
      }
      toast.success(mode === "signup" ? "Administrator account created" : "Signed in");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{mode === "signup" ? "Create administrator" : "Sign in"}</CardTitle>
          <CardDescription>{mode === "signup" ? "Register the initial CRM administrator." : "Use your CRM account."}</CardDescription>
        </CardHeader>
        <CardContent>
          {registrationOpen && (
            <Tabs value={mode} onValueChange={(value) => setMode(value as "signin" | "signup")} className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Register</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && registrationOpen && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(event) => setName(event.target.value)} required />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" minLength={10} value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Please wait..." : mode === "signup" ? "Create administrator" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
