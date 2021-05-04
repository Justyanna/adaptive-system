let logError = err => console.log(err)

export const handleHttpError = (
    {response: res},
    {handle3xx = logError, handle4xx = logError, handle5xx = logError} = {}) =>
{
    if(res.status >= 500) {
        handle5xx(res)
        return;
    }
    if(res.status >= 400) {
        handle4xx(res)
        return;
    }
    if(res.status >= 300) {
        handle3xx(res)
        return;
    }
    logError(res)
}
