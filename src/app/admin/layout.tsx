export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Minimal root — login page and protected pages share no chrome here.
  // Protected pages use AdminShell via their own layout.
  return <>{children}</>;
}
