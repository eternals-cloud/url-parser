function getURL(url: string) {
    try {
        const urlObj = new URL(url);
        const hostParts = urlObj.hostname.split('.');
        if (hostParts.length >= 3 && hostParts[0] !== 'www' && hostParts[0] !== 'localhost' && !isNumeric(hostParts[0])) {
            return {
                href: urlObj?.href,
                protocol: urlObj?.protocol,
                hostname: urlObj?.hostname,
                port: urlObj?.port,
                pathname: urlObj?.pathname,
                param: String(urlObj?.pathname)?.split("/")?.filter((url) => url),
                query: Object.fromEntries(urlObj?.searchParams),
                search: urlObj?.search,
                hash: urlObj?.hash,
                sub_domain: hostParts[0],
            }
        }
        if (hostParts[0] == 'localhost' || isNumeric(hostParts[0])) {
            return {
                href: urlObj?.href,
                protocol: urlObj?.protocol,
                hostname: urlObj?.hostname,
                port: urlObj?.port,
                pathname: urlObj?.pathname,
                param: String(urlObj?.pathname)?.split("/")?.filter((url) => url),
                query: Object.fromEntries(urlObj?.searchParams),
                search: urlObj?.search,
                hash: urlObj?.hash,
                sub_domain: null,
            }
        }
        return null;
    } catch (error) {
        return null;
    }
}

function isNumeric(url: any) {
    try {
        return !isNaN(parseFloat(url)) && isFinite(url);
    } catch (error) {
        return false
    }
}

export { getURL }