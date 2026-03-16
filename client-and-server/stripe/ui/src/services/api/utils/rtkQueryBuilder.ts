export default class RtkQueryBuilder {
  private readonly base: string;
  private queryParams: URLSearchParams;

  constructor(base: string) {
    this.base = base;
    this.queryParams = new URLSearchParams();
  }

  setQueryParam(key: string, value?: string) {
    if (value !== undefined && value !== '') {
      this.queryParams.set(key, value);
    }

    return this;
  }

  appendQueryParam(key: string, value: string) {
    if (value !== undefined && value !== '') {
      this.queryParams.append(key, value);
    }

    return this;
  }

  appendQueryParams(key: string, values?: string[] | string) {
    if (Array.isArray(values)) {
      values.forEach((value) => this.queryParams.append(key, value));
    } else if (values) {
      return this.appendQueryParam(key, values);
    }
    return this;
  }

  toString() {
    let result = `${this.base}`;

    const queryString = this.queryParams.toString();
    if (queryString.length > 0) {
      result += `?${queryString}`;
    }

    return result;
  }
}
