import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "./view-profile";
import { UserFromTask } from "@/app/lib/definitions";

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
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

describe("View Profile", () => {
	test("renders the Profile heading", () => {
		render(<Profile user={mockUser} onEdit={jest.fn()} />);

		expect(
			screen.getByRole("heading", { name: /profile/i }),
		).toBeInTheDocument();
	});

	test("displays the user's name in the name input", () => {
		render(<Profile user={mockUser} onEdit={jest.fn()} />);

		expect(screen.getByDisplayValue("Diego Tuesta")).toBeInTheDocument();
	});

	test("displays the user's email in the email input", () => {
		render(<Profile user={mockUser} onEdit={jest.fn()} />);

		expect(screen.getByDisplayValue("diego@test.com")).toBeInTheDocument();
	});

	test("all inputs are disabled", () => {
		render(<Profile user={mockUser} onEdit={jest.fn()} />);

		const inputs = screen.getAllByRole("textbox");

		inputs.forEach(input => {
			expect(input).toBeDisabled();
		});
	});

	test("renders the Edit button", () => {
		render(<Profile user={mockUser} onEdit={jest.fn()} />);

		expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
	});

	test("calls onEdit when the Edit button is clicked", async () => {
		const user = userEvent.setup();
		const mockOnEdit = jest.fn();

		render(<Profile user={mockUser} onEdit={mockOnEdit} />);

		await user.click(screen.getByRole("button", { name: /edit/i }));

		expect(mockOnEdit).toHaveBeenCalledTimes(1);
	});

	test("shows user image when user.image is provided", () => {
		render(<Profile user={mockUser} onEdit={jest.fn()} />);

		const image = screen.getByRole("img", { name: /diego tuesta/i });

		expect(image).toHaveAttribute("src", "https://example.com/avatar.jpg");
	});

	test("shows fallback image when user.image is null", () => {
		const userWithNoImage = { ...mockUser, photo: "" };

		render(<Profile user={userWithNoImage} onEdit={jest.fn()} />);

		const image = screen.getByRole("img", { name: /diego tuesta/i });

		expect(image).toHaveAttribute("src", "default-avatar.png");
	});
});
