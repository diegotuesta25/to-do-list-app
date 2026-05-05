import SideNav from "../ui/dashboard/sidenav";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-100 text-gray-900">
			<div className="w-full flex-none md:w-64">
				<SideNav />
			</div>
			<div className="flex-1 overflow-y-auto p-6 md:p-12">{children}</div>
		</div>
	);
}
