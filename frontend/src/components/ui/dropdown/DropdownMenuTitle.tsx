export default function DropdownMenuTitle({ title }: { title: string }) {
    return (
        <li className="menu-title text-primary italic font-black text-lg">
            {title}
        </li>
    );
}
