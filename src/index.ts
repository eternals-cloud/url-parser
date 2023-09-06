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

function getUrlInfo(url: string, options?: OptionsInterface) {
    try {
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

function getOriginalUrlInfo(req: any, debug: boolean = false, options?: OptionsInterface) {
    try {
        const ip_address = req.headers.ip_address || req.ip.toString().replace('::ffff:', '');
        let url = `${req.headers.origin}${req.originalUrl}`
        if (debug) {
            url = `${req.protocol}://${req.headers.host}${req.originalUrl}`
        }
        const url_details = getUrlInfo(url, options)
        return {
            ...url_details,
            headers: req.headers || "",
            'user-agent': req.headers['user-agent'] || "",
            referer: req.headers.referer || "",
            accept: req.headers.accept || "",
            host: req.headers.host || "",
            tenant: req.headers.tenant || "",
            hostname: req.hostname || "",
            port: req['port'] || "",
            url: req.url || "",
            method: req.method || "",
            baseUrl: req.baseUrl || "",
            originalUrl: req.originalUrl || "",
            params: req.params || "",
            query: req.query || "",
            protocol: req.protocol || "",
            client_ip: ip_address || "",
            host_ip: req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.headers.host || "",
        }
    } catch (error) {
        return error
    }
}

export { getUrlInfo, getOriginalUrlInfo };