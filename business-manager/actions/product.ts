export const validateProduct = (product: ProductFormData): string | false => {
    if (!product.name)
        return 'Product name is required';
    if (product.name.length > 72)
        return 'Product name is too long (max 72 chars)';
    if (product.category && product.category.length > 50)
        return 'Category too long (max 50 chars)';
    if (product.description && product.description.length > 100)
        return 'Description too long (max 100 chars)';
    return false;
};