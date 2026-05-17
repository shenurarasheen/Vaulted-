type EditableFieldProps = {
    isEditing: boolean;
    type?: string;
    field: string;
    placeholder: string;
    formData: ProfileDataProps;
    handleInputChange: (field: string, value: string) => void;
}

const EditableField = ({ isEditing, type="text", field, placeholder, formData, handleInputChange }: EditableFieldProps) => {

    return (
        <>
            {isEditing ? (
                <input
                    type={type}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={placeholder}
                />
            ) : (
                <p className="text-gray-900 font-medium">{formData[field]}</p>
            )}
        </>
    )
}

export default EditableField;