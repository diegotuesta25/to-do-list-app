import { useCurrentUser } from "@/app/hooks/use-current-user";
import { UserFromTask } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import SideNav from "./sidenav";
import { render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

jest.mock("next/link", () => ({
	__esModule: true,
	default: ({
		href,
		children,
	}: {
		href: string;
		children: React.ReactNode;
	}) => <a href={href}>{children}</a>,
}));

jest.mock("../task-logo", () => ({
	__esModule: true,
	default: () => <div>Logo</div>,
}));

jest.mock("./nav-links", () => ({
	__esModule: true,
	default: () => <div>NavLinks</div>,
}));

jest.mock("@/app/lib/actions", () => ({
	signOutAction: jest.fn(),
}));

jest.mock("@/app/hooks/use-current-user", () => ({
	useCurrentUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
	usePathname: jest.fn(),
}));

jest.mock("@/app/lib/utils", () => ({
	defaultImage: "default-avatar.png",
}));

export const mockUser: UserFromTask = {
	id: 1,
	name: "Diego Tuesta",
	email: "diego@test.com",
	photo: "https://example.com/avatar.jpg",
};

type SetupConfig = {
	pathname?: string;
	user?: UserFromTask | null;
};

const setup = ({
	pathname = "/dashboard",
	user = mockUser,
}: SetupConfig = {}) => {
	(usePathname as jest.Mock).mockReturnValue(pathname);
	(useCurrentUser as jest.Mock).mockReturnValue({ user });
};

describe("Sidenav", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("renders nothing when there is no current user", () => {
		setup({ user: null });

		const { container } = render(<SideNav />);

		expect(container).toBeEmptyDOMElement();
	});

	test("renders the logo linking to /dashboard", () => {
		setup();

		render(<SideNav />);

		const logoLink = screen.getByRole("link", { name: /logo/i });

		expect(logoLink).toHaveAttribute("href", "/dashboard");
	});

	test("renders the profile link when NOT on /profile page", () => {
		setup({ pathname: "/dashboard" });

		render(<SideNav />);

		expect(screen.getByRole("link", { name: /diego tuesta/i })).toHaveAttribute(
			"href",
			"/profile",
		);
	});

	test("renders the user name and email when not on /profile page", () => {
		setup({ pathname: "/dashboard" });

		render(<SideNav />);

		expect(screen.getAllByRole("paragraph", { name: /diego tuesta/i }));
	});
});
