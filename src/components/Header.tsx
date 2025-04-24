
type HeaderProps = {
    title: string;
};
const Header = ({ title }: HeaderProps) => {
    return (
        <header className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h3 className="text-lg sm:text-xl lg:text-3xl font-bold tracking-tight text-gray-900">{title}</h3>
            </div>
        </header>
    );
};

export default Header;
