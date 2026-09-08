export function extractProductList(responseData) {
    if (Array.isArray(responseData)) {
        return responseData;
    }

    const nestedCollections = [
        responseData?.data,
        responseData?.products,
        responseData?.items,
        responseData?.results
    ];

    for (const collection of nestedCollections) {
        if (Array.isArray(collection)) {
            return collection;
        }
    }

    return [];
}

export function extractProduct(responseData) {
    if (!responseData) {
        return null;
    }

    if (Array.isArray(responseData)) {
        return responseData[0] || null;
    }

    const nestedCandidates = [
        responseData.data,
        responseData.product,
        responseData.item,
        responseData.result
    ];

    for (const candidate of nestedCandidates) {
        if (candidate && !Array.isArray(candidate)) {
            return candidate;
        }
    }

    const looksLikeProduct =
        typeof responseData === "object" &&
        !Array.isArray(responseData) &&
        (
            "productId" in responseData ||
            "_id" in responseData ||
            "name" in responseData ||
            "price" in responseData ||
            "images" in responseData ||
            "image" in responseData ||
            "category" in responseData
        );

    return looksLikeProduct ? responseData : null;
}

export function getApiErrorMessage(error, fallbackMessage = "Something went wrong.") {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        fallbackMessage
    );
}
