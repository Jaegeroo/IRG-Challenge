export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-muted flex flex-col items-center justify-center">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
