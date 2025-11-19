import categories from '../data/categories.json';

const Select = () => {
    return (
        <select className="text-[13px] max-w-12 ml-1" name="category">
            <option value="all">All</option>
            {categories.map((cat, index) => (
                <option key={index} value={cat.value}>{cat.label}</option>
            ))}
        </select>
    )
}

export default Select;