interface OptionsInterface {
    service?: boolean;
    version?: boolean;
    path?: boolean;
    url?: string;
}

interface ResponseInterface {
    href: string,
    protocol: string,
    hostname: string,
    port: string,
    pathname: string,
    param: string[],
    query: Record<string, any>,
    search: string,
    hash: string,
    sub_domain: string | null,
    service?: string,
    version?: string,
    path?: string,
    url?: string,
}

function urlInfo(url: string, options?: OptionsInterface) {
    try {
        console.log("options", options);
        const urlObj = new URL(url);
        const hostParts = urlObj.hostname.split('.');
        const params = String(urlObj?.pathname)?.split("/")?.filter((url) => url)
        const result: ResponseInterface = {
            href: urlObj?.href,
            protocol: urlObj?.protocol,
            hostname: urlObj?.hostname,
            port: urlObj?.port,
            pathname: urlObj?.pathname,
            param: params,
            query: Object.fromEntries(urlObj?.searchParams),
            search: urlObj?.search,
            hash: urlObj?.hash,
            sub_domain: null,
        }
        if (hostParts.length >= 3 && hostParts[0] !== 'www' && hostParts[0] !== 'localhost' && !isNumeric(hostParts[0])) {
            result['sub_domain'] = hostParts[0]
        }
        if (hostParts[0] == 'localhost' || isNumeric(hostParts[0])) {
            result['sub_domain'] = null
        }
        if (params.length > 2) {
            if (options?.service) {
                result['service'] = params[0]
            }
            if (options?.version) {
                result['version'] = params[1]
            }
            if (options?.path) {
                result['path'] = `${params?.slice(2, params?.length)?.join('/')}${urlObj?.search}`
            }
            if (options?.url) {
                result['url'] = `${options.url}/${params?.slice(2, params?.length)?.join('/')}${urlObj?.search}`
            }
        } else {
            if (options?.url) {
                result['url'] = `${options.url}${urlObj?.pathname}${urlObj?.search}`
            }
        }
        return result;
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

export { urlInfo }