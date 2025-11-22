const FooterColumn = ({ title, items }: FooterColumnProps) => {
    return (
        <div>
            <p className="md:text-sm text-xs font-semibold mb-2 hover:underline">{title}</p>
            <ul className="footer-lists space-y-1">
                {items.map((item, index) => (
                    <li key={index}>
                        <a href={item.href}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FooterColumn;